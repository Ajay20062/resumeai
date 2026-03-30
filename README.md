# ResumeAI

ResumeAI is a React + TypeScript web app that helps recruiters screen resumes against a job description, rank candidates by fit score, and view explainable reasons for each ranking.

## Features

- Login-gated evaluator access (default `admin / 123456`)
- Job description input panel
- Resume intake parser from pasted text blocks
- Configurable scoring weights (skills, overlap, experience)
- Candidate ranking with fit score (0-100)
- Explainable output: skill matches, keyword overlap, and experience
- Adjustable minimum score filter
- Recruiter summary cards (top score, average score, visible pool)
- Vite-based frontend ready for Vercel deployment

## Default Credentials

- Username: `admin`
- Password: `123456`

Override via environment variables:

- `VITE_APP_USERNAME`
- `VITE_APP_PASSWORD`

## Resume Input Format

Use this format in the Resume Intake box and separate candidates with `---`.

```txt
Name: Jane Doe
Experience: 4 years
Skills: React, TypeScript, AWS
Summary: Built scalable recruiting dashboards
Education: B.Tech IT
---
Name: ...
```

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Vercel Settings

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
