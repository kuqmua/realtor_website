import { useRef, useState } from "react";
import { site } from "../data/site";
export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="header container"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <a className="brand" href="#top">
        <span className="brand-copy">
          <span className="brand-name">{site.shortName}</span>
          <small>
            {site.profession} · {site.locality}
          </small>
        </span>
      </a>
      <button
        ref={menuButton}
        className={open ? "menu-toggle is-open" : "menu-toggle"}
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        <span className="menu-symbol" aria-hidden="true">
          <span />
          <span />
        </span>
        <span className="menu-caption" aria-hidden="true">
          {open ? "Закрыть" : "Меню"}
        </span>
        <span className="sr-only">{open ? "Закрыть меню" : "Меню"}</span>
      </button>
      <nav
        id="navigation"
        className={open ? "navigation open" : "navigation"}
        aria-label="Основная навигация"
      >
        {[
          ["about", "Обо мне"],
          ["services", "Услуги"],
          ["terms", "Условия"],
          ["contacts", "Контакты"],
        ].map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
            <span className="nav-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </nav>
      {site.phone && (
        <a className="header-phone button" href={`tel:${site.phone}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path
              d="m8 3 3 5-3 2c1 3 3 5 6 6l2-3 5 3c-1 5-4 6-9 3S3 11 3 7s2-4 5-4Z"
              strokeLinejoin="round"
            />
          </svg>
          <span className="header-call-copy">
            <span>Позвонить лично</span>
            <strong>{site.phoneDisplay}</strong>
          </span>
        </a>
      )}
    </header>
  );
}
