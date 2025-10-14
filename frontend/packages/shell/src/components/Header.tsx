import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-gradient">Eckert Preisser</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Products
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Dashboard
            </Link>
            <button className="px-6 py-2 bg-apple-gradient rounded-lg hover:shadow-apple-glow transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header
