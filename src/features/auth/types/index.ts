export interface User {
  id: string
  email: string
  name: string
  membershipTier: 'Elite' | 'Platinum' | 'Gold'
  accessToken: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
