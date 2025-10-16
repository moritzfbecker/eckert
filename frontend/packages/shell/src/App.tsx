import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { I18nProvider } from '@eckert-preisser/shared/contexts'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

function App() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-eckert-white flex flex-col">
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-grow"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<div className="container mx-auto py-20"><h1 className="text-4xl">Products Page (Coming Soon)</h1></div>} />
            <Route path="/dashboard" element={<div className="container mx-auto py-20"><h1 className="text-4xl">Dashboard Page (Coming Soon)</h1></div>} />
          </Routes>
        </motion.main>
        <Footer />
      </div>
    </I18nProvider>
  )
}

export default App
