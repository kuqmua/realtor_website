import { properties } from "../data/properties";
import { PropertyCard } from "./PropertyCard";
export function Properties() {
  const published = properties.filter((p) => p.published);
  return (
    <section
      id="properties"
      className="section container"
      aria-labelledby="properties-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Недвижимость</p>
          <h2 id="properties-title">
            Актуальные <em>предложения</em>
          </h2>
        </div>
        <p>
          Найдём место
          <br />
          для ваших планов.
        </p>
      </div>
      {published.some((p) => p.demo) && (
        <p className="demo-notice">
          Примеры для просмотра дизайна. Эти объекты, изображения и цены
          условные и не являются предложениями о продаже.
        </p>
      )}
      {published.length ? (
        <div className="property-grid">
          {published.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        <p>
          Сейчас опубликованных объектов нет. Позвоните, чтобы обсудить
          подходящие варианты.
        </p>
      )}
    </section>
  );
}
