import { CoverageMap } from "./CoverageMap";
import { ServiceIcon, type ServiceIconName } from "./ServiceIcon";
import { SectionBackground } from "./SectionBackground";
import { illustrations } from "../data/visuals";
import { ResponsiveImage } from "./ResponsiveImage";
import { about } from "../data/about";
import { site } from "../data/site";
export function About() {
  return (
    <section
      id="about"
      className="section about-section illustrated-section"
      aria-labelledby="about-title"
    >
      <SectionBackground image={illustrations.aboutWorkspace} />
      <div className="container">
        <p className="eyebrow">Обо мне</p>
        <h2 id="about-title">
          Опыт в недвижимости.
          <br />
          <em>Личное участие.</em>
        </h2>
        <p className="about-name">{site.name}</p>
        <p className="block-intro">{about.intro}</p>
        <div className="fact-stack">
          {about.facts.map((fact, i) => (
            <div className="fact-row" key={fact.title}>
              <span className="number" aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h3>{fact.title}</h3>
                <p>{fact.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const clientDetails: { icon: ServiceIconName; text: string }[] = [
  {
    icon: "home",
    text: "Подбор недвижимости, поиск покупателя и сопровождение сделки.",
  },
  {
    icon: "people",
    text: "Жилищный вопрос, материнский капитал и семейная ипотека.",
  },
  {
    icon: "wallet",
    text: "Подбор недвижимости под ваши цели и сопровождение покупки.",
  },
  {
    icon: "chat",
    text: "Индивидуальный разбор ситуации и помощь с ипотечной заявкой.",
  },
];
export function Audience() {
  return (
    <section
      id="clients"
      className="section audience-section illustrated-section"
      aria-labelledby="clients-title"
    >
      <SectionBackground image={illustrations.audienceInterior} />
      <div className="container">
        <p className="eyebrow">Для кого</p>
        <h2 id="clients-title">
          С кем <em>работаю</em>
        </h2>
        <ul className="client-list">
          {about.clients.map((client, i) => (
            <li key={client}>
              <span className="client-icon">
                <ServiceIcon name={clientDetails[i].icon} />
              </span>
              <div className="client-copy">
                <h3>{client}</h3>
                <p>{clientDetails[i].text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export function Coverage() {
  return (
    <section
      id="coverage"
      className="section coverage-section"
      aria-labelledby="coverage-title"
    >
      <div className="coverage-scene" aria-hidden="true">
        <ResponsiveImage
          image={{ ...illustrations.coverageCity, alt: "" }}
          sizes="100vw"
        />
      </div>
      <div className="container">
        <p className="eyebrow">География</p>
        <h2 id="coverage-title">
          Рядом и <em>на расстоянии</em>
        </h2>
        <div className="coverage-layout">
          <CoverageMap />
          <div className="coverage-stack">
            <article className="coverage-local">
              <span className="coverage-icon">
                <ServiceIcon name="home" />
              </span>
              <div>
                <span className="coverage-label">Лично</span>
                <h3>Чебоксары и Чувашия</h3>
                <p>Чебоксары, Новочебоксарск и Чувашия.</p>
              </div>
            </article>
            <article>
              <span className="coverage-icon">
                <ServiceIcon name="globe" />
              </span>
              <div>
                <span className="coverage-label">Дистанционно</span>
                <h3>Москва и Московская область</h3>
                <p>Дистанционная работа.</p>
              </div>
            </article>
            <article>
              <span className="coverage-icon">
                <ServiceIcon name="document" />
              </span>
              <div>
                <span className="coverage-label">Онлайн</span>
                <h3>По России</h3>
                <p>Дистанционная помощь с ипотекой и электронными сделками.</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
