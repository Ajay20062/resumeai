import type { RankedCandidate } from "../types";

type CandidateCardProps = {
  candidate: RankedCandidate;
  rank: number;
};

export function CandidateCard({ candidate, rank }: CandidateCardProps) {
  return (
    <article className="candidate-card">
      <div className="candidate-header">
        <div>
          <h3>{candidate.name}</h3>
          <p className="candidate-meta">
            Rank #{rank} | {candidate.yearsOfExperience} years
          </p>
        </div>
        <div className="score-badge">{candidate.score}</div>
      </div>

      <p className="candidate-summary">{candidate.summary}</p>
      {candidate.education ? (
        <p className="education">Education: {candidate.education}</p>
      ) : null}

      <div className="pill-row">
        {candidate.skills.map((skill) => (
          <span key={`${candidate.id}-${skill}`} className="pill">
            {skill}
          </span>
        ))}
      </div>

      <ul className="reason-list">
        {candidate.reasons.map((reason) => (
          <li key={`${candidate.id}-${reason}`}>{reason}</li>
        ))}
      </ul>

      {candidate.missingSkills.length > 0 ? (
        <p className="missing-skills">
          Potential gap skills: {candidate.missingSkills.join(", ")}
        </p>
      ) : null}
    </article>
  );
}
