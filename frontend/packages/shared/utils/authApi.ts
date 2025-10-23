/**
 * Auth API Client
 *
 * RESTful API calls to auth-service via API Gateway.
 * All endpoints go through: http://localhost:8080/api/auth/*
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 2.13.0
 */

import { logger } from './logger'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
const AUTH_API = `${API_BASE_URL}/api/auth`

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  emailVerified: boolean
  active: boolean
  language: string
  createdAt: string
  lastLoginAt?: string
}

export interface LoginResponse {
  token: string
  tokenType: string
  user: User
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  errorCode?: string
}

/**
 * Register new user
 */
export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<User> => {
  logger.info('AUTH_FE_001', 'Registering new user', { email })

  const response = await fetch(`${AUTH_API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email, password }),
  })

  const data: ApiResponse<User> = await response.json()

  if (!response.ok || !data.success) {
    logger.error('AUTH_FE_ERR_001', 'Registration failed', new Error(data.message), { email })
    throw new Error(data.message || 'Registration failed')
  }

  logger.info('AUTH_FE_002', 'User registered successfully', { email })
  return data.data!
}

/**
 * Login user
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  logger.info('AUTH_FE_003', 'Logging in user', { email })

  const response = await fetch(`${AUTH_API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data: ApiResponse<LoginResponse> = await response.json()

  if (!response.ok || !data.success) {
    logger.error('AUTH_FE_ERR_002', 'Login failed', new Error(data.message), { email })
    throw new Error(data.message || 'Login failed')
  }

  logger.info('AUTH_FE_004', 'User logged in successfully', { email })
  return data.data!
}

/**
 * Refresh JWT token
 */
export const refreshToken = async (token: string): Promise<LoginResponse> => {
  logger.debug('AUTH_FE_005', 'Refreshing token')

  const response = await fetch(`${AUTH_API}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })

  const data: ApiResponse<LoginResponse> = await response.json()

  if (!response.ok || !data.success) {
    logger.warn('AUTH_FE_WARN_001', 'Token refresh failed')
    throw new Error(data.message || 'Token refresh failed')
  }

  logger.debug('AUTH_FE_006', 'Token refreshed successfully')
  return data.data!
}

/**
 * Verify email with token
 */
export const verifyEmail = async (token: string): Promise<void> => {
  logger.info('AUTH_FE_007', 'Verifying email')

  const response = await fetch(`${AUTH_API}/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })

  const data: ApiResponse<void> = await response.json()

  if (!response.ok || !data.success) {
    logger.error('AUTH_FE_ERR_003', 'Email verification failed', new Error(data.message))
    throw new Error(data.message || 'Email verification failed')
  }

  logger.info('AUTH_FE_008', 'Email verified successfully')
}

/**
 * Request password reset
 */
export const forgotPassword = async (email: string): Promise<void> => {
  logger.info('AUTH_FE_009', 'Requesting password reset', { email })

  const response = await fetch(`${AUTH_API}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  const data: ApiResponse<void> = await response.json()

  if (!response.ok || !data.success) {
    logger.error('AUTH_FE_ERR_004', 'Password reset request failed', new Error(data.message), { email })
    throw new Error(data.message || 'Password reset request failed')
  }

  logger.info('AUTH_FE_010', 'Password reset email sent', { email })
}

/**
 * Reset password with token
 */
export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  logger.info('AUTH_FE_011', 'Resetting password')

  const response = await fetch(`${AUTH_API}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  })

  const data: ApiResponse<void> = await response.json()

  if (!response.ok || !data.success) {
    logger.error('AUTH_FE_ERR_005', 'Password reset failed', new Error(data.message))
    throw new Error(data.message || 'Password reset failed')
  }

  logger.info('AUTH_FE_012', 'Password reset successfully')
}

/**
 * Get current user
 */
export const getCurrentUser = async (token: string): Promise<User> => {
  logger.debug('AUTH_FE_013', 'Getting current user')

  const response = await fetch(`${AUTH_API}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const data: ApiResponse<User> = await response.json()

  if (!response.ok || !data.success) {
    logger.warn('AUTH_FE_WARN_002', 'Failed to get current user')
    throw new Error(data.message || 'Failed to get current user')
  }

  return data.data!
}

/**
 * Logout user
 */
export const logout = async (token: string): Promise<void> => {
  logger.info('AUTH_FE_014', 'Logging out user')

  const response = await fetch(`${AUTH_API}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const data: ApiResponse<void> = await response.json()

  if (!response.ok || !data.success) {
    logger.warn('AUTH_FE_WARN_003', 'Logout request failed')
    // Don't throw - logout locally anyway
  }

  logger.info('AUTH_FE_015', 'User logged out successfully')
}
