import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { startTransition, useDeferredValue, useState } from "react";
import { CandidateCard } from "./components/CandidateCard";
import { JobDescriptionInput } from "./components/JobDescriptionInput";
import { LoginGate } from "./components/LoginGate";
import { ResumeInputPanel } from "./components/ResumeInputPanel";
import { ScoringControls } from "./components/ScoringControls";
import { SummaryStats } from "./components/SummaryStats";
import { sampleCandidates } from "./data/sampleCandidates";
import { parseCandidatesFromText } from "./lib/parseResumeText";
import { rankCandidates } from "./lib/scoring";
import type { Candidate, ScoringWeights } from "./types";
import "./App.css";

const defaultJD =
  "We are hiring a frontend engineer with 3+ years experience in React, TypeScript, testing, API integration, and AWS deployment knowledge.";

const defaultResumeText = `Name: Kavya Sharma
Experience: 6 years
Skills: React, TypeScript, GraphQL, AWS, Testing
Summary: Built scalable frontend platforms and mentored engineers across two product teams.
Education: B.E Computer Engineering
---
Name: Nikhil Rao
Experience: 2 years
Skills: JavaScript, Node.js, MongoDB, Docker
Summary: Developed backend APIs and worked on resume parsing automation for internal HR tools.
Education: B.Tech Information Technology`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("resumeai-auth") === "ok"
  );
  const [jobDescription, setJobDescription] = useState(defaultJD);
  const [candidatePool, setCandidatePool] = useState<Candidate[]>(sampleCandidates);
  const [resumeText, setResumeText] = useState(defaultResumeText);
  const [minimumScore, setMinimumScore] = useState(0);
  const [weights, setWeights] = useState<ScoringWeights>({
    skills: 6,
    overlap: 2,
    experience: 2
  });

  const deferredJobDescription = useDeferredValue(jobDescription);
  const rankedCandidates = rankCandidates(candidatePool, deferredJobDescription, weights);
  const filteredCandidates = rankedCandidates.filter(
    (candidate) => candidate.score >= minimumScore
  );
  const averageScore =
    rankedCandidates.length === 0
      ? 0
      : Math.round(
          rankedCandidates.reduce((sum, candidate) => sum + candidate.score, 0) /
            rankedCandidates.length
        );
  const topScore = rankedCandidates[0]?.score ?? 0;

  function handleImportCandidates() {
    const imported = parseCandidatesFromText(resumeText);
    if (imported.length === 0) {
      return;
    }
    startTransition(() => {
      setCandidatePool((previous) => {
        const merged = [...previous];
        for (const candidate of imported) {
          const exists = previous.some(
            (item) => item.name.toLowerCase() === candidate.name.toLowerCase()
          );
          if (!exists) {
            merged.push(candidate);
          }
        }
        return merged;
      });
    });
  }

  function handleLogout() {
    localStorage.removeItem("resumeai-auth");
    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return <LoginGate onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <h1>ResumeAI Recruiter Assistant</h1>
          <p>
            Screen resumes against role requirements, rank candidates by fit,
            and explain each selection.
          </p>
        </div>
        <button type="button" className="secondary-btn" onClick={handleLogout}>
          Logout
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <SpeedInsights />
    </>
  )
      </header>

      <SummaryStats
        totalCandidates={candidatePool.length}
        visibleCandidates={filteredCandidates.length}
        averageScore={averageScore}
        topScore={topScore}
      />

      <main className="layout">
        <div className="column">
          <JobDescriptionInput
            value={jobDescription}
            onChange={(value) => {
              startTransition(() => setJobDescription(value));
            }}
          />
          <ResumeInputPanel
            value={resumeText}
            onChange={setResumeText}
            onImport={handleImportCandidates}
          />
          <ScoringControls weights={weights} onChange={setWeights} />
        </div>

        <section className="panel">
          <div className="panel-header">
            <h2>Ranked Candidates</h2>
            <span className="panel-meta">{filteredCandidates.length} visible</span>
          </div>

          <label className="range-field">
            <span>Minimum score: {minimumScore}</span>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={minimumScore}
              onChange={(event) => setMinimumScore(Number(event.target.value))}
            />
          </label>

          <div className="results">
            {filteredCandidates.length === 0 ? (
              <p className="empty-state">
                No candidates meet this score threshold. Lower the minimum score.
              </p>
            ) : (
              filteredCandidates.map((candidate, index) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  rank={index + 1}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
