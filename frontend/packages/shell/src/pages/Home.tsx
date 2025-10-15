import { Container } from '../../../shared/ui-components/Container'
import { Section } from '../../../shared/ui-components/Section'

const Home = () => {
  return (
    <div className="min-h-screen bg-eckert-white pt-24 md:pt-32">
      {/* Main Content */}
      <Section spacing="xl">
        <Container>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
              Eckert Preisser
            </h1>
            <p className="text-xl md:text-2xl text-black mb-12">
              Enterprise Web Application
            </p>
          </div>
        </Container>
      </Section>
    </div>
  )
}

export default Home
