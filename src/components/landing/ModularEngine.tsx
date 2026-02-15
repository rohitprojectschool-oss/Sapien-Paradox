import type { FC } from "react";

type ModuleTile = {
  title: string;
  description: string;
  icon: string;
};

const modularTiles: ModuleTile[] = [
  { title: "Select Your Path", description: "Decide which story, theme, or lens you want to explore first.", icon: "🜂" },
  { title: "Set Your Tempo", description: "Choose calm, steady, or rapid delivery windows.", icon: "⏱" },
  { title: "Receive & Absorb", description: "Chapters drop only when you finish the prior target.", icon: "📚" },
  { title: "Feedback Loop", description: "Questions adapt to your responses; the next packet shifts accordingly.", icon: "🧠" },
];

export const ModularEngine: FC = () => (
  <section className="modular-engine">
    <div className="section-heading">
      <h2>Modular Engine</h2>
      <p>Our process keeps your journey manageable but alive.</p>
    </div>
    <div className="engine-grid">
      {modularTiles.map((tile) => (
        <article key={tile.title} className="engine-tile">
          <span className="engine-icon">{tile.icon}</span>
          <h3>{tile.title}</h3>
          <p>{tile.description}</p>
        </article>
      ))}
    </div>
  </section>
);
