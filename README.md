# Resume AI Agent

Resume AI Agent is a React + TypeScript + Vite frontend for resume parsing, ATS matching, and improvement suggestions.
It includes a public landing website, role-based authentication (sign in/sign up), and dashboards for candidates, recruiters, and admins.
The UI now has separate in-app pages for Sign In, Sign Up, Candidate Dashboard, Recruiter Dashboard, Admin Dashboard, and Workspace.

## Tech Stack

- React 18
- TypeScript 5
- Vite 5
- ESLint 9
- Vercel Speed Insights

## Run Locally

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`: Start local dev server.
- `npm run lint`: Run ESLint checks.
- `npm run typecheck`: Run TypeScript checks.
- `npm run build`: Run typecheck and create production build.
- `npm run check`: Run lint + build in sequence.
- `npm run preview`: Preview production build locally.

## Project Structure

```text
src/
  App.tsx                    # App orchestration and state flow
  App.css                    # App layout and component styling
  main.tsx                   # Entrypoint
  index.css                  # Global theme + typography
  components/
    PublicLanding.tsx        # Public website for Resume AI Agent
    AuthPanel.tsx            # Sign in/sign up with role selection
    CandidateDashboard.tsx   # Candidate-specific dashboard page
    RecruiterDashboard.tsx   # Recruiter-specific dashboard page
    AdminDashboard.tsx       # Admin-specific dashboard page
    UploadPanel.tsx          # Resume + job description input UX
    AnalysisDashboard.tsx    # ATS score breakdown + recommendations
    FeatureHighlights.tsx    # Landing feature cards
  lib/
    analyzeResume.ts         # Mock ATS scoring engine (replace with API call)
  types/
    resume.ts                # Shared type definitions
```

## Deployment

This app is Vercel-ready.

```bash
npm run build
```
