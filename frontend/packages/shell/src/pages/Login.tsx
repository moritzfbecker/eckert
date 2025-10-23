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
    <div className="min-h-screen bg-eckert-white flex items-center justify-center py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-left"
            >
              <h1 className="text-7xl font-black mb-6 text-black leading-tight">
                {config.get('auth.login.hero', 'Welcome Back')}
              </h1>
              <p className="text-2xl text-black/60 mb-8">
                {config.get('auth.login.heroSubtitle', 'Sign in to continue your journey with Eckert Preisser Enterprise')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-black text-lg">{config.get('auth.login.feature1', 'Secure JWT authentication')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-black text-lg">{config.get('auth.login.feature2', 'Enterprise-grade security')}</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-black rounded-2xl p-10 shadow-2xl"
            >
              <h2 className="text-3xl font-bold text-white mb-8">
                {config.get('auth.login.formTitle', 'Sign In')}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    {config.get('auth.login.email', 'Email Address')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder={config.get('auth.login.email.placeholder', 'your@email.com')}
                  />
                </div>

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
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder={config.get('auth.login.password.placeholder', '••••••••')}
                  />
                </div>

                <div className="text-right">
                  <Link to="/forgot-password" className="text-white/60 hover:text-white text-sm transition-colors hover:underline">
                    {config.get('auth.login.forgot', 'Forgot password?')}
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-white text-black font-bold rounded-lg hover:shadow-apple-glow hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {loading ? config.get('auth.login.loading', 'Logging in...') : config.get('auth.login.submit', 'Login')}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-white/60 text-sm">
                  {config.get('auth.login.noAccount', "Don't have an account?")}{' '}
                  <Link to="/register" className="text-white hover:underline font-semibold transition-colors">
                    {config.get('auth.login.register', 'Register now')}
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}

export default Login
