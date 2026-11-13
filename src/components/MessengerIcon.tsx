export function MessengerIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {name === "Telegram" ? (
        <path
          d="m21 3-4 18-6-5-4 3 1-6 10-7-12 6-5-2L21 3Z"
          fill="currentColor"
        />
      ) : name === "WhatsApp" ? (
        <>
          <path
            d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.2-4.6a8.5 8.5 0 1 1 16.3-3.9Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="m8 7 2 3-1 1c1 2 2 3 4 4l1-1 3 1c-1 3-3 3-6 1s-5-5-4-8l1-1Z"
            fill="currentColor"
          />
        </>
      ) : (
        <>
          <path
            d="M20.5 11a8.5 8.5 0 0 1-8.5 8.5H4l1.5-4A8.5 8.5 0 1 1 20.5 11Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M8 9v4m4-6v6m4-4v4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
