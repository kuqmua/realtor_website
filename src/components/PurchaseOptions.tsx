export function PurchaseOptions({
  details,
}: {
  details: { title: string; points: string[] }[];
}) {
  return (
    <div className="purchase-options">
      {details.map((detail) => (
        <div className="purchase-row" key={detail.title}>
          <div className="purchase-row-copy">
            <h3>{detail.title}</h3>
            <ul>
              {detail.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
