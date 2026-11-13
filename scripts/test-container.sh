#!/usr/bin/env bash
set -euo pipefail
# Local/CI rehearsal only. Public TLS and DNS are verified separately.
image=${1:?Usage: bash scripts/test-container.sh IMAGE [PREVIOUS_IMAGE]}
previous_image=${2:-}
work=$(mktemp -d /tmp/realtor-container.XXXXXX)
container="realtor-rehearsal-$$"
data_volume="${container}-data"
config_volume="${container}-config"
started=$(date +%s)
round=0
cleanup() {
  if docker container inspect "$container" >/dev/null 2>&1; then
    docker logs "$container" > "$work/container-$round.log" 2>&1 || true
    docker rm -f "$container" >/dev/null 2>&1 || true
  fi
  docker volume rm "$data_volume" "$config_volume" >/dev/null 2>&1 || true
}
trap cleanup EXIT
run_checks() {
  local selected_image=$1
  round=$((round + 1))
  docker run -d --name "$container" --read-only --cap-drop ALL \
    --security-opt no-new-privileges:true --memory 128m --cpus 1 --pids-limit 100 \
    --tmpfs /tmp:rw,noexec,nosuid,size=16m -v "$data_volume:/data" -v "$config_volume:/config" \
    -e DOMAIN=localhost -e ALIAS_DOMAIN=www.localhost \
    -p 127.0.0.1::8080 -p 127.0.0.1::8443 "$selected_image" >/dev/null
  local http_binding tls_binding http_port tls_port base
  http_binding=$(docker port "$container" 8080/tcp); http_port=${http_binding##*:}
  tls_binding=$(docker port "$container" 8443/tcp); tls_port=${tls_binding##*:}
  base="https://localhost:$tls_port"
  for attempt in $(seq 1 45); do
    if curl -kfsS "$base/health.txt" -o /dev/null 2>/dev/null; then break; fi
    sleep 1
  done
  test "$(docker exec "$container" id -u)" = 10001
  test "$(docker inspect "$container" --format '{{.HostConfig.ReadonlyRootfs}}')" = true
  docker exec "$container" sh -c 'grep -q "CapEff:.*0000000000000000" /proc/self/status; test -w /data; test -w /config; test ! -d /app/node_modules'
  curl -kfsS -D "$work/headers" "$base/" -o "$work/index.html"
  for header in content-security-policy strict-transport-security x-content-type-options permissions-policy; do
    grep -qi "^$header:" "$work/headers"
  done
  grep -qi '^cache-control: no-cache' "$work/headers"
  for path in /missing /.env /.git/config /src/main.tsx /security.caddy; do
    test "$(curl -ksS -D "$work/error-headers" -o /dev/null -w '%{http_code}' "$base$path")" = 404
    if [ "$selected_image" = "$image" ]; then
      grep -qi '^content-security-policy:' "$work/error-headers"
      grep -qi '^strict-transport-security:' "$work/error-headers"
    fi
  done
  test "$(curl -ksS -X POST -o /dev/null -w '%{http_code}' "$base/")" = 405
  curl -sS -D "$work/redirect" "http://localhost:$http_port/?test=redirect" -o /dev/null
  grep -q '308' "$work/redirect"
  grep -qi '^location: https://localhost/?test=redirect' "$work/redirect"
  local js
  js=$(sed -n 's/.*src="\(\/assets\/[^" ]*\.js\)".*/\1/p' "$work/index.html")
  test -n "$js"
  curl -kfsS -D "$work/asset-headers" "$base$js" -o /dev/null
  grep -qi '^cache-control: public, max-age=31536000, immutable' "$work/asset-headers"
  # The old image may not yet implement alias redirects.
  if [ "$selected_image" = "$image" ]; then
    curl -kfsS --resolve "www.localhost:$tls_port:127.0.0.1" -D "$work/alias-headers" "https://www.localhost:$tls_port/check?source=alias" -o /dev/null
    grep -q '308' "$work/alias-headers"
    grep -qi '^location: https://localhost/check?source=alias' "$work/alias-headers"
  fi
  for attempt in $(seq 1 40); do
    if [ "$(docker inspect "$container" --format '{{.State.Health.Status}}')" = healthy ]; then break; fi
    sleep 1
  done
  test "$(docker inspect "$container" --format '{{.State.Health.Status}}')" = healthy
  printf 'PASS image=%s asset=%s health=healthy\n' "$selected_image" "$js"
  cleanup
}
docker run --rm -e DOMAIN=localhost -e ALIAS_DOMAIN=www.localhost --entrypoint caddy "$image" validate --config /etc/caddy/Caddyfile --adapter caddyfile
run_checks "$image"
if [ -n "$previous_image" ]; then
  run_checks "$previous_image"
  printf 'Rollback rehearsal passed.\n'
fi
# Save/load validates the portable artifact; recovery uses entirely new Caddy volumes.
docker image save "$image" -o "$work/image.tar"
docker image load -i "$work/image.tar" >/dev/null
run_checks "$image"
printf 'Restore rehearsal passed in %s seconds. Evidence: %s\n' "$(( $(date +%s) - started ))" "$work"
