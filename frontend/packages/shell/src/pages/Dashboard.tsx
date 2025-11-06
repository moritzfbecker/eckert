import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Container } from '../../../shared/ui-components/Container'
import { ConfigEditor } from '../components/ConfigEditor'

const Dashboard = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('configAdminToken')
    const storedUsername = localStorage.getItem('configAdminUsername')

    if (!token || !storedUsername) {
      // Not logged in - redirect to login
      navigate('/config-admin/login')
      return
    }

    setUsername(storedUsername)
    setLoading(false)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('configAdminToken')
    localStorage.removeItem('configAdminUsername')
    navigate('/config-admin/login')
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-eckert-white pt-32 pb-20">
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-black mb-8 text-black">
            Config Editor Dashboard
          </h1>

          {/* User Info */}
          <div className="bg-black rounded-lg p-8 text-white space-y-6 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Willkommen, {username}!</h2>
              <p className="text-white/60">
                Sie können hier alle Website-Texte in allen Sprachen bearbeiten.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:shadow-apple-glow hover:scale-105 transition-all duration-300"
            >
              Abmelden
            </button>
          </div>

          {/* Config Editor */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-black">
              Website-Texte bearbeiten
            </h2>
            <ConfigEditor />
          </div>
        </motion.div>
      </Container>
    </div>
  )
}

export default Dashboard
