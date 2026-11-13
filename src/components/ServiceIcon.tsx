const paths = {
  apartment: (
    <>
      <path d="M4 21V4h16v17M2 21h20M8 21v-5h8v5M8 8h1m6 0h1M8 12h1m6 0h1" />
    </>
  ),
  building: (
    <>
      <path d="M5 21V3h14v18M3 21h18M9 21v-4h6v4M8 7h2m4 0h2M8 11h2m4 0h2" />
    </>
  ),
  plot: (
    <>
      <path d="m3 14 9-5 9 5-9 5ZM3 18l9 5 9-5M12 9V2m0 0 6 2-6 2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M8 7V3h8v4M3 12l9 4 9-4M12 13v5" />
    </>
  ),
  home: (
    <>
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
      <path d="M9 21v-8h6v8" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5v1" />
    </>
  ),
  chat: (
    <path d="M21 11a8 8 0 0 1-8 8H7l-4 3V5a2 2 0 0 1 2-2h8a8 8 0 0 1 8 8ZM7 9h10M7 13h6" />
  ),
  document: (
    <>
      <path d="M14 3H5v18h14V8ZM14 3v5h5M8 12h8M8 16h6" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />
    </>
  ),
  wallet: (
    <>
      <path d="M20 7H4V4h14v3M4 7v13h16V7M20 11h-6v5h6" />
      <path d="M16 13.5h1" />
    </>
  ),
};
export type ServiceIconName = keyof typeof paths;
export function ServiceIcon({ name }: { name: ServiceIconName }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
