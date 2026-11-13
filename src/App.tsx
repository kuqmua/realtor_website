import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Properties } from "./components/Properties";
import { Contacts } from "./components/Contacts";
import { Footer } from "./components/Footer";
import { site } from "./data/site";
export default function App() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      {!site.approved && (
        <aside className="preview-banner" aria-label="Статус сайта">
          Демонстрационная версия · телефон, ссылки, цены и объекты тестовые
        </aside>
      )}
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Properties />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}
