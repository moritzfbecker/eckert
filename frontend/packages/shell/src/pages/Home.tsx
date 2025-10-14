import { motion } from 'framer-motion'
import { Button } from '@eckert-preisser/shared/ui'
import { Card } from '@eckert-preisser/shared/ui'
import { fadeInUp, slideInFromLeft, slideInFromRight } from '@eckert-preisser/shared/animations'

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            initial={slideInFromLeft.initial}
            animate={slideInFromLeft.animate}
            transition={slideInFromLeft.transition}
          >
            <h1 className="text-6xl font-bold mb-6">
              Welcome to{' '}
              <span className="text-gradient">
                Eckert Preisser
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Enterprise-level solutions for modern businesses.
              Built with cutting-edge technology and designed for scale.
            </p>
            <div className="flex gap-4">
              <Button variant="gradient" size="lg">
                Get Started
              </Button>
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={slideInFromRight.initial}
            animate={slideInFromRight.animate}
            transition={slideInFromRight.transition}
            className="relative"
          >
            <div className="w-full h-96 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-yellow-500/20 rounded-lg backdrop-blur-sm border border-gray-800 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🚀</div>
                <p className="text-2xl font-semibold text-gradient">
                  Enterprise Ready
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          transition={fadeInUp.transition}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Why Choose <span className="text-gradient">Eckert Preisser</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Built with performance in mind. Optimized for speed and efficiency.',
  },
  {
    icon: '🔒',
    title: 'Secure',
    description: 'Enterprise-grade security with JWT authentication and OAuth2 support.',
  },
  {
    icon: '📊',
    title: 'Scalable',
    description: 'Microservices architecture designed to scale with your business.',
  },
  {
    icon: '🎨',
    title: 'Modern Design',
    description: 'Clean, minimalist interface with smooth animations and transitions.',
  },
  {
    icon: '🔧',
    title: 'Modular',
    description: 'Component-based architecture for easy maintenance and extensibility.',
  },
  {
    icon: '🌐',
    title: 'Cloud Ready',
    description: 'Containerized with Docker, ready for deployment anywhere.',
  },
]

export default Home
