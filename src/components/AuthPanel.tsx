import { FormEvent, useState } from 'react'
import { BrandMark } from './BrandMark'
import { AuthUser, UserRole } from '../types/auth'

interface AuthPanelProps {
  mode: AuthMode
  onAuthenticate: (user: AuthUser) => void
  onSwitchMode: (mode: AuthMode) => void
  onBack?: () => void
}

export type AuthMode = 'login' | 'signup'

const ADMIN_EMAIL = 'admin@resumeai.com'
const ADMIN_PASSWORD = 'Admin@123'

export function AuthPanel({
  mode,
  onAuthenticate,
  onSwitchMode,
  onBack,
}: AuthPanelProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<UserRole>('candidate')
  const [error, setError] = useState('')

  const submitLabel = mode === 'login' ? 'Sign In' : 'Create account'
  const formTitle = mode === 'login' ? 'Sign in to your account' : 'Create your account'

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError('')

    if (mode === 'signup' && role === 'admin') {
      setError('Admin sign-up is disabled. Only one admin account is allowed.')
      return
    }

    if (!email.includes('@')) {
      setError('Enter a valid email address.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (mode === 'signup' && name.trim().length < 2) {
      setError('Name must be at least 2 characters.')
      return
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (mode === 'login' && role === 'admin') {
      if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        setError('Invalid admin credentials. Use the configured admin account only.')
        return
      }
    }

    onAuthenticate({
      name: mode === 'signup' ? name.trim() : 'ResumeAI User',
      email: email.trim(),
      role,
    })
  }

  return (
    <section className="auth-shell">
      <article className="auth-card">
        <BrandMark subtitle="AI-powered resume optimization" />
        <h1>{formTitle}</h1>
        <p className="auth-subtitle">
          Access role-based dashboards for candidates, recruiters, and admins.
        </p>

        <fieldset className="role-group">
          <legend>Sign in as</legend>
          <div className="role-options">
            <button
              type="button"
              className={`role-chip ${role === 'candidate' ? 'role-chip-active' : ''}`}
              onClick={() => setRole('candidate')}
            >
              Candidate
            </button>
            <button
              type="button"
              className={`role-chip ${role === 'recruiter' ? 'role-chip-active' : ''}`}
              onClick={() => setRole('recruiter')}
            >
              Recruiter
            </button>
            <button
              type="button"
              className={`role-chip ${role === 'admin' ? 'role-chip-active' : ''} ${mode === 'signup' ? 'role-chip-disabled' : ''}`}
              onClick={() => {
                if (mode === 'signup') {
                  setError('Admin sign-up is disabled. Use Candidate or Recruiter.')
                  return
                }
                setRole('admin')
              }}
            >
              Admin
            </button>
          </div>
          {mode === 'login' ? (
            <p className="role-note">Admin login: admin@resumeai.com / Admin@123</p>
          ) : null}
        </fieldset>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-grid">
            {mode === 'signup' ? (
              <label className="field-label" htmlFor="name">
                Full name
                <input
                  id="name"
                  className="auth-input"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                />
              </label>
            ) : null}

            <label className="field-label" htmlFor="email">
              Email
              <input
                id="email"
                className="auth-input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </label>

            <label className="field-label" htmlFor="password">
              Password
              <input
                id="password"
                className="auth-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
              />
            </label>

            {mode === 'signup' ? (
              <label className="field-label" htmlFor="confirmPassword">
                Confirm password
                <input
                  id="confirmPassword"
                  className="auth-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Re-enter password"
                />
              </label>
            ) : null}
          </div>

          {error ? <p className="field-error">{error}</p> : null}

          <button type="submit" className="primary-btn auth-submit">
            {submitLabel}
          </button>
          <button
            type="button"
            className="auth-mode-link"
            onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
          {onBack ? (
            <button type="button" className="secondary-btn auth-back" onClick={onBack}>
              Back to home
            </button>
          ) : null}
        </form>
      </article>
    </section>
  )
}
