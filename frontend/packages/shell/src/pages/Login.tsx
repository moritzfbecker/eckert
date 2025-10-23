/**
 * Login Page
 *
 * User login with email and password.
 * Uses Config API v2.0 for ALL text (NO hardcoded strings!)
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 2.13.0
 */

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@eckert-preisser/shared/contexts/AuthContext'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'
import { Container } from '../../../shared/ui-components/Container'

const Login = () => {
  const { language } = useTranslation()
  const config = useConfig('auth', language)
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard') // Redirect to dashboard after login
    } catch (err) {
      setError(err instanceof Error ? err.message : config.get('auth.login.error', 'Login failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-eckert-white pt-32 pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 text-black">
              {config.get('auth.login.title', 'Login')}
            </h1>
            <p className="text-black/60">
              {config.get('auth.login.subtitle', 'Sign in to your account')}
            </p>
          </div>

          {/* Form */}
          <div className="bg-black rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500 text-sm">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  {config.get('auth.login.email', 'Email Address')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white border border-white/20 rounded-md text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  placeholder={config.get('auth.login.email.placeholder', 'your@email.com')}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  {config.get('auth.login.password', 'Password')}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-white border border-white/20 rounded-md text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  placeholder={config.get('auth.login.password.placeholder', '••••••••')}
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {config.get('auth.login.forgot', 'Forgot password?')}
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-white text-black font-semibold rounded-md hover:shadow-apple-glow hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? config.get('auth.login.loading', 'Logging in...')
                  : config.get('auth.login.submit', 'Login')}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                {config.get('auth.login.noAccount', "Don't have an account?")}{' '}
                <Link to="/register" className="text-white hover:underline font-semibold">
                  {config.get('auth.login.register', 'Register')}
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}

export default Login
