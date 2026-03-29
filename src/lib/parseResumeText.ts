import type { Candidate } from "../types";

function randomId(): string {
  return `cand-${Math.random().toString(36).slice(2, 10)}`;
}

function parseExperienceYears(raw: string): number {
  const match = raw.match(/\d+/);
  if (!match) {
    return 0;
  }
  return Number(match[0]);
}

function splitSkills(raw: string): string[] {
  return raw
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

export function parseCandidatesFromText(text: string): Candidate[] {
  const blocks = text
    .split(/\n---+\n/g)
    .map((block) => block.trim())
    .filter((block) => block.length > 0);

  return blocks.map((block, index) => {
    const lines = block.split("\n").map((line) => line.trim());
    const map = new Map<string, string>();
    for (const line of lines) {
      const parts = line.split(":");
      if (parts.length < 2) {
        continue;
      }
      const key = parts[0].trim().toLowerCase();
      const value = parts.slice(1).join(":").trim();
      map.set(key, value);
    }

    const name = map.get("name") || `Candidate ${index + 1}`;
    const years = parseExperienceYears(map.get("experience") || "0");
    const summary =
      map.get("summary") ||
      "No summary provided. Please add a candidate summary in the resume block.";
    const skills = splitSkills(map.get("skills") || "");
    const education = map.get("education") || undefined;

    return {
      id: randomId(),
      name,
      yearsOfExperience: years,
      skills,
      summary,
      education
    };
  });
}
