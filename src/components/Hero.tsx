import { illustrations } from "../data/visuals";
import { portrait } from "../data/portrait";
import { ResponsiveImage } from "./ResponsiveImage";
import { site } from "../data/site";
import { ContactLinks } from "./ContactLinks";
export function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-background" aria-hidden="true">
        <ResponsiveImage
          image={{ ...illustrations.heroSkyline, alt: "" }}
          sizes="(max-width: 700px) 1200px, 100vw"
          priority
        />
      </div>
      <div className="hero container">
        <div className="hero-copy">
          <div className="hero-headline">
            <p className="eyebrow">Недвижимость с личным участием</p>
            <h1 id="hero-title">
              Помощь с покупкой
              <br />и продажей <em>недвижимости</em>
            </h1>
          </div>
          <div className="hero-contact-card">
            <div className="hero-introduction">
              <div>
                <p className="intro-label">Ваш частный риелтор</p>
                <p className="intro-name">{site.shortName}</p>
              </div>
            </div>
            <p className="hero-intro">
              Помогу разобраться в вашем вопросе и пройти путь к сделке
              спокойно, с вниманием к деталям.
            </p>
            <ContactLinks showPhone showMessengerLabel={false} />
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
        <div className="portrait-wrap">
          <div className="portrait-visual">
            {portrait ? (
              <ResponsiveImage
                className="portrait"
                image={portrait}
                sizes="(max-width: 700px) min(420px, calc(100vw - 36px)), (max-width: 1250px) 62vw, 740px"
                priority
              />
            ) : (
              <div className="profile-mark" aria-hidden="true">
                <ResponsiveImage
                  image={{ ...illustrations.heroResidence, alt: "" }}
                  className="hero-scene"
                  sizes="(max-width: 700px) min(420px, calc(100vw - 36px)), (max-width: 1250px) 62vw, 740px"
                  priority
                />
                <p>{site.profession}</p>
                <small>{site.locality}</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
