import { site } from "../data/site";
export function ContactLinks({ objectTitle }: { objectTitle?: string }) {
  return (
    <div className="contact-links">
      {site.phone ? (
        <a className="button" href={`tel:${site.phone}`}>
          {objectTitle ? "Позвонить об объекте" : "Позвонить"}{" "}
          <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <p className="pending">Контакты появятся после согласования</p>
      )}
      {site.messengers.map((m) => (
        <a
          key={m.name}
          className="text-link"
          href={m.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {m.name} <span className="sr-only">(откроется в новой вкладке)</span>↗
        </a>
      ))}
    </div>
  );
}
