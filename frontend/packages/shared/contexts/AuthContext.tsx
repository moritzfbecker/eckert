/**
 * Auth Context - Authentication State Management
 *
 * Provides authentication state and methods to all components.
 * Stores JWT token in localStorage, auto-refreshes, etc.
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 2.13.0
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import * as authApi from '../utils/authApi'
import { logger } from '../utils/logger'

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  emailVerified: boolean
  active: boolean
  language: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Auth Provider Component
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  /**
   * Initialize - load user from localStorage
   */
  useEffect(() => {
    const initAuth = async () => {
      logger.info('AUTH_CTX_001', 'Initializing auth context')

      const storedToken = localStorage.getItem('auth_token')
      if (storedToken) {
        try {
          // Verify token and get user
          const currentUser = await authApi.getCurrentUser(storedToken)
          setToken(storedToken)
          setUser(currentUser)
          logger.info('AUTH_CTX_002', 'User restored from token', { email: currentUser.email })
        } catch (error) {
          logger.warn('AUTH_CTX_WARN_001', 'Invalid stored token - clearing')
          localStorage.removeItem('auth_token')
        }
      }

      setLoading(false)
    }

    initAuth()
  }, [])

  /**
   * Login user
   */
  const login = async (email: string, password: string) => {
    logger.info('AUTH_CTX_003', 'Logging in', { email })

    try {
      const response = await authApi.login(email, password)

      setToken(response.token)
      setUser(response.user)
      localStorage.setItem('auth_token', response.token)

      logger.info('AUTH_CTX_004', 'Login successful', { email: response.user.email })
    } catch (error) {
      logger.error('AUTH_CTX_ERR_001', 'Login failed', error as Error, { email })
      throw error
    }
  }

  /**
   * Register new user
   */
  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    logger.info('AUTH_CTX_005', 'Registering user', { email })

    try {
      const newUser = await authApi.register(firstName, lastName, email, password)

      logger.info('AUTH_CTX_006', 'Registration successful', { email: newUser.email })

      // Don't auto-login - user needs to verify email
      // Redirect to "Check your email" page instead
    } catch (error) {
      logger.error('AUTH_CTX_ERR_002', 'Registration failed', error as Error, { email })
      throw error
    }
  }

  /**
   * Logout user
   */
  const logout = () => {
    logger.info('AUTH_CTX_007', 'Logging out')

    if (token) {
      // Call backend logout (invalidates token)
      authApi.logout(token).catch(() => {
        // Ignore errors - logout locally anyway
      })
    }

    setToken(null)
    setUser(null)
    localStorage.removeItem('auth_token')

    logger.info('AUTH_CTX_008', 'Logged out successfully')
  }

  /**
   * Refresh JWT token
   */
  const refreshToken = async () => {
    logger.debug('AUTH_CTX_009', 'Refreshing token')

    if (!token) {
      throw new Error('No token to refresh')
    }

    try {
      const response = await authApi.refreshToken(token)

      setToken(response.token)
      setUser(response.user)
      localStorage.setItem('auth_token', response.token)

      logger.debug('AUTH_CTX_010', 'Token refreshed')
    } catch (error) {
      logger.error('AUTH_CTX_ERR_003', 'Token refresh failed', error as Error)
      // Token expired - logout
      logout()
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    refreshToken,
    isAuthenticated: !!user && !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * useAuth Hook
 *
 * Usage in any component:
 * const { user, login, logout, isAuthenticated } = useAuth()
 */
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
