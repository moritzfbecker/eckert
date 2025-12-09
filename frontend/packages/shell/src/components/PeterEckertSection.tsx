/**
 * Peter Eckert Section - Founder Credibility with Elite University Logos
 *
 * Shows Peter Eckert's credentials with:
 * - DPES Logo (Dhole Phali School for Excellence)
 * - IIA Logo (International Industry Adviser)
 * - Personal quote about international collaboration
 *
 * Category: 'homepage'
 * Design: Black/White with subtle animations
 */

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '../../../shared/ui-components/Container'
import { Section } from '../../../shared/ui-components/Section'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'

const PeterEckertSection: React.FC = () => {
  const { language } = useTranslation()
  const config = useConfig('homepage', language)

  return (
    <Section spacing="none" className="py-20 md:py-32 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6">
              {config.get('eckert.section.title', 'International Expertise')}
            </h2>
            <p className="text-xl md:text-2xl text-black/60">
              {config.get('eckert.section.subtitle', 'Global network of excellence in talent development')}
            </p>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-subtle">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Left: Elite University Logos */}
              <div className="md:w-1/2 flex flex-col items-center justify-center gap-8">
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  src={`${import.meta.env.BASE_URL}logos/dpeslogo.svg`}
                  alt="Dhole Phali School for Excellence"
                  className="w-full max-w-sm opacity-70 hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    console.error('Failed to load DPES logo')
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  src={`${import.meta.env.BASE_URL}logos/Dhole_IIA.png`}
                  alt="International Industry Adviser"
                  className="w-full max-w-[240px] rounded-xl opacity-70 hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    console.error('Failed to load IIA logo')
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>

              {/* Right: Text Content */}
              <div className="md:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                  {config.get('eckert.role.title', 'International Industry Adviser')}
                </h3>
                <p className="text-lg text-black/70 leading-relaxed mb-8">
                  {config.get('eckert.role.description', 'Peter Eckert is International Industry Adviser at the Dhole Phali School for Excellence. This strategic partnership unites international expertise in talent development and executive education.')}
                </p>

                {/* Quote */}
                <div className="border-l-4 border-black pl-6 mb-6">
                  <p className="text-lg md:text-xl text-black/80 leading-relaxed mb-4 italic">
                    "{config.get('eckert.quote', 'The collaboration with excellent educational institutions worldwide enables us to bring best practices in talent development to Germany and vice versa to share German expertise internationally.')}"
                  </p>
                  <div className="text-sm text-black/60 font-semibold">
                    Peter Eckert
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Optional: Würth Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="
              bg-black text-white rounded-2xl p-8 md:p-12
              text-center
              hover:shadow-apple-glow
              transition-all duration-300
            ">
              <div className="text-3xl md:text-4xl font-light text-white/90 leading-relaxed mb-6 italic">
                "{config.get('wuerth.quote', 'Success is not about having the most resources. It is about making the most of what you have.')}"
              </div>
              <div className="text-lg text-white/70">
                — {config.get('wuerth.author', 'Reinhold Würth')}, {config.get('wuerth.title', 'Entrepreneur & Hidden Champion')}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}

export default PeterEckertSection
