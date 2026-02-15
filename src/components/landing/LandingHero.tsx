import type { FC } from "react";

type LandingHeroProps = {
  onPrimary: () => void;
  onSecondary: () => void;
  highlightSummary?: string;
};

export const LandingHero: FC<LandingHeroProps> = ({ onPrimary, onSecondary, highlightSummary }) => (
  <section className="landing-hero hero-section">
    <div className="hero-copy">
      <p className="hero-eyebrow">The Sapien Paradox</p>
      <h1>Evolution isn’t a race. Knowledge shouldn’t be either.</h1>
      <p className="hero-subtext">
        We drone modular chapters across a gentle reading tempo, adaptive check-ins, and tangible deliverables so you
        can keep the magic of conversation alive.
      </p>
      {highlightSummary && <p className="hero-highlight">{highlightSummary}</p>}
      <div className="hero-actions">
        <button className="primary" onClick={onPrimary}>
          Enter the Library
        </button>
        <button className="secondary" onClick={onSecondary}>
          Explore the Engine
        </button>
      </div>
      <div className="hero-footnote">
        <span>Live reading rooms · Modular pathways · 5,000+ sapiens onboarded</span>
      </div>
    </div>
    <div className="hero-visual">
      <div className="hero-card">
        <p>Interactive pace selector</p>
        <div className="hero-pulse" />
      </div>
      <div className="hero-card hero-card-alt">
        <p>Modular engine live</p>
        <div className="hero-grid">
          {[...Array(6)].map((_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>
    </div>
  </section>
);
