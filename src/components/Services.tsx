import { PurchaseOptions } from "./PurchaseOptions";
import { ServiceIcon, type ServiceIconName } from "./ServiceIcon";
import { serviceVisuals } from "../data/visuals";
import { ResponsiveImage } from "./ResponsiveImage";
import { services } from "../data/services";
const detailIcons: Record<string, ServiceIconName[]> = {
  purchase: ["home", "people"],
  mortgage: ["chat", "home", "document", "shield"],
  support: ["shield", "globe"],
};
export function Services() {
  return (
    <section
      id="services"
      className="section services"
      aria-labelledby="services-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Чем я могу помочь</p>
            <h2 id="services-title">
              От выбора недвижимости
              <br />
              <em>до сопровождения сделки</em>
            </h2>
          </div>
          <p className="services-intro">
            Три направления работы — один личный контакт.
          </p>
        </div>
        <ol className="services-index" aria-label="Три направления работы">
          {services.map((service, i) => (
            <li key={service.id}>
              <span className="index-number" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="index-copy">
                <strong>{service.title}</strong>
                <span>{service.subtitle}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="service-details">
          {services.map((service, i) => (
            <article
              className="service-detail"
              id={`service-${service.id}`}
              key={service.id}
              aria-labelledby={`title-${service.id}`}
            >
              <div className="service-heading">
                <div className="service-overview">
                  <div className="service-chapter">
                    <span className="chapter-number">0{i + 1}</span>
                    <span>
                      Направление <span className="chapter-total">/ 03</span>
                    </span>
                  </div>
                  <h3 id={`title-${service.id}`}>{service.title}</h3>
                  <p className="service-subtitle">{service.subtitle}</p>
                  <p>{service.text}</p>
                </div>
                <div className="service-scene">
                  <ResponsiveImage
                    image={serviceVisuals[service.id]}
                    sizes="(max-width: 700px) calc(100vw - 36px), (max-width: 1248px) calc((100vw - 88px) / 2), 580px"
                  />
                </div>
              </div>
              <div className={`service-content service-content--${service.id}`}>
                {service.id === "purchase" ? (
                  <PurchaseOptions details={service.details} />
                ) : (
                  <div className="service-points">
                    {service.details.map((detail, detailIndex) => (
                      <div key={detail.title}>
                        {service.id === "mortgage" && (
                          <span className="mortgage-step" aria-hidden="true">
                            0{detailIndex + 1}
                          </span>
                        )}
                        <div className="detail-heading">
                          {service.id === "support" && (
                            <span className="detail-icon">
                              <ServiceIcon
                                name={detailIcons[service.id][detailIndex]}
                              />
                            </span>
                          )}
                          <h4>{detail.title}</h4>
                        </div>
                        <ul>
                          {detail.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {service.topics.length > 0 && (
                  <div className="service-topics">
                    <p className="topics-label">{service.topicsLabel}</p>
                    <ul className="topic-list">
                      {service.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="service-detail-note">
                  <div>
                    {service.notes.map((note) => (
                      <p key={note}>{note}</p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
