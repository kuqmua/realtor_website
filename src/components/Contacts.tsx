import { site } from "../data/site";
import { ContactLinks } from "./ContactLinks";
export function Contacts() {
  return (
    <section
      id="contacts"
      className="contacts section"
      aria-labelledby="contacts-title"
    >
      <div className="container contacts-grid">
        <div>
          <p className="eyebrow">Давайте обсудим ваш вопрос</p>
          <h2 id="contacts-title">
            Большие решения
            <br />
            начинаются <em>с разговора</em>
          </h2>
          <p>
            Первичная консультация бесплатна. Расскажите, какую недвижимость
            хотите купить или продать.
          </p>
        </div>
        <div className="contact-panel">
          <h3>{site.name}</h3>
          <p>Частный риелтор</p>
          {site.phone && (
            <a className="large-phone" href={`tel:${site.phone}`}>
              {site.phoneDisplay}
            </a>
          )}
          <p>{site.hours}</p>
          <ContactLinks />
          {site.email && (
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          )}
          <p className="contact-geography">{site.geography}</p>
        </div>
      </div>
    </section>
  );
}
