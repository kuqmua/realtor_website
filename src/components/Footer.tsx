import { site } from "../data/site";
export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-identity">
        <p className="footer-meta">
          <span>© {new Date().getFullYear()}</span>
          <span>{site.profession} · Левошина Е.С.</span>
        </p>
      </div>
      <a className="footer-back" href="#top" aria-label="В начало ↑">
        <span>В начало</span>
        <span className="footer-back-icon" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path
              d="M12 20V4m-6 6 6-6 6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </footer>
  );
}
