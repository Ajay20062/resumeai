export interface ValidationErrors {
  file?: string
  jobDescription?: string
}

export interface SectionScore {
  section: string
  score: number
  note: string
}

export type SuggestionImpact = 'High' | 'Medium' | 'Low'

export interface AnalysisSuggestion {
  title: string
  reason: string
  impact: SuggestionImpact
}

export interface ResumeAnalysis {
  overallScore: number
  matchedKeywords: string[]
  missingKeywords: string[]
  sectionScores: SectionScore[]
  suggestions: AnalysisSuggestion[]
  generatedAt: string
}
