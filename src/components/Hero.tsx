import { portrait } from "../data/portrait";
import { ResponsiveImage } from "./ResponsiveImage";
import { site } from "../data/site";
import { ContactLinks } from "./ContactLinks";
export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Недвижимость с личным участием</p>
        <h1 id="hero-title">
          Помощь с покупкой
          <br />и продажей <em>недвижимости</em>
        </h1>
        <p className="hero-intro">
          Я — {site.name}. Помогу разобраться в вашем вопросе и пройти путь к
          сделке спокойно, с вниманием к деталям.
        </p>
        <ContactLinks />
        {site.phone && (
          <p>
            <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          </p>
        )}
        <p className="hours">{site.hours}</p>
        <div className="hero-foot">
          <span className="experience">
            20+<small>лет в недвижимости</small>
          </span>
          <p>
            Личный контакт.
            <br />
            Профессиональный подход.
          </p>
        </div>
      </div>
      <div className="portrait-wrap">
        {portrait ? (
          <ResponsiveImage
            className="portrait"
            image={portrait}
            sizes="(max-width: 700px) min(420px, calc(100vw - 36px)), 520px"
            priority
          />
        ) : (
          <div className="portrait-placeholder">
            <span className="portrait-initials" aria-hidden="true">
              {site.initials}
            </span>
            <p>
              Здесь будет портрет
              <br />
              Елены Сергеевны
            </p>
            <small>Ожидаем фотографию владельца</small>
          </div>
        )}
        <div className="portrait-caption">
          <span>Ваш частный риелтор</span>
          <strong>{site.shortName}</strong>
        </div>
      </div>
    </section>
  );
}
