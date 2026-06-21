import type { User } from '../types'

export async function loginMock(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password.length >= 6) {
        resolve({
          id: 'user_123',
          email,
          name: 'Adrian Sterling',
          membershipTier: 'Elite',
          accessToken: 'jwt_mock_token_abc123'
        })
      } else {
        reject(new Error('Invalid credentials. Password must be at least 6 characters.'))
      }
    }, 1500)
  })
}
