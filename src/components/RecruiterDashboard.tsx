interface RecruiterDashboardProps {
  analysesCount: number
}

export function RecruiterDashboard({ analysesCount }: RecruiterDashboardProps) {
  return (
    <section className="dashboard-stack">
      <article className="card dashboard-welcome">
        <h2>Recruiter Dashboard</h2>
        <p>Review candidate pipeline status and prioritize top-fit applicants faster.</p>
      </article>

      <section className="dashboard-stats">
        <article className="card stat-card">
          <p>Open Roles</p>
          <strong>12</strong>
        </article>
        <article className="card stat-card">
          <p>Candidates Screened</p>
          <strong>{Math.max(24, analysesCount * 9)}</strong>
        </article>
        <article className="card stat-card">
          <p>Top Match Rate</p>
          <strong>84%</strong>
        </article>
        <article className="card stat-card">
          <p>Source Conversion</p>
          <strong>31%</strong>
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

      <article className="card recent-card">
        <h2>Workflow Tools</h2>
        <ul className="recent-list">
          <li>
            <div>
              <strong>Interview Scheduling</strong>
              <p>Calendar sync active for 8 interview panels</p>
            </div>
            <span>Connected</span>
          </li>
          <li>
            <div>
              <strong>Candidate Source Tracking</strong>
              <p>LinkedIn, referral, and careers page attribution enabled</p>
            </div>
            <span>Live</span>
          </li>
        </ul>
      </article>
    </section>
  )
}
