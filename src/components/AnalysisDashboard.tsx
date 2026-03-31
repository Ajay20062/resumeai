import { ResumeAnalysis } from '../types/resume'

interface AnalysisDashboardProps {
  analysis: ResumeAnalysis | null
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString()
}

function getScoreTone(score: number): string {
  if (score >= 80) {
    return 'score-good'
  }

  if (score >= 60) {
    return 'score-mid'
  }

  return 'score-low'
}

export function AnalysisDashboard({ analysis }: AnalysisDashboardProps) {
  if (!analysis) {
    return (
      <section className="card analysis-card placeholder-card" aria-live="polite">
        <h2>ATS Analysis</h2>
        <p>
          Upload a resume and add a job description to generate a complete score breakdown,
          keyword coverage, and actionable rewrite suggestions.
        </p>
      </section>
    )
  }

  return (
    <section className="card analysis-card" aria-live="polite">
      <div className="analysis-header">
        <h2>ATS Analysis</h2>
        <p>Generated on {formatDate(analysis.generatedAt)}</p>
      </div>

      <div className="overall-score">
        <span className="score-label">Overall Match</span>
        <strong className={`score-value ${getScoreTone(analysis.overallScore)}`}>
          {analysis.overallScore}%
        </strong>
      </div>

      <div className="keyword-grid">
        <article>
          <h3>Matched Keywords</h3>
          <div className="tag-wrap">
            {analysis.matchedKeywords.map((keyword) => (
              <span key={keyword} className="tag tag-match">
                {keyword}
              </span>
            ))}
          </div>
        </article>
        <article>
          <h3>Missing Keywords</h3>
          <div className="tag-wrap">
            {analysis.missingKeywords.length ? (
              analysis.missingKeywords.map((keyword) => (
                <span key={keyword} className="tag tag-missing">
                  {keyword}
                </span>
              ))
            ) : (
              <span className="tag tag-match">Strong coverage</span>
            )}
          </div>
        </article>
      </div>

      <h3>Section Scores</h3>
      <div className="section-scores">
        {analysis.sectionScores.map((item) => (
          <article key={item.section} className="section-score-item">
            <div className="section-score-title">
              <p>{item.section}</p>
              <strong>{item.score}%</strong>
            </div>
            <div className="progress">
              <span style={{ width: `${item.score}%` }} />
            </div>
            <p className="section-note">{item.note}</p>
          </article>
        ))}
      </div>

      <h3>Priority Suggestions</h3>
      <ul className="suggestion-list">
        {analysis.suggestions.map((item) => (
          <li key={item.title}>
            <p>
              <strong>{item.title}</strong>{' '}
              <span className={`impact-badge impact-${item.impact.toLowerCase()}`}>
                {item.impact}
              </span>
            </p>
            <p>{item.reason}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
