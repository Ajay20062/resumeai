import { startTransition, useDeferredValue, useState } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { AdminDashboard } from './components/AdminDashboard'
import { AnalysisDashboard } from './components/AnalysisDashboard'
import { AuthMode, AuthPanel } from './components/AuthPanel'
import { BrandMark } from './components/BrandMark'
import { CandidateDashboard } from './components/CandidateDashboard'
import { FeatureHighlights } from './components/FeatureHighlights'
import { PublicLanding } from './components/PublicLanding'
import { RecruiterDashboard } from './components/RecruiterDashboard'
import { UploadPanel } from './components/UploadPanel'
import { generateResumeAnalysis } from './lib/analyzeResume'
import { AuthUser, UserRole } from './types/auth'
import { ResumeAnalysis, ValidationErrors } from './types/resume'
import './App.css'

const ACCEPTED_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])
const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx']
const MAX_FILE_SIZE = 5 * 1024 * 1024

type AppScreen =
  | 'public'
  | 'login'
  | 'signup'
  | 'candidate-dashboard'
  | 'recruiter-dashboard'
  | 'admin-dashboard'
  | 'workspace'

function roleLabel(role: UserRole): string {
  return role.charAt(0).toUpperCase() + role.slice(1)
}

function dashboardScreenForRole(role: UserRole): AppScreen {
  if (role === 'candidate') {
    return 'candidate-dashboard'
  }

  if (role === 'recruiter') {
    return 'recruiter-dashboard'
  }

  return 'admin-dashboard'
}

function App() {
  const [screen, setScreen] = useState<AppScreen>('public')
  const [user, setUser] = useState<AuthUser | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [analysisHistory, setAnalysisHistory] = useState<ResumeAnalysis[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const deferredJobDescription = useDeferredValue(jobDescription)

  const validateFile = (file: File | null): string | undefined => {
    if (!file) {
      return 'Please upload a resume file.'
    }

    const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
    const isValidType = ACCEPTED_TYPES.has(file.type) || ACCEPTED_EXTENSIONS.includes(extension)

    if (!isValidType) {
      return 'Only PDF, DOC, and DOCX files are supported.'
    }

    if (file.size > MAX_FILE_SIZE) {
      return 'File is too large. Maximum allowed size is 5 MB.'
    }

    return undefined
  }

  const handleFileSelected = (file: File | null) => {
    const fileError = validateFile(file)
    setSelectedFile(fileError ? null : file)
    setErrors((previous) => ({
      ...previous,
      file: fileError,
    }))
    if (!fileError) {
      setAnalysis(null)
    }
  }

  const handleJobDescriptionChange = (value: string) => {
    setJobDescription(value)
    setErrors((previous) => ({
      ...previous,
      jobDescription: undefined,
    }))
    if (analysis) {
      setAnalysis(null)
    }
  }

  const handleAnalyze = () => {
    const nextErrors: ValidationErrors = {}
    const fileError = validateFile(selectedFile)

    if (fileError) {
      nextErrors.file = fileError
    }

    if (jobDescription.trim().length < 80) {
      nextErrors.jobDescription =
        'Job description is too short. Add at least 80 characters.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0 || !selectedFile) {
      return
    }

    setIsAnalyzing(true)
    window.setTimeout(() => {
      const nextAnalysis = generateResumeAnalysis(
        selectedFile.name,
        jobDescription,
      )
      startTransition(() => {
        setAnalysis(nextAnalysis)
        setAnalysisHistory((previous) => [nextAnalysis, ...previous])
        setScreen('candidate-dashboard')
      })
      setIsAnalyzing(false)
    }, 900)
  }

  const logout = () => {
    setUser(null)
    setScreen('public')
  }

  const canUseWorkspace =
    user?.role === 'candidate' || user?.role === 'recruiter'

  if (screen === 'public') {
    return (
      <>
        <PublicLanding
          onLogin={() => setScreen('login')}
          onSignup={() => setScreen('signup')}
        />
        <SpeedInsights />
      </>
    )
  }

  if (!user && (screen === 'login' || screen === 'signup')) {
    return (
      <>
        <AuthPanel
          mode={screen === 'login' ? 'login' : 'signup'}
          onSwitchMode={(nextMode: AuthMode) =>
            setScreen(nextMode === 'login' ? 'login' : 'signup')
          }
          onAuthenticate={(nextUser) => {
            setUser(nextUser)
            setScreen(dashboardScreenForRole(nextUser.role))
          }}
          onBack={() => setScreen('public')}
        />
        <SpeedInsights />
      </>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <main className="app-shell">
        <header className="app-topbar">
          <div>
            <BrandMark />
            <p className="user-label">{user.email}</p>
            <p className="role-label">{roleLabel(user.role)}</p>
          </div>
          <div className="nav-actions">
            <button
              type="button"
              className={`nav-btn ${
                screen === 'candidate-dashboard' ||
                screen === 'recruiter-dashboard' ||
                screen === 'admin-dashboard'
                  ? 'nav-btn-active'
                  : ''
              }`}
              onClick={() => setScreen(dashboardScreenForRole(user.role))}
            >
              Dashboard
            </button>
            {canUseWorkspace ? (
              <button
                type="button"
                className={`nav-btn ${screen === 'workspace' ? 'nav-btn-active' : ''}`}
                onClick={() => setScreen('workspace')}
              >
                Workspace
              </button>
            ) : null}
            <button type="button" className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </header>

        {screen === 'candidate-dashboard' ? (
          <CandidateDashboard analyses={analysisHistory} />
        ) : null}
        {screen === 'recruiter-dashboard' ? (
          <RecruiterDashboard analysesCount={analysisHistory.length} />
        ) : null}
        {screen === 'admin-dashboard' ? (
          <AdminDashboard analysesCount={analysisHistory.length} />
        ) : null}
        {screen === 'workspace' ? (
          <>
            <header className="hero">
              <h1>Analyze resumes with structured ATS scoring and rewrite guidance.</h1>
              <p className="subtitle">
                Upload your resume, add a target job description, and get a clear
                match score with actionable suggestions.
              </p>
            </header>

            <FeatureHighlights />

            <section className="workspace-grid">
              <UploadPanel
                selectedFile={selectedFile}
                fileError={errors.file}
                jobDescription={jobDescription}
                jobDescriptionError={errors.jobDescription}
                onFileSelected={handleFileSelected}
                onJobDescriptionChange={handleJobDescriptionChange}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
              <AnalysisDashboard analysis={analysis} />
            </section>

            <section className="status-panel">
              <h2>Project status</h2>
              <p>
                Resume AI Agent flow is integrated across landing, auth, dashboard, and
                workspace. Next step is backend API integration for real resume parsing and scoring.
              </p>
              <p className="deferred-note">
                Deferred job description length: {deferredJobDescription.trim().length} characters.
              </p>
            </section>
          </>
        ) : null}
      </main>
      <SpeedInsights />
    </>
  )
}

export default App
