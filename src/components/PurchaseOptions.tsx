import { ServiceIcon, type ServiceIconName } from "./ServiceIcon";

export function PurchaseOptions({
  details,
}: {
  details: { title: string; points: string[]; icon: ServiceIconName }[];
}) {
  return (
    <div className="purchase-options">
      {details.map((detail) => (
        <div className="purchase-row" key={detail.title}>
          <span className="purchase-icon">
            <ServiceIcon name={detail.icon} />
          </span>
          <div className="purchase-row-copy">
            <h3>{detail.title}</h3>
            {detail.points.length > 0 && (
              <ul>
                {detail.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
