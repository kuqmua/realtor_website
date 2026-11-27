import { ServiceTopics } from "./ServiceTopics";
import { PurchaseOptions } from "./PurchaseOptions";
import { ServiceIcon } from "./ServiceIcon";
import { serviceVisuals } from "../data/visuals";
import { ResponsiveImage } from "./ResponsiveImage";
import { services } from "../data/services";
export function Services() {
  return (
    <>
      {services.map((service, i) => (
        <section
          className="section services service-section"
          id={service.id}
          key={service.id}
          aria-labelledby={`title-${service.id}`}
        >
          <div className="container">
            <div className="service-heading">
              <div className="service-overview">
                <div className="service-chapter">
                  <span className="chapter-number">0{i + 1}</span>
                  <span>
                    {["Недвижимость", "Ипотека", "Личная консультация"][i]}
                  </span>
                </div>
                <h2 id={`title-${service.id}`}>{service.title}</h2>
                <p className="service-subtitle">{service.subtitle}</p>
                {typeof service.text === "string" ? (
                  <p>{service.text}</p>
                ) : (
                  <ul className="service-highlights" role="list">
                    {service.text.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                )}
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
                        {"icon" in detail && (
                          <span className="detail-icon">
                            <ServiceIcon name={detail.icon} />
                          </span>
                        )}
                        <h3>{detail.title}</h3>
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
                <ServiceTopics
                  id={service.id}
                  label={service.topicsLabel}
                  topics={service.topics}
                  notes={service.notes}
                />
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
