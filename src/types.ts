export type Candidate = {
  id: string;
  name: string;
  yearsOfExperience: number;
  skills: string[];
  summary: string;
  education?: string;
};

export type RankedCandidate = Candidate & {
  score: number;
  reasons: string[];
  matchedSkills: string[];
  missingSkills: string[];
};

export type ScoringWeights = {
  skills: number;
  overlap: number;
  experience: number;
};
