import { ResumeAnalysis } from '../types/resume'

const PRIORITY_KEYWORDS = [
  'react',
  'typescript',
  'node',
  'aws',
  'docker',
  'kubernetes',
  'sql',
  'rest',
  'testing',
  'ci/cd',
  'agile',
  'leadership',
  'communication',
  'python',
  'java',
  'next.js',
]

function hash(input: string): number {
  let value = 0

  for (let i = 0; i < input.length; i += 1) {
    value = (value * 31 + input.charCodeAt(i)) % 100000
  }

  return value
}

function clamp(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)))
}

function extractPresentKeywords(jobDescription: string): string[] {
  const lowerCaseText = jobDescription.toLowerCase()
  return PRIORITY_KEYWORDS.filter((keyword) => lowerCaseText.includes(keyword))
}

export function generateResumeAnalysis(
  fileName: string,
  jobDescription: string,
): ResumeAnalysis {
  const jdKeywords = extractPresentKeywords(jobDescription)
  const baselineKeywords = jdKeywords.length > 0 ? jdKeywords : PRIORITY_KEYWORDS.slice(0, 8)
  const seed = hash(`${fileName}:${jobDescription.length}`)
  const matchedCount = Math.max(2, Math.min(baselineKeywords.length, (seed % 5) + 3))
  const matchedKeywords = baselineKeywords.slice(0, matchedCount)
  const missingKeywords = baselineKeywords.filter((keyword) => !matchedKeywords.includes(keyword))

  const scoreFromMatches = matchedKeywords.length * 8
  const densityAdjustment = Math.min(20, Math.floor(jobDescription.length / 40))
  const overallScore = clamp(40 + scoreFromMatches + densityAdjustment)

  const sectionScores = [
    {
      section: 'Skills Relevance',
      score: clamp(overallScore + 6),
      note: 'Most technical keywords are present but can be expanded with role-specific terms.',
    },
    {
      section: 'Experience Impact',
      score: clamp(overallScore - 4),
      note: 'Convert responsibility-heavy bullets into measurable outcome statements.',
    },
    {
      section: 'ATS Formatting',
      score: clamp(overallScore + 2),
      note: 'Formatting is clean; keep headings consistent and avoid non-standard icons.',
    },
    {
      section: 'Role Alignment',
      score: clamp(overallScore - 2),
      note: 'Lead summary and first 3 bullets with keywords from the job description.',
    },
  ]

  const suggestions = [
    {
      title: 'Rewrite top 5 bullets with measurable outcomes',
      reason: 'ATS and recruiters prioritize impact metrics such as %, $, and time improvements.',
      impact: 'High' as const,
    },
    {
      title: 'Add missing keywords in context',
      reason: missingKeywords.length
        ? `Include ${missingKeywords.slice(0, 4).join(', ')} naturally in project and experience bullets.`
        : 'Keyword coverage is strong; keep wording role-specific.',
      impact: 'High' as const,
    },
    {
      title: 'Tailor professional summary for each role',
      reason: 'A role-specific summary improves match confidence in the first screen pass.',
      impact: 'Medium' as const,
    },
    {
      title: 'Standardize action verbs and tense',
      reason: 'Consistent writing style improves readability and keeps screening fast.',
      impact: 'Low' as const,
    },
  ]

  return {
    overallScore,
    matchedKeywords,
    missingKeywords,
    sectionScores,
    suggestions,
    generatedAt: new Date().toISOString(),
  }
}
