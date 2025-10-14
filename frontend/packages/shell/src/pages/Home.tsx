import { motion } from 'framer-motion'
import { Button } from '../../../shared/ui-components/Button'
import { GlassCard } from '../../../shared/ui-components/GlassCard'
import { Container } from '../../../shared/ui-components/Container'
import { Section } from '../../../shared/ui-components/Section'
import { Hero, HeroTitle, HeroSubtitle, HeroActions } from '../../../shared/ui-components/Hero'
import { t } from '../../../shared/utils/i18n'

const Home = () => {
  return (
    <div className="min-h-screen bg-eckert-white">
      {/* Hero Section */}
      <Hero>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div>
              <HeroTitle>
                {t('home.hero.title')}{' '}
                <span className="text-black">Eckert Preisser</span>
              </HeroTitle>

              <HeroSubtitle className="text-black">{t('home.hero.subtitle')}</HeroSubtitle>

              <HeroActions>
                <Button variant="primary" size="lg">
                  {t('button.get.started')}
                </Button>
                <Button variant="secondary" size="lg">
                  {t('button.learn.more')}
                </Button>
              </HeroActions>
            </div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="
                w-full h-96
                bg-black
                rounded-2xl
                flex items-center justify-center
                shadow-elevated
                border border-black/10
              ">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-6xl mb-4"
                  >
                    🚀
                  </motion.div>
                  <p className="text-2xl font-semibold text-white">
                    Enterprise Ready
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Hero>

      {/* Features Section */}
      <Section variant="dark" spacing="lg">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-black"
          >
            {t('home.features.title')}{' '}
            <span className="text-black">Eckert Preisser</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlassCard>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-white leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="
              text-center
              bg-black text-white
              rounded-2xl
              p-12 md:p-16
              shadow-elevated
            "
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white mb-12 max-w-2xl mx-auto">
              Join thousands of companies using our enterprise platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                {t('button.get.started')}
              </Button>
              <Button variant="secondary" size="lg">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>
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
