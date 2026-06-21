import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginMock } from '../api'
import type { User } from '../types'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const userData = await loginMock(email, password)
      setUser(userData)
      // Save info (mock session)
      localStorage.setItem('gc_user', JSON.stringify(userData))
      navigate('/home')
      return true
    } catch (err: any) {
      setError(err.message || 'Authentication failed')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('gc_user')
    navigate('/login')
  }

  return {
    user,
    isLoading,
    error,
    login,
    logout
  }
}
