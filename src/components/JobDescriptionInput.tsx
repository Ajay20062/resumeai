type JobDescriptionInputProps = {
  value: string;
  onChange: (nextValue: string) => void;
};

export function JobDescriptionInput({
  value,
  onChange
}: JobDescriptionInputProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Job Requirements</h2>
        <span className="panel-meta">{value.length} chars</span>
      </div>
      <textarea
        aria-label="Job Description"
        rows={12}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste the job description here"
      />
      <p className="hint">
        Include required skills, years of experience, and tools to improve
        ranking quality.
      </p>
    </section>
  );
}
