import { ResumeAnalysis } from '../types/resume'

interface CandidateDashboardProps {
  analyses: ResumeAnalysis[]
}

function averageScore(analyses: ResumeAnalysis[]): number {
  if (analyses.length === 0) {
    return 0
  }

  const total = analyses.reduce((sum, item) => sum + item.overallScore, 0)
  return Math.round(total / analyses.length)
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString()
}

export function CandidateDashboard({ analyses }: CandidateDashboardProps) {
  const latest = analyses[0]
  const avg = averageScore(analyses)

  return (
    <section className="dashboard-stack">
      <article className="card dashboard-welcome">
        <h2>Candidate Dashboard</h2>
        <p>Track your resume quality and improve ATS alignment across target roles.</p>
      </article>

      <section className="dashboard-stats">
        <article className="card stat-card">
          <p>Total Analyses</p>
          <strong>{analyses.length}</strong>
        </article>
        <article className="card stat-card">
          <p>Average Score</p>
          <strong>{avg}%</strong>
        </article>
        <article className="card stat-card">
          <p>Latest Score</p>
          <strong>{latest ? `${latest.overallScore}%` : '--'}</strong>
        </article>
      </section>

      <article className="card recent-card">
        <h2>Recent analyses</h2>
        {analyses.length === 0 ? (
          <p>No analysis yet. Go to Workspace and run your first resume check.</p>
        ) : (
          <ul className="recent-list">
            {analyses.slice(0, 5).map((item, index) => (
              <li key={`${item.generatedAt}-${index}`}>
                <div>
                  <strong>Match score: {item.overallScore}%</strong>
                  <p>{formatDate(item.generatedAt)}</p>
                </div>
                <span>{item.missingKeywords.length} missing keywords</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  )
}
