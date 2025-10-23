import { motion } from 'framer-motion'
import { useAuth } from '@eckert-preisser/shared/contexts/AuthContext'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'
import { Container } from '../../../shared/ui-components/Container'

const Dashboard = () => {
  const { language } = useTranslation()
  const config = useConfig('auth', language)
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <div className="min-h-screen bg-eckert-white pt-32 pb-20">
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-black mb-8 text-black">
            {config.get('auth.dashboard.title', 'Dashboard')}
          </h1>

          <div className="bg-black rounded-lg p-8 text-white space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{config.get('auth.dashboard.welcome', 'Welcome')}, {user.firstName}!</h2>
              <div className="space-y-2 text-white/80">
                <p><strong>{config.get('auth.dashboard.email', 'Email')}:</strong> {user.email}</p>
                <p><strong>{config.get('auth.dashboard.role', 'Role')}:</strong> {user.role}</p>
                <p><strong>{config.get('auth.dashboard.verified', 'Email Verified')}:</strong> {user.emailVerified ? config.get('auth.dashboard.yes', 'Yes') : config.get('auth.dashboard.no', 'No')}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:shadow-apple-glow hover:scale-105 transition-all duration-300"
            >
              {config.get('auth.dashboard.logout', 'Logout')}
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}

export default Dashboard
