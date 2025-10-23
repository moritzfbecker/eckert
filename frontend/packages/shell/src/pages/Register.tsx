import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@eckert-preisser/shared/contexts/AuthContext'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'
import { Container } from '../../../shared/ui-components/Container'

const Register = () => {
  const { language } = useTranslation()
  const config = useConfig('auth', language)
  const { register } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(formData.firstName, formData.lastName, formData.email, formData.password)
      navigate('/register-success') // Show "check your email" message
    } catch (err) {
      setError(err instanceof Error ? err.message : config.get('auth.register.error', 'Registration failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-eckert-white pt-32 pb-20">
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 text-black">
              {config.get('auth.register.title', 'Create Account')}
            </h1>
            <p className="text-black/60">{config.get('auth.register.subtitle', 'Join Eckert Preisser Enterprise')}</p>
          </div>

          <div className="bg-black rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500 text-sm">{error}</div>}

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  {config.get('auth.register.firstName', 'First Name')}
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white border border-white/20 rounded-md text-black"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  {config.get('auth.register.lastName', 'Last Name')}
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white border border-white/20 rounded-md text-black"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  {config.get('auth.register.email', 'Email Address')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white border border-white/20 rounded-md text-black"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  {config.get('auth.register.password', 'Password')}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-white border border-white/20 rounded-md text-black"
                />
                <p className="text-white/40 text-xs mt-1">{config.get('auth.register.passwordHint', 'Minimum 8 characters')}</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-white text-black font-semibold rounded-md hover:shadow-apple-glow hover:scale-105 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? config.get('auth.register.loading', 'Creating account...') : config.get('auth.register.submit', 'Create Account')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                {config.get('auth.register.hasAccount', 'Already have an account?')}{' '}
                <Link to="/login" className="text-white hover:underline font-semibold">
                  {config.get('auth.register.login', 'Login')}
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}

export default Register
