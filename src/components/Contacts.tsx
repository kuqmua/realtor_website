import { ServiceIcon } from "./ServiceIcon";
import { SectionBackground } from "./SectionBackground";
import { illustrations } from "../data/visuals";
import { site } from "../data/site";
import { ContactLinks } from "./ContactLinks";
export function Contacts() {
  return (
    <section
      id="contacts"
      className="contacts section illustrated-section"
      aria-labelledby="contacts-title"
    >
      <SectionBackground image={illustrations.contactsDoorway} />
      <div className="container contacts-grid">
        <div className="contacts-intro">
          <p className="eyebrow">Контакты</p>
          <h2 id="contacts-title">
            Остались вопросы?
            <br />
            <em>Свяжитесь со мной</em>
          </h2>
          <p className="contacts-lead">
            Позвоните или напишите в удобном мессенджере. Обсудим ваш вопрос.
          </p>
          <div className="consultation-note">
            <span className="consultation-icon">
              <ServiceIcon name="chat" />
            </span>
            <div>
              <strong>Первичная консультация бесплатна</strong>
              <p>Разберём вашу ситуацию и определим дальнейшие шаги.</p>
            </div>
          </div>
          <div className="contact-work-terms">
            <h3>Условия работы</h3>
            <p>
              Стоимость услуг рассчитывается индивидуально. Для дистанционных
              услуг возможна частичная предоплата — её размер и условия
              согласовываются с вами индивидуально.
            </p>
          </div>
          <div className="contact-geography">
            <ServiceIcon name="globe" />
            <div>
              <h3>Рядом и на расстоянии</h3>
              <p>{site.geography}</p>
            </div>
          </div>
        </div>
        <div className="contact-panel">
          <div className="contact-person">
            <div>
              <p className="contact-role">{site.profession}</p>
              <h3>{site.name}</h3>
            </div>
          </div>
          <div className="contact-hours">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <p>{site.hours}</p>
          </div>
          <ContactLinks showPhone />
          {site.email && (
            <a className="contact-email" href={`mailto:${site.email}`}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 6 9 7 9-7" />
              </svg>
              <span>
                <small>Электронная почта</small>
                {site.email}
              </span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
