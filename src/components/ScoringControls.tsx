import type { ScoringWeights } from "../types";

type ScoringControlsProps = {
  weights: ScoringWeights;
  onChange: (nextWeights: ScoringWeights) => void;
};

export function ScoringControls({ weights, onChange }: ScoringControlsProps) {
  function update(
    key: keyof ScoringWeights,
    value: number
  ) {
    onChange({
      ...weights,
      [key]: value
    });
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Scoring Weights</h2>
        <span className="panel-meta">Tune ranking behavior</span>
      </div>

      <label className="range-field">
        <span>Skills weight: {weights.skills}</span>
        <input
          type="range"
          min={0}
          max={10}
          value={weights.skills}
          onChange={(event) => update("skills", Number(event.target.value))}
        />
      </label>

      <label className="range-field">
        <span>Keyword overlap weight: {weights.overlap}</span>
        <input
          type="range"
          min={0}
          max={10}
          value={weights.overlap}
          onChange={(event) => update("overlap", Number(event.target.value))}
        />
      </label>

      <label className="range-field">
        <span>Experience weight: {weights.experience}</span>
        <input
          type="range"
          min={0}
          max={10}
          value={weights.experience}
          onChange={(event) => update("experience", Number(event.target.value))}
        />
      </label>
    </section>
  );
}
