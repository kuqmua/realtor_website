import { ServiceIcon, type ServiceIconName } from "./ServiceIcon";
import { SectionBackground } from "./SectionBackground";
import { illustrations } from "../data/visuals";
import { terms } from "../data/services";
const termIcons: ServiceIconName[] = ["chat", "wallet", "globe"];
export function Terms() {
  return (
    <section
      id="terms"
      className="section terms-section illustrated-section"
      aria-labelledby="terms-title"
    >
      <SectionBackground image={illustrations.termsAgreement} />
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Условия работы</p>
            <h2 id="terms-title">
              Сначала обсудим
              <br />
              <em>вашу задачу</em>
            </h2>
          </div>
          <p>
            Первичная консультация бесплатна.
            <br />
            Остальное — по договорённости.
          </p>
        </div>
        <div className="terms-stack">
          {terms.map((term, i) => (
            <article key={term.title}>
              <span className="term-icon">
                <ServiceIcon name={termIcons[i]} />
              </span>
              <div className="term-copy">
                <h3>{term.title}</h3>
                <p>{term.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
