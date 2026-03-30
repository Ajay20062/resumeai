import type { Candidate } from "../types";

export const sampleCandidates: Candidate[] = [
  {
    id: "cand-1",
    name: "Priya Nair",
    yearsOfExperience: 5,
    skills: ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL"],
    summary:
      "Built and maintained SaaS platforms with React and Node.js. Led feature delivery across onboarding and analytics.",
    education: "B.Tech Computer Science"
  },
  {
    id: "cand-2",
    name: "Arjun Patel",
    yearsOfExperience: 3,
    skills: ["Python", "FastAPI", "NLP", "Docker", "MongoDB"],
    summary:
      "Developed resume parsing APIs and ranking models for hiring workflows. Optimized inference latency for production traffic.",
    education: "B.E Information Technology"
  },
  {
    id: "cand-3",
    name: "Meera Iyer",
    yearsOfExperience: 7,
    skills: ["Java", "Spring Boot", "Kubernetes", "AWS", "Microservices"],
    summary:
      "Designed backend services for high-volume enterprise systems. Managed release planning and reliability improvements.",
    education: "M.Tech Software Systems"
  },
  {
    id: "cand-4",
    name: "Rahul Menon",
    yearsOfExperience: 4,
    skills: ["React", "JavaScript", "GraphQL", "Jest", "CI/CD"],
    summary:
      "Frontend engineer focused on scalable React architecture, component libraries, and strong test coverage.",
    education: "B.Sc Computer Science"
  }
];
