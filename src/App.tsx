import { About, Audience, Coverage } from "./components/About";
import { Terms } from "./components/Terms";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Contacts } from "./components/Contacts";
import { Footer } from "./components/Footer";
export default function App() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Audience />
        <Services />
        <Coverage />
        <Terms />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}
