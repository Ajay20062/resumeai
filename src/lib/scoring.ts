import type { Candidate, RankedCandidate, ScoringWeights } from "../types";

const stopWords = new Set([
  "and",
  "with",
  "for",
  "the",
  "you",
  "are",
  "from",
  "this",
  "that",
  "have",
  "will",
  "our",
  "your"
]);

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9+\s./-]/g, " ");
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(/\s+/)
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

export function extractSkillsFromJD(jobDescription: string): string[] {
  const tokens = tokenize(jobDescription);
  return [...new Set(tokens)];
}

const defaultWeights: ScoringWeights = {
  skills: 0.5,
  overlap: 0.25,
  experience: 0.25
};

function clampScore(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function getNormalizedWeights(weights?: ScoringWeights): ScoringWeights {
  const source = weights ?? defaultWeights;
  const total = source.skills + source.overlap + source.experience;
  if (total <= 0) {
    return defaultWeights;
  }
  return {
    skills: source.skills / total,
    overlap: source.overlap / total,
    experience: source.experience / total
  };
}

function getRequiredSkills(jobDescription: string): string[] {
  const jdText = normalize(jobDescription);
  const preferred = [
    "react",
    "typescript",
    "javascript",
    "node.js",
    "python",
    "fastapi",
    "spring",
    "aws",
    "docker",
    "kubernetes",
    "sql",
    "postgresql",
    "graphql",
    "testing",
    "ci/cd"
  ];
  const skillMatches = preferred.filter((skill) => jdText.includes(skill));
  if (skillMatches.length > 0) {
    return skillMatches;
  }
  return extractSkillsFromJD(jobDescription).slice(0, 20);
}

export function rankCandidates(
  candidates: Candidate[],
  jobDescription: string,
  weights?: ScoringWeights
): RankedCandidate[] {
  const jdText = normalize(jobDescription);
  const jdSkills = getRequiredSkills(jobDescription);
  const finalWeights = getNormalizedWeights(weights);

  return candidates
    .map((candidate) => {
      const candidateSkillsLower = candidate.skills.map((skill) =>
        skill.toLowerCase()
      );
      const matchedSkills = candidate.skills.filter((skill) =>
        jdText.includes(skill.toLowerCase())
      );
      const missingSkills = jdSkills
        .filter((skill) => !candidateSkillsLower.includes(skill))
        .slice(0, 6);

      const profileText = normalize(
        [candidate.summary, candidate.skills.join(" ")].join(" ")
      );
      const profileTokens = new Set(tokenize(profileText));
      const overlapCount = jdSkills.filter((skill) =>
        profileTokens.has(skill)
      ).length;

      const skillRatio =
        jdSkills.length > 0 ? matchedSkills.length / jdSkills.length : 0;
      const overlapRatio = jdSkills.length > 0 ? overlapCount / jdSkills.length : 0;
      const experienceRatio = Math.min(candidate.yearsOfExperience / 10, 1);
      const score = clampScore(
        100 *
          (skillRatio * finalWeights.skills +
            overlapRatio * finalWeights.overlap +
            experienceRatio * finalWeights.experience)
      );

      const reasons: string[] = [];
      reasons.push(`${matchedSkills.length} direct skill matches`);
      reasons.push(`${candidate.yearsOfExperience} years of experience`);
      reasons.push(`${overlapCount} overlapping JD keywords`);

      return {
        ...candidate,
        score,
        reasons,
        matchedSkills,
        missingSkills
      };
    })
    .sort((a, b) => b.score - a.score);
}
