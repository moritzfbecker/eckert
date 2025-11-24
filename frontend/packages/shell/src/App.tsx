import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { I18nProvider, CookieConsentProvider } from '@eckert-preisser/shared/contexts'
import { AuthProvider } from '@eckert-preisser/shared/contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import CookieSettings from './components/CookieSettings'
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
import Medicallix from './pages/Medicallix'
import MedicallixApp from './pages/MedicallixApp'
import WissenschaftlicheFundierung from './pages/WissenschaftlicheFundierung'
import FinnlandQuellen from './pages/FinnlandQuellen'
import RaketenStart from './pages/RaketenStart'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <I18nProvider>
      <CookieConsentProvider>
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
                <Route path="/medicallix" element={<Medicallix />} />
                <Route path="/concept" element={<Concept />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/status" element={<Status />} />

                {/* New Routes - Email 1, 2, 3 */}
                <Route path="/wissenschaftliche-fundierung" element={<WissenschaftlicheFundierung />} />
                <Route path="/finnland-quellen" element={<FinnlandQuellen />} />
                <Route path="/raketen-start" element={<RaketenStart />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/medicallix/app" element={
                  <ProtectedRoute>
                    <MedicallixApp />
                  </ProtectedRoute>
                } />

                {/* Legal Routes */}
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
              </Routes>
            </motion.main>
            <Footer />

            {/* Cookie Consent Banner - Shows on first visit */}
            <CookieConsent />

            {/* Cookie Settings Modal - Opens from Footer or Banner */}
            <CookieSettings />
          </div>
        </AuthProvider>
      </CookieConsentProvider>
    </I18nProvider>
  )
}

export default App
