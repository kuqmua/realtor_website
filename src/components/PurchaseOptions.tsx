export function PurchaseOptions({
  details,
}: {
  details: { title: string; points: string[] }[];
}) {
  return (
    <div className="purchase-options">
      {details.map((detail) => (
        <div className="purchase-row" key={detail.title}>
          <h4>{detail.title}</h4>
          <ul>
            {detail.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
