const FEATURES = [
  {
    title: 'Smart Resume Parsing',
    description: 'Extract skills, projects, education, and achievements into structured data.',
  },
  {
    title: 'ATS Match Insights',
    description: 'Compare your resume against a target job description and identify gaps.',
  },
  {
    title: 'Actionable Suggestions',
    description: 'Get high-impact rewrite recommendations to improve ATS performance.',
  },
]

export function FeatureHighlights() {
  return (
    <section className="feature-grid" aria-label="Core features">
      {FEATURES.map((feature) => (
        <article key={feature.title} className="feature-card">
          <h2>{feature.title}</h2>
          <p>{feature.description}</p>
        </article>
      ))}
    </section>
  )
}
