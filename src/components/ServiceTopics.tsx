import { ServiceIcon, type ServiceIconName } from "./ServiceIcon";
const icons: Record<string, ServiceIconName[]> = {
  purchase: ["building", "apartment", "home", "plot", "briefcase"],
  mortgage: ["wallet", "people", "home", "document"],
};
export function ServiceTopics({
  id,
  label,
  topics,
  notes,
}: {
  id: string;
  label: string;
  topics: string[];
  notes: string[];
}) {
  return (
    <div className={`service-topics service-topics--${id}`}>
      <div className="topics-main">
        <h3 className="topics-label">{label}</h3>
        <ul className="topic-list">
          {topics.map((topic, i) => (
            <li key={topic}>
              <span className="topic-icon">
                <ServiceIcon name={icons[id][i]} />
              </span>
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="topics-notes">
        {id === "purchase" && <ServiceIcon name="chat" />}
        {notes.map((note, i) => (
          <p
            className={
              id === "mortgage" && i === notes.length - 1
                ? "bank-decision"
                : undefined
            }
            key={note}
          >
            {id === "mortgage" && i === notes.length - 1 && (
              <span className="bank-decision-label">Решение банка</span>
            )}
            {note}
          </p>
        ))}
      </div>
    </div>
  );
}
