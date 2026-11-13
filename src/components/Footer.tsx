import { site } from "../data/site";
export function Footer() {
  return (
    <footer className="footer container">
      <p>
        © {new Date().getFullYear()} {site.name}
        <br />
        <small>
          {site.profession} · {site.locality}
        </small>
      </p>
      <a href="#top">В начало ↑</a>
    </footer>
  );
}
