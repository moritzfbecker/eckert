import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Home from './pages/Home'

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </motion.main>
    </div>
  )
}

export default App
