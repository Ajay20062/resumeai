import { ChangeEvent, DragEvent, KeyboardEvent, useRef, useState } from 'react'

const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx']

interface UploadPanelProps {
  selectedFile: File | null
  fileError?: string
  jobDescription: string
  jobDescriptionError?: string
  onFileSelected: (file: File | null) => void
  onJobDescriptionChange: (value: string) => void
  onAnalyze: () => void
  isAnalyzing: boolean
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function UploadPanel({
  selectedFile,
  fileError,
  jobDescription,
  jobDescriptionError,
  onFileSelected,
  onJobDescriptionChange,
  onAnalyze,
  isAnalyzing,
}: UploadPanelProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    onFileSelected(file)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    onFileSelected(event.dataTransfer.files?.[0] ?? null)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openFilePicker()
    }
  }

  return (
    <section className="card upload-card" aria-label="Resume Analysis Form">
      <div className="card-header">
        <h2>Upload Resume</h2>
        <p>Provide your resume and a job description to get ATS insights.</p>
      </div>

      <input
        ref={fileInputRef}
        className="file-input"
        type="file"
        accept={ACCEPTED_EXTENSIONS.join(',')}
        onChange={handleFileInput}
      />

      <div
        className={`dropzone ${isDragging ? 'dropzone-active' : ''} ${fileError ? 'dropzone-error' : ''}`}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={openFilePicker}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <p className="dropzone-title">Drop your resume here</p>
        <p className="dropzone-subtitle">PDF, DOC, DOCX supported. Max 5 MB.</p>
      </div>

      {selectedFile ? (
        <div className="meta meta-ok" role="status">
          <p>
            <strong>{selectedFile.name}</strong>
          </p>
          <p>{formatBytes(selectedFile.size)}</p>
          <button
            type="button"
            className="ghost-link"
            onClick={() => {
              onFileSelected(null)
              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
            }}
          >
            Remove
          </button>
        </div>
      ) : null}

      {fileError ? (
        <div className="meta meta-error" role="alert">
          {fileError}
        </div>
      ) : null}

      <label className="field-label" htmlFor="jobDescription">
        Job Description
      </label>
      <textarea
        id="jobDescription"
        className={`job-input ${jobDescriptionError ? 'job-input-error' : ''}`}
        value={jobDescription}
        onChange={(event) => onJobDescriptionChange(event.target.value)}
        placeholder="Paste the target job description here..."
        rows={8}
      />
      <div className="field-row">
        <span className={jobDescriptionError ? 'field-error' : 'field-hint'}>
          {jobDescriptionError ?? 'Minimum 80 characters recommended for accurate matching.'}
        </span>
        <span className="field-count">{jobDescription.trim().length} chars</span>
      </div>

      <button
        type="button"
        className="primary-btn analyze-btn"
        onClick={onAnalyze}
        disabled={isAnalyzing}
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
      </button>
    </section>
  )
}
