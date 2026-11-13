import { useState } from "react";
import { site } from "../data/site";
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header container">
      <a className="brand" href="#top">
        <span className="monogram" aria-hidden="true">
          ЕЛ
        </span>
        <span>
          Елена Левошина<small>Частный риелтор · Чебоксары</small>
        </span>
      </a>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Закрыть меню" : "Меню"}
      </button>
      <nav
        id="navigation"
        className={open ? "navigation open" : "navigation"}
        aria-label="Основная навигация"
      >
        {[
          ["services", "Услуги"],
          ["properties", "Объекты"],
          ["contacts", "Контакты"],
        ].map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      {site.phone && (
        <a className="header-phone" href={`tel:${site.phone}`}>
          {site.phoneDisplay}
        </a>
      )}
    </header>
  );
}
