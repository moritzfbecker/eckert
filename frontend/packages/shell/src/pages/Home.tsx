import { Container } from '../../../shared/ui-components/Container'
import { Section } from '../../../shared/ui-components/Section'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'

/**
 * Home Page - Example of new Config API
 *
 * Demonstrates the enterprise-level configuration system:
 * - Fluent API with .get() pattern
 * - Auto-registration of defaults
 * - Backend synchronization
 * - No hardcoded strings!
 */
const Home = () => {
  // Get current language dynamically
  const { language } = useTranslation()

  // Load homepage config with DYNAMIC language (not hardcoded!)
  const config = useConfig('homepage', language)

  return (
    <div className="min-h-screen bg-eckert-white pt-32 md:pt-40">
      {/* Main Content */}
      <Section spacing="xl">
        <Container>
          <div className="text-center">
            {/* New Config API - English defaults, German from backend */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
              {config.get('home.title', 'Eckert Preisser')}
            </h1>
            <p className="text-xl md:text-2xl text-black mb-12">
              {config.get('home.subtitle', 'Enterprise Web Application')}
            </p>
            <p className="text-sm text-black/50 mt-8">
              {config.get('home.description', 'Built with cutting-edge technology and designed for scale.')}
            </p>
          </div>
        </Container>
      </Section>
    </div>
  )
}

export default Home
