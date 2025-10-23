import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { I18nProvider } from '@eckert-preisser/shared/contexts'
import { AuthProvider } from '@eckert-preisser/shared/contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Concept from './pages/Concept'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import CookiePolicy from './pages/CookiePolicy'
import Status from './pages/Status'

function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <div className="min-h-screen bg-eckert-white flex flex-col">
          <Header />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-grow"
          >
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/concept" element={<Concept />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/status" element={<Status />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

              {/* Legal Routes */}
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
            </Routes>
          </motion.main>
          <Footer />
        </div>
      </AuthProvider>
    </I18nProvider>
  )
}

export default App
