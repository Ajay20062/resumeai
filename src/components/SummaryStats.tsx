type SummaryStatsProps = {
  totalCandidates: number;
  visibleCandidates: number;
  averageScore: number;
  topScore: number;
};

export function SummaryStats({
  totalCandidates,
  visibleCandidates,
  averageScore,
  topScore
}: SummaryStatsProps) {
  return (
    <section className="stats-grid">
      <article className="stat-card">
        <p>Total Candidates</p>
        <strong>{totalCandidates}</strong>
      </article>
      <article className="stat-card">
        <p>Visible After Filter</p>
        <strong>{visibleCandidates}</strong>
      </article>
      <article className="stat-card">
        <p>Average Score</p>
        <strong>{averageScore}</strong>
      </article>
      <article className="stat-card">
        <p>Top Score</p>
        <strong>{topScore}</strong>
      </article>
    </section>
  );
}
