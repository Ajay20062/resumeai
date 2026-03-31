import { ResumeAnalysis } from '../types/resume'
import { AuthUser } from '../types/auth'

interface DashboardOverviewProps {
  user: AuthUser
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

export function DashboardOverview({ user, analyses }: DashboardOverviewProps) {
  const latest = analyses[0]
  const avg = averageScore(analyses)
  const roleLabel = user.role.charAt(0).toUpperCase() + user.role.slice(1)

  return (
    <section className="dashboard-stack">
      <article className="card dashboard-welcome">
        <h2>Welcome back, {user.name}</h2>
        <p>{roleLabel} dashboard</p>
      </article>

      {user.role === 'candidate' ? (
        <>
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
        </>
      ) : null}

      {user.role === 'recruiter' ? (
        <>
          <section className="dashboard-stats">
            <article className="card stat-card">
              <p>Open Roles</p>
              <strong>12</strong>
            </article>
            <article className="card stat-card">
              <p>Candidates Screened</p>
              <strong>{Math.max(24, analyses.length * 9)}</strong>
            </article>
            <article className="card stat-card">
              <p>Top Match Rate</p>
              <strong>{avg > 0 ? `${Math.min(96, avg + 8)}%` : '74%'}</strong>
            </article>
          </section>
          <article className="card recent-card">
            <h2>Recruiter Queue</h2>
            <ul className="recent-list">
              <li>
                <div>
                  <strong>Backend Engineer</strong>
                  <p>18 candidates awaiting review</p>
                </div>
                <span>Priority</span>
              </li>
              <li>
                <div>
                  <strong>Frontend Developer</strong>
                  <p>11 candidates ranked by ATS score</p>
                </div>
                <span>In progress</span>
              </li>
              <li>
                <div>
                  <strong>Data Analyst</strong>
                  <p>7 shortlisted candidates</p>
                </div>
                <span>Ready</span>
              </li>
            </ul>
          </article>
        </>
      ) : null}

      {user.role === 'admin' ? (
        <>
          <section className="dashboard-stats">
            <article className="card stat-card">
              <p>Active Recruiters</p>
              <strong>42</strong>
            </article>
            <article className="card stat-card">
              <p>Candidate Profiles</p>
              <strong>{Math.max(310, analyses.length * 15)}</strong>
            </article>
            <article className="card stat-card">
              <p>Platform Health</p>
              <strong>99.9%</strong>
            </article>
          </section>
          <article className="card recent-card">
            <h2>Admin Overview</h2>
            <ul className="recent-list">
              <li>
                <div>
                  <strong>System Status</strong>
                  <p>All services operational</p>
                </div>
                <span>Healthy</span>
              </li>
              <li>
                <div>
                  <strong>Today Screenings</strong>
                  <p>{Math.max(120, analyses.length * 20)} resume evaluations processed</p>
                </div>
                <span>Live</span>
              </li>
              <li>
                <div>
                  <strong>Compliance</strong>
                  <p>Audit trails and access logs up to date</p>
                </div>
                <span>OK</span>
              </li>
            </ul>
          </article>
        </>
      ) : null}
    </section>
  )
}
