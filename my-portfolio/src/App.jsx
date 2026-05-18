import { useState, useEffect } from "react";

import { SECTIONS } from "./data";
import Background from "./components/Background";
import Terminal from "./components/Terminal";
import AboutView from "./sections/AboutView";
import ProjectsView from "./sections/ProjectsView";
import SkillsView from "./sections/SkillsView";
import ContactView from "./sections/ContactView";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  /* Shrink header on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight active nav link via IntersectionObserver */
  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActiveSection(id);
          }
        });
      },
      { threshold: 0.3 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-neutral-200 selection:text-neutral-900 text-neutral-900">
      <Background />

      {/* Header / Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-xl border-b border-border py-3"
            : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="max-w-5xl mx-auto px-5 flex items-center justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className="group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 rounded-sm"
          >
            <img
              src="/icons/signature.png"
              alt="Gabriel Espinoza"
              className={`w-auto object-contain invert opacity-90 group-hover:opacity-100 transition-all duration-500 ${
                scrolled ? "h-8 md:h-10" : "h-12 md:h-16"
              }`}
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-300 ${
                  activeSection === id
                    ? "text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 text-neutral-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-bg/95 backdrop-blur-xl border-t border-border px-5 py-4 flex flex-col gap-3">
            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-left text-sm tracking-wide py-1 transition-colors ${
                  activeSection === id
                    ? "text-neutral-900 font-medium"
                    : "text-neutral-600"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Page Sections */}
      <div className="relative z-10 max-w-5xl mx-auto px-5">
        <section
          id="home"
          data-section
          className="pt-28 md:pt-36 pb-16 md:pb-20 flex flex-col items-center"
        >
          <div className="w-full max-w-2xl flex flex-col items-center gap-5">
            <Terminal />
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 text-center">
              Build<span className="text-accent-warm">.</span> Ship
              <span className="text-accent-cool">.</span> Scale
              <span className="text-accent-warm">.</span>
            </h1>
          </div>
        </section>

        <section
          id="about"
          data-section
          className="scroll-mt-20 py-10 md:py-14 border-t border-border"
        >
          <AboutView />
        </section>

        <section
          id="projects"
          data-section
          className="scroll-mt-20 py-10 md:py-14 border-t border-border"
        >
          <ProjectsView />
        </section>

        <section
          id="skills"
          data-section
          className="scroll-mt-20 py-10 md:py-14 border-t border-border"
        >
          <SkillsView />
        </section>

        <section
          id="contact"
          data-section
          className="scroll-mt-20 py-10 md:py-14 border-t border-border"
        >
          <ContactView />
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border">
        <div className="max-w-5xl mx-auto px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <span>Gabriel Espinoza</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
