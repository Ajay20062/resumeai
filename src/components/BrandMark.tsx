interface BrandMarkProps {
  subtitle?: string
}

export function BrandMark({ subtitle }: BrandMarkProps) {
  return (
    <div className="brand-wrap" aria-label="Resume AI Agent brand">
      <img src="/resumeai-logo.svg" alt="Resume AI Agent logo" className="brand-logo" />
      <div>
        <p className="brand-name">Resume AI Agent</p>
        {subtitle ? <p className="brand-subtitle">{subtitle}</p> : null}
      </div>
    </div>
  )
}
