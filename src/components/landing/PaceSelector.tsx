import type { FC } from "react";
import type { ReadingPace } from "../../pages/landing/machine/types";

type PaceSelectorProps = {
  pace: ReadingPace;
  onChange: (pace: ReadingPace) => void;
};

const paceOptions: { value: ReadingPace; label: string; description: string }[] = [
  { value: "crawl", label: "Crawl", description: "Micro-chapters and reflective pauses." },
  { value: "steady", label: "Steady", description: "Balanced chunks and adaptive cues." },
  { value: "soar", label: "Soar", description: "Rapid packets with summarised insights." },
];

export const PaceSelector: FC<PaceSelectorProps> = ({ pace, onChange }) => (
  <section className="pace-selector">
    <div className="section-heading">
      <h2>Reading Pace Animation</h2>
      <p>Choose how the Sapien Paradox breathes chapters at you.</p>
    </div>
    <div className="pace-track">
      {paceOptions.map((option) => (
        <button
          key={option.value}
          className={`pace-option ${pace === option.value ? "is-active" : ""}`}
          type="button"
          onClick={() => onChange(option.value)}
        >
          <strong>{option.label}</strong>
          <span>{option.description}</span>
        </button>
      ))}
    </div>
  </section>
);
