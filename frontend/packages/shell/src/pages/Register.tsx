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
    <div className="min-h-screen bg-eckert-white flex items-center justify-center py-20">
      <Container>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-left">
              <h1 className="text-7xl font-black mb-6 text-black leading-tight">
                {config.get('auth.register.hero', 'Join Us')}
              </h1>
              <p className="text-2xl text-black/60 mb-8">
                {config.get('auth.register.heroSubtitle', 'Start your journey with enterprise-grade solutions')}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="bg-black rounded-2xl p-10 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-8">{config.get('auth.register.formTitle', 'Create Account')}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500 text-sm">{error}</motion.div>}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">{config.get('auth.register.firstName', 'First Name')}</label>
                    <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">{config.get('auth.register.lastName', 'Last Name')}</label>
                    <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">{config.get('auth.register.email', 'Email Address')}</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">{config.get('auth.register.password', 'Password')}</label>
                  <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required minLength={8} className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" />
                  <p className="text-white/40 text-xs mt-1">{config.get('auth.register.passwordHint', 'Minimum 8 characters')}</p>
                </div>

                <button type="submit" disabled={loading} className="w-full px-6 py-4 bg-white text-black font-bold rounded-lg hover:shadow-apple-glow hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 text-lg">
                  {loading ? config.get('auth.register.loading', 'Creating...') : config.get('auth.register.submit', 'Create Account')}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-white/60 text-sm">
                  {config.get('auth.register.hasAccount', 'Already have an account?')}{' '}
                  <Link to="/login" className="text-white hover:underline font-semibold transition-colors">{config.get('auth.register.login', 'Login')}</Link>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}

export default Register
