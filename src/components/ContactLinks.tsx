import { site } from "../data/site";
import { MessengerIcon } from "./MessengerIcon";
export function ContactLinks({
  objectTitle,
  showPhone = false,
}: {
  objectTitle?: string;
  showPhone?: boolean;
}) {
  return (
    <div className="contact-links">
      {site.phone && (
        <div className="call-action">
          <a className="button" href={`tel:${site.phone}`}>
            {showPhone ? (
              <span className="call-copy">
                <span className="call-label">Позвонить лично</span>
                <span className="call-number">{site.phoneDisplay}</span>
              </span>
            ) : objectTitle ? (
              "Позвонить об объекте"
            ) : (
              "Позвонить"
            )}
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path
                d="m8 3 3 5-3 2c1 3 3 5 6 6l2-3 5 3c-1 5-4 6-9 3S3 11 3 7s2-4 5-4Z"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      )}
      {site.messengers.length > 0 && (
        <div className="messenger-group">
          <p className="messenger-label">Написать в мессенджере</p>
          <div className="messenger-links">
            {site.messengers.map((m) => (
              <a
                key={m.name}
                className="messenger-link"
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="messenger-icon">
                  <MessengerIcon name={m.name} />
                </span>
                <span>
                  {m.name}
                  <span className="sr-only"> (откроется в новой вкладке)</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
