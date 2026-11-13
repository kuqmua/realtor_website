import { ResponsiveImage } from "./ResponsiveImage";
import type { Property } from "../types/content";
import { ContactLinks } from "./ContactLinks";
const money = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});
const area = new Intl.NumberFormat("ru-RU");
const kinds = {
  apartment: "Квартира",
  house: "Дом",
  land: "Участок",
  commercial: "Коммерция",
};
export function PropertyCard({ property: p }: { property: Property }) {
  return (
    <article id={`object-${p.id}`} className="property-card">
      <div className="property-image">
        <ResponsiveImage
          image={p.images[0]}
          sizes="(max-width: 700px) calc(100vw - 36px), (max-width: 1000px) calc((100vw - 78px) / 2), 380px"
        />
        <span className="property-kind">{kinds[p.kind]}</span>
      </div>
      <div className="property-body">
        {p.demo && (
          <p className="demo-label">Демонстрационный объект · {p.id}</p>
        )}
        <h3>
          <a href={`#object-${p.id}`}>{p.title}</a>
        </h3>
        <p className="locality">
          {p.locality}
          {p.address ? `, ${p.address}` : ""}
        </p>
        <p className="price">{money.format(p.priceRub)}</p>
        <ul className="facts">
          <li>
            {p.kind === "land"
              ? `${area.format(p.landAreaM2! / 100)} сот.`
              : `${area.format(p.areaM2)} м²`}
          </li>
          {p.kind === "apartment" && (
            <>
              <li>{p.rooms} комн.</li>
              <li>
                {p.floor} / {p.floorsTotal} эт.
              </li>
            </>
          )}
          {p.kind === "house" && p.landAreaM2 && (
            <li>Участок {area.format(p.landAreaM2 / 100)} сот.</li>
          )}
          {p.kind === "commercial" && <li>{p.purpose}</li>}
        </ul>
        <details>
          <summary>Подробнее об объекте</summary>
          <p>{p.description}</p>
          {p.images.slice(1).map((img) => (
            <ResponsiveImage
              key={img.src}
              image={img}
              sizes="(max-width: 700px) calc(100vw - 84px), 332px"
            />
          ))}
        </details>
        <ContactLinks objectTitle={p.title} />
      </div>
    </article>
  );
}
