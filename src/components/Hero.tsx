import { ServiceIcon } from "./ServiceIcon";
import { illustrations } from "../data/visuals";
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
        <div className="hero-contact-card">
          <div className="hero-introduction">
            <span className="intro-monogram" aria-hidden="true">
              ЕЛ
            </span>
            <div>
              <p className="intro-label">Ваш личный риелтор</p>
              <p className="intro-name">Я — {site.name}</p>
            </div>
          </div>
          <p className="hero-intro">
            Помогу разобраться в вашем вопросе и пройти путь к сделке спокойно,
            с вниманием к деталям.
          </p>
          <ContactLinks showPhone />
          <p className="hours">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <span>{site.hours}</span>
          </p>
        </div>
      </div>
      <div className="portrait-wrap">
        <div className="portrait-visual">
          {portrait ? (
            <ResponsiveImage
              className="portrait"
              image={portrait}
              sizes="(max-width: 700px) min(420px, calc(100vw - 36px)), 520px"
              priority
            />
          ) : (
            <div className="profile-mark" aria-hidden="true">
              <ResponsiveImage
                image={{ ...illustrations.heroResidence, alt: "" }}
                className="hero-scene"
                sizes="(max-width: 700px) min(420px, calc(100vw - 36px)), 520px"
                priority
              />
              <p>{site.profession}</p>
              <small>{site.locality}</small>
            </div>
          )}
          <div className="portrait-caption">
            <span>Ваш частный риелтор</span>
            <strong>{site.shortName}</strong>
          </div>
        </div>
        <div className="hero-foot">
          <span className="experience">
            20+<small>лет в недвижимости</small>
          </span>
          <div className="experience-promises">
            <p>
              <ServiceIcon name="people" />
              <span>Личный контакт</span>
            </p>
            <p>
              <ServiceIcon name="shield" />
              <span>Профессиональный подход</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
