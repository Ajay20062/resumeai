import { BrandMark } from './BrandMark'

interface PublicLandingProps {
  onLogin: () => void
  onSignup: () => void
}

const STEPS = [
  {
    title: 'Upload Resume',
    description: 'Drop your latest PDF or DOCX and let Resume AI Agent parse it instantly.',
  },
  {
    title: 'Paste Job Description',
    description: 'Add role requirements so analysis is tailored to each application.',
  },
  {
    title: 'Improve and Track',
    description: 'Apply suggestions, raise ATS score, and monitor progress in dashboard.',
  },
]

const BENEFITS = [
  'ATS keyword gap detection',
  'Section-wise score breakdown',
  'Actionable bullet rewrite ideas',
  'Dashboard with score history',
]

const MODULES = [
  {
    title: 'AI Resume Screening',
    description: 'Auto-score resumes against role requirements with explainable criteria.',
  },
  {
    title: 'Candidate Ranking',
    description: 'Rank applicants by skills, experience relevance, and role-fit confidence.',
  },
  {
    title: 'Recruiter Pipeline',
    description: 'Track screening, shortlist, interview, and offer stages in one view.',
  },
  {
    title: 'Admin Controls',
    description: 'Manage users, monitor system usage, and review screening analytics.',
  },
]

const INTEGRATIONS = ['LinkedIn Import', 'Google Drive CV Upload', 'Slack Alerts', 'Calendar Sync']

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    points: ['50 screenings / month', 'Candidate dashboard', 'Basic ATS matching'],
  },
  {
    name: 'Recruiter Pro',
    price: '$39 / month',
    points: ['Unlimited screenings', 'Recruiter pipeline', 'Team collaboration'],
  },
  {
    name: 'Admin Suite',
    price: '$99 / month',
    points: ['Role-based access', 'Usage analytics', 'Advanced reporting'],
  },
]

const FAQS = [
  {
    q: 'How is candidate ranking calculated?',
    a: 'Ranking uses skills match, role relevance, experience depth, and keyword coverage.',
  },
  {
    q: 'Can recruiters explain why a profile is shortlisted?',
    a: 'Yes. Every score includes reason highlights for transparent and auditable decisions.',
  },
  {
    q: 'Do you support role-based dashboards?',
    a: 'Yes. Candidate, Recruiter, and Admin have separate dashboards and workflows.',
  },
]

export function PublicLanding({ onLogin, onSignup }: PublicLandingProps) {
  return (
    <main className="public-shell">
      <header className="public-topbar">
        <BrandMark subtitle="AI-powered resume optimization platform" />
        <div className="public-actions">
          <button type="button" className="secondary-btn" onClick={onLogin}>
            Login
          </button>
          <button type="button" className="primary-btn" onClick={onSignup}>
            Get started
          </button>
        </div>
      </header>

      <section className="public-hero">
        <div>
          <h1>Build ATS-ready resumes with AI-powered guidance.</h1>
          <p>
            Resume AI Agent helps candidates analyze resumes against job descriptions
            and improve match quality using clear, actionable recommendations.
          </p>
          <div className="public-actions">
            <button type="button" className="primary-btn" onClick={onSignup}>
              Create free account
            </button>
            <button type="button" className="secondary-btn" onClick={onLogin}>
              I already have an account
            </button>
          </div>
        </div>
        <article className="hero-highlight card">
          <h2>What you get</h2>
          <ul className="benefit-list">
            {BENEFITS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="steps-grid" aria-label="How it works">
        {STEPS.map((step, index) => (
          <article key={step.title} className="card step-card">
            <p className="step-index">Step {index + 1}</p>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </article>
        ))}
      </section>

      <section className="modules-grid" aria-label="Core modules">
        {MODULES.map((module) => (
          <article key={module.title} className="card step-card">
            <h2>{module.title}</h2>
            <p>{module.description}</p>
          </article>
        ))}
      </section>

      <section className="integrations-band card" aria-label="Integrations">
        <h2>Integrations</h2>
        <div className="chip-row">
          {INTEGRATIONS.map((item) => (
            <span key={item} className="integration-chip">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="plans-grid" aria-label="Plans">
        {PLANS.map((plan) => (
          <article key={plan.name} className="card plan-card">
            <p className="plan-name">{plan.name}</p>
            <h2>{plan.price}</h2>
            <ul className="benefit-list">
              {plan.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="faq-grid" aria-label="FAQ">
        {FAQS.map((faq) => (
          <article key={faq.q} className="card step-card">
            <h2>{faq.q}</h2>
            <p>{faq.a}</p>
          </article>
        ))}
      </section>

      <section className="cta-band card">
        <h2>Ready to reduce screening time?</h2>
        <p>Start with role-based onboarding and AI screening in under 5 minutes.</p>
        <div className="public-actions">
          <button type="button" className="primary-btn" onClick={onSignup}>
            Start now
          </button>
          <button type="button" className="secondary-btn" onClick={onLogin}>
            Book demo
          </button>
        </div>
      </section>

      <footer className="public-footer">
        <p>Resume AI Agent © {new Date().getFullYear()}.</p>
        <p>Built for stronger resume clarity, alignment, and interview conversion.</p>
      </footer>
    </main>
  )
}
