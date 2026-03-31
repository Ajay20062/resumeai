export type UserRole = 'candidate' | 'recruiter' | 'admin'

export interface AuthUser {
  name: string
  email: string
  role: UserRole
}
