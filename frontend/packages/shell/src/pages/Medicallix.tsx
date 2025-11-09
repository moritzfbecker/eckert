/**
 * Medicallix Page - AI-powered Medical Documentation Solution
 *
 * Revolutionary KI-Plattform für Echtzeit-Dokumentation im Gesundheitswesen
 * Category: 'medicallix'
 * Design: Black/White with Apple Gradient hover effects
 */

import { motion } from 'framer-motion'
import { Container } from '../../../shared/ui-components/Container'
import { Section } from '../../../shared/ui-components/Section'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'
import { Link } from 'react-router-dom'

const Medicallix = () => {
  const { language } = useTranslation()
  const config = useConfig('medicallix', language)

  return (
    <div className="min-h-screen bg-eckert-white">
      {/* Hero Section */}
      <Section spacing="none" className="pt-40 md:pt-48 pb-20 md:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="
                text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                font-black text-black mb-8
                leading-[1.1] tracking-tight
              "
            >
              {config.get('hero.title', 'Medicallix')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl lg:text-4xl text-black mb-12 leading-relaxed font-semibold"
            >
              {config.get('hero.subtitle', 'Give doctors and nurses their time back - for what really matters: the patients.')}
            </motion.p>

            {/* Key Promise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="
                bg-black text-white rounded-xl p-12 mb-12
                hover:shadow-apple-glow hover:scale-[1.02]
                transition-all duration-300
              "
            >
              <p className="text-3xl md:text-4xl font-bold text-white">
                {config.get('hero.promise', 'The world\'s first mobile AI platform for real-time documentation during patient consultations')}
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Divider */}
      <div className="w-full border-t border-black/10" />

      {/* Problem Section */}
      <Section spacing="none" className="py-20 md:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black text-center mb-16">
              {config.get('problem.title', 'The Bureaucracy Crisis in German Healthcare')}
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="
                  bg-black text-white rounded-xl p-8 text-center
                  hover:shadow-apple-glow hover:scale-105
                  transition-all duration-300
                "
              >
                <div className="text-7xl md:text-8xl font-black text-white mb-4">
                  {config.get('problem.stat1.value', '3-5h')}
                </div>
                <p className="text-lg md:text-xl text-white/80">
                  {config.get('problem.stat1.label', 'Daily documentation time per doctor')}
                </p>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="
                  bg-black text-white rounded-xl p-8 text-center
                  hover:shadow-apple-glow hover:scale-105
                  transition-all duration-300
                "
              >
                <div className="text-7xl md:text-8xl font-black text-white mb-4">
                  {config.get('problem.stat2.value', '784k')}
                </div>
                <p className="text-lg md:text-xl text-white/80">
                  {config.get('problem.stat2.label', 'Lost full-time positions in German healthcare')}
                </p>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="
                  bg-black text-white rounded-xl p-8 text-center
                  hover:shadow-apple-glow hover:scale-105
                  transition-all duration-300
                "
              >
                <div className="text-7xl md:text-8xl font-black text-white mb-4">
                  {config.get('problem.stat3.value', '32B€')}
                </div>
                <p className="text-lg md:text-xl text-white/80">
                  {config.get('problem.stat3.label', 'Annual cost of bureaucracy')}
                </p>
              </motion.div>
            </div>

            {/* Problem Description */}
            <p className="text-xl md:text-2xl text-black/70 text-center leading-relaxed">
              {config.get('problem.description', 'German doctors spend 30-45% of their working time on documentation instead of treating patients. The nursing shortage is even more dramatic.')}
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Divider */}
      <div className="w-full border-t border-black/10" />

      {/* Solution Section */}
      <Section spacing="none" className="py-20 md:py-32 bg-eckert-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black text-center mb-16">
              {config.get('solution.title', 'Our Revolutionary Solution')}
            </h2>

            {/* Solution Description */}
            <div className="
              bg-black text-white rounded-xl p-12 mb-16
              hover:shadow-apple-glow
              transition-all duration-300
            ">
              <p className="text-2xl md:text-3xl text-white leading-relaxed mb-8">
                {config.get('solution.description', 'A mobile AI platform that documents in real-time during patient consultations - adapting to natural workflows instead of disrupting them.')}
              </p>
              <p className="text-xl text-white/80">
                {config.get('solution.innovation', 'The breakthrough innovation: We solve the timing problem that all other providers ignore. Instead of reconstructing afterwards, our system continuously documents what is happening right now.')}
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-black/10 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-black mb-4">
                  {config.get('features.1.title', 'Continuous Speech Recognition')}
                </h3>
                <p className="text-lg text-black/70">
                  {config.get('features.1.description', 'Specialized for medical conversations with 99% accuracy, even in noisy hospital environments.')}
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-black/10 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-black mb-4">
                  {config.get('features.2.title', 'Discrete Input Methods')}
                </h3>
                <p className="text-lg text-black/70">
                  {config.get('features.2.description', 'Seamless switching between voice, handwriting, and quick-touch for sensitive information.')}
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-black/10 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-black mb-4">
                  {config.get('features.3.title', 'Local AI Models')}
                </h3>
                <p className="text-lg text-black/70">
                  {config.get('features.3.description', 'Maximum data protection: No data leaves the hospital. 100% offline capability with on-premise deployment.')}
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-black/10 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-black mb-4">
                  {config.get('features.4.title', 'Universal Integration')}
                </h3>
                <p className="text-lg text-black/70">
                  {config.get('features.4.description', 'Compatible with all hospital information systems through HL7 FHIR and RPA technology.')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Divider */}
      <div className="w-full border-t border-black/10" />

      {/* ROI Section */}
      <Section spacing="none" className="py-20 md:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black text-center mb-16">
              {config.get('roi.title', 'Extraordinary Return on Investment')}
            </h2>

            {/* ROI Card */}
            <motion.div
              className="
                bg-black text-white rounded-xl p-12 mb-16
                text-center
                hover:shadow-apple-glow hover:scale-[1.02]
                transition-all duration-300
              "
            >
              <div className="text-9xl font-black text-white mb-4">
                {config.get('roi.main.value', '36:1')}
              </div>
              <p className="text-3xl text-white/80">
                {config.get('roi.main.label', 'Average ROI for our clients')}
              </p>
            </motion.div>

            {/* ROI Examples */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Hospital */}
              <div className="bg-white border-2 border-black/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-black mb-6">
                  {config.get('roi.hospital.title', 'University Hospital')}
                </h3>
                <div className="space-y-4 mb-6">
                  <p className="text-lg text-black">
                    <span className="font-semibold">{config.get('roi.hospital.savings', 'Savings:')}</span> 75M€/year
                  </p>
                  <p className="text-lg text-black">
                    <span className="font-semibold">{config.get('roi.hospital.cost', 'Cost:')}</span> 2.9M€/year
                  </p>
                </div>
                <div className="text-5xl font-black text-black">
                  26:1
                </div>
              </div>

              {/* Mid-Size Hospital */}
              <div className="bg-white border-2 border-black/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-black mb-6">
                  {config.get('roi.midsize.title', 'Mid-Size Hospital')}
                </h3>
                <div className="space-y-4 mb-6">
                  <p className="text-lg text-black">
                    <span className="font-semibold">{config.get('roi.midsize.savings', 'Savings:')}</span> 4.3M€/year
                  </p>
                  <p className="text-lg text-black">
                    <span className="font-semibold">{config.get('roi.midsize.cost', 'Cost:')}</span> 244k€/year
                  </p>
                </div>
                <div className="text-5xl font-black text-black">
                  17:1
                </div>
              </div>

              {/* Nursing Home */}
              <div className="bg-white border-2 border-black/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-black mb-6">
                  {config.get('roi.nursing.title', 'Nursing Home')}
                </h3>
                <div className="space-y-4 mb-6">
                  <p className="text-lg text-black">
                    <span className="font-semibold">{config.get('roi.nursing.savings', 'Savings:')}</span> 1.2M€/year
                  </p>
                  <p className="text-lg text-black">
                    <span className="font-semibold">{config.get('roi.nursing.cost', 'Cost:')}</span> 14k€/year
                  </p>
                </div>
                <div className="text-5xl font-black text-black">
                  88:1
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Divider */}
      <div className="w-full border-t border-black/10" />

      {/* Market Potential */}
      <Section spacing="none" className="py-20 md:py-32 bg-eckert-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black text-center mb-16">
              {config.get('market.title', 'Enormous Market Potential')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              <div className="text-center">
                <div className="text-7xl md:text-8xl font-black text-black mb-4">
                  2M
                </div>
                <p className="text-lg md:text-xl text-black/70">
                  {config.get('market.users', 'Potential users in Germany')}
                </p>
              </div>

              <div className="text-center">
                <div className="text-7xl md:text-8xl font-black text-black mb-4">
                  1.2B€
                </div>
                <p className="text-lg md:text-xl text-black/70">
                  {config.get('market.tam', 'Total addressable market (TAM)')}
                </p>
              </div>

              <div className="text-center">
                <div className="text-7xl md:text-8xl font-black text-black mb-4">
                  420M€
                </div>
                <p className="text-lg md:text-xl text-black/70">
                  {config.get('market.sam', 'Serviceable addressable market (SAM)')}
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Divider */}
      <div className="w-full border-t border-black/10" />

      {/* CTA Section */}
      <Section spacing="none" className="py-20 md:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="
              bg-black text-white rounded-xl p-12 md:p-16
              text-center
              hover:shadow-apple-glow hover:scale-[1.01]
              transition-all duration-300
            ">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8">
                {config.get('cta.title', 'Ready to revolutionize medical documentation?')}
              </h2>

              <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
                {config.get('cta.subtitle', 'Join the future of healthcare. Give your medical staff the gift of time - for what really matters: the patients.')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/medicallix/app"
                  className="
                    inline-block
                    bg-white text-black
                    px-10 py-5
                    rounded-lg
                    font-bold text-xl
                    uppercase tracking-wider
                    hover:shadow-apple-glow hover:scale-105
                    transition-all duration-300
                  "
                >
                  {config.get('cta.button.demo', 'Try Live Demo')}
                </Link>
                <Link
                  to="/contact"
                  className="
                    inline-block
                    bg-black/10 text-white border-2 border-white/20
                    px-10 py-5
                    rounded-lg
                    font-bold text-xl
                    uppercase tracking-wider
                    hover:bg-white/10 hover:scale-105
                    transition-all duration-300
                  "
                >
                  {config.get('cta.button.contact', 'Contact Sales')}
                </Link>
              </div>

              <div className="mt-8 space-y-2">
                <p className="text-base text-white/60">
                  {config.get('cta.disclaimer', 'No sales pitch. No generic solutions.')}
                </p>
                <p className="text-base text-white/80">
                  {config.get('cta.promise', 'Only an evidence-based analysis of your greatest untapped potential.')}
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Bottom Spacer */}
      <div className="h-20 md:h-32" />
    </div>
  )
}

export default Medicallix
