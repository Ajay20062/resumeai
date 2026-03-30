type ResumeInputPanelProps = {
  value: string;
  onChange: (nextValue: string) => void;
  onImport: () => void;
};

export function ResumeInputPanel({
  value,
  onChange,
  onImport
}: ResumeInputPanelProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Resume Intake</h2>
        <span className="panel-meta">Paste one or more resumes</span>
      </div>
      <textarea
        aria-label="Resume Input"
        rows={12}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={`Name: Jane Doe
Experience: 4 years
Skills: React, TypeScript, AWS
Summary: Built web platforms and API integrations
Education: B.Tech IT
---
Name: ...`}
      />
      <div className="inline-actions">
        <button type="button" onClick={onImport}>
          Import Candidates
        </button>
      </div>
      <p className="hint">Separate each resume block using a line with `---`.</p>
    </section>
  );
}
