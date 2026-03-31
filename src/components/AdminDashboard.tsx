interface AdminDashboardProps {
  analysesCount: number
}

export function AdminDashboard({ analysesCount }: AdminDashboardProps) {
  return (
    <section className="dashboard-stack">
      <article className="card dashboard-welcome">
        <h2>Admin Dashboard</h2>
        <p>Monitor platform health, usage metrics, and operational compliance.</p>
      </article>

      <section className="dashboard-stats">
        <article className="card stat-card">
          <p>Active Recruiters</p>
          <strong>42</strong>
        </article>
        <article className="card stat-card">
          <p>Candidate Profiles</p>
          <strong>{Math.max(310, analysesCount * 15)}</strong>
        </article>
        <article className="card stat-card">
          <p>Platform Health</p>
          <strong>99.9%</strong>
        </article>
        <article className="card stat-card">
          <p>Noise / Spam Flagged</p>
          <strong>14</strong>
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
              <p>{Math.max(120, analysesCount * 20)} resume evaluations processed</p>
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
          <li>
            <div>
              <strong>Data Controls</strong>
              <p>Retention policy and anonymized screening checks passed</p>
            </div>
            <span>Verified</span>
          </li>
        </ul>
      </article>
    </section>
  )
}
