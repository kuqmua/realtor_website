FROM node:22.23.3-alpine@sha256:0a7108bf6c7bf5de370ffb1a3ed6be93d405b43ff159f681a8d18c0e2bc2e402 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Demonstration builds are local-only. Public images must pass the release gate.
ARG BUILD_MODE=release
RUN if [ "$BUILD_MODE" = "demo" ]; then npm run build; else npm run build:release; fi

FROM caddy:2.11.9-alpine@sha256:0bbb055bda6793c999bde78b1b5ce3e89f829fb031af2cf50056ea1246559fee
# Remove the base image file capability: ports 8080/8443 need no privileges.
# Otherwise cap_drop: ALL can prevent executing the file-capability binary.
RUN setcap -r /usr/bin/caddy \
    && addgroup -S -g 10001 website && adduser -S -D -H -u 10001 -G website website \
    && mkdir -p /srv/site /data/caddy /config/caddy \
    && chown -R 10001:10001 /data /config
COPY --from=build /app/dist /srv/site
COPY infra/Caddyfile /etc/caddy/Caddyfile
USER 10001:10001
EXPOSE 8080 8443
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1:8081/health.txt || exit 1
