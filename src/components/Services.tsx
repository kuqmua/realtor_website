import { services } from "../data/services";
import { site } from "../data/site";
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
              Ваш вопрос —<br />
              <em>моё внимание</em>
            </h2>
          </div>
          <p>
            От выбора недвижимости
            <br />
            до сопровождения сделки.
          </p>
        </div>
        <div className="service-grid">
          {services.map((s, i) => (
            <article className="service" key={s.title}>
              <span className="number">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
        <div className="service-note">
          <p>
            <strong>Первичная консультация — бесплатно.</strong>
            <br />
            Стоимость услуг рассчитывается индивидуально. Уточните по телефону.
          </p>
          <p>{site.geography}</p>
        </div>
      </div>
    </section>
  );
}
