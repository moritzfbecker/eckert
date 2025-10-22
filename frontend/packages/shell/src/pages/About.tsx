/**
 * About Page - v1.0
 *
 * About us / About me page
 * Category: 'about'
 * Design: Schwarz/Weiß, Professional, Clean
 */

import { motion } from 'framer-motion'
import { Container } from '../../../shared/ui-components/Container'
import { Section } from '../../../shared/ui-components/Section'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'

const About = () => {
  const { language } = useTranslation()
  const config = useConfig('about', language)

  return (
    <div className="min-h-screen bg-eckert-white pt-24 pb-20">
      <Container>
        <div className="py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-6"
            >
              {config.get('about.title', 'About Us')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-black/70 max-w-3xl mx-auto"
            >
              {config.get('about.subtitle', 'Who we are and what drives us')}
            </motion.p>
          </div>

          {/* Content Sections */}
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Mission Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-black text-white rounded-xl p-10 md:p-12 hover:shadow-apple-glow hover:scale-[1.01] transition-all duration-300">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {config.get('about.mission.title', 'Our Mission')}
                </h2>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                  {config.get('about.mission.text1', 'We help companies unlock their untapped human performance potential through systematic development of the third pillar.')}
                </p>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  {config.get('about.mission.text2', 'Our approach is evidence-based, documented over 16 years, and proven with measurable results: 8-12% latent performance potential that compensates for structural weaknesses in technology or resources.')}
                </p>
              </div>
            </motion.section>

            {/* Story Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                {config.get('about.story.title', 'Our Story')}
              </h2>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-black/70 leading-relaxed">
                  {config.get('about.story.text1', 'Founded on the belief that the most valuable resource in any organization is not being systematically developed, we have spent over 16 years perfecting a methodology that goes beyond traditional consulting.')}
                </p>
                <p className="text-lg md:text-xl text-black/70 leading-relaxed">
                  {config.get('about.story.text2', 'Our work with ZOLLERN, a Hidden Champion in tool measurement technology, exemplifies our approach: 16 years of continuous collaboration resulting in a documented 8% contribution to pre-tax operating margin.')}
                </p>
                <p className="text-lg md:text-xl text-black/70 leading-relaxed">
                  {config.get('about.story.text3', 'Today, we serve elite companies, tech leaders, and resource-rich organizations that all share one challenge: unlocking the systematic development of human performance potential.')}
                </p>
              </div>
            </motion.section>

            {/* Approach Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                {config.get('about.approach.title', 'Our Approach')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Principle 1 */}
                <div className="bg-black text-white rounded-xl p-8 hover:shadow-apple-glow hover:scale-[1.02] transition-all duration-300">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {config.get('about.approach.principle1.title', 'Evidence-Based')}
                  </h3>
                  <p className="text-base text-white/80 leading-relaxed">
                    {config.get('about.approach.principle1.text', 'Every recommendation backed by data, every result measurable, every claim documented.')}
                  </p>
                </div>

                {/* Principle 2 */}
                <div className="bg-black text-white rounded-xl p-8 hover:shadow-apple-glow hover:scale-[1.02] transition-all duration-300">
                  <div className="text-5xl mb-4">🔬</div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {config.get('about.approach.principle2.title', 'Scientific Rigor')}
                  </h3>
                  <p className="text-base text-white/80 leading-relaxed">
                    {config.get('about.approach.principle2.text', 'Combined academic research with entrepreneurial pragmatism for real-world impact.')}
                  </p>
                </div>

                {/* Principle 3 */}
                <div className="bg-black text-white rounded-xl p-8 hover:shadow-apple-glow hover:scale-[1.02] transition-all duration-300">
                  <div className="text-5xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {config.get('about.approach.principle3.title', 'Long-Term Commitment')}
                  </h3>
                  <p className="text-base text-white/80 leading-relaxed">
                    {config.get('about.approach.principle3.text', 'No quick fixes. Systematic transformation over years, not months.')}
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Team Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                {config.get('about.team.title', 'Who We Are')}
              </h2>
              <div className="bg-black text-white rounded-xl p-10 md:p-12">
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                  {config.get('about.team.text1', 'We are a network of experts combining scientific research, entrepreneurial experience, and systematic human performance development.')}
                </p>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                  {config.get('about.team.text2', 'Our methods are rooted in 16 years of documented case studies, peer-reviewed research, and real-world validation across multiple industries.')}
                </p>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  {config.get('about.team.text3', 'We serve clients who seek not just advice, but transformation. Not presentations, but measurable results. Not quick wins, but sustainable competitive advantage.')}
                </p>
              </div>
            </motion.section>

            {/* Results Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
                {config.get('about.results.title', 'Our Track Record')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Result 1 */}
                <div className="text-center">
                  <div className="text-6xl md:text-7xl font-black text-black mb-4">
                    {config.get('about.results.years', '16')}
                  </div>
                  <p className="text-lg text-black/70">
                    {config.get('about.results.years.label', 'Years documented transformation')}
                  </p>
                </div>

                {/* Result 2 */}
                <div className="text-center">
                  <div className="text-6xl md:text-7xl font-black text-black mb-4">
                    {config.get('about.results.roi', '340%')}
                  </div>
                  <p className="text-lg text-black/70">
                    {config.get('about.results.roi.label', 'Average ROI with clients')}
                  </p>
                </div>

                {/* Result 3 */}
                <div className="text-center">
                  <div className="text-6xl md:text-7xl font-black text-black mb-4">
                    {config.get('about.results.potential', '8-12%')}
                  </div>
                  <p className="text-lg text-black/70">
                    {config.get('about.results.potential.label', 'Latent performance potential unlocked')}
                  </p>
                </div>
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center pt-8"
            >
              <div className="bg-black text-white rounded-xl p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {config.get('about.cta.title', 'Ready to Unlock Your Potential?')}
                </h2>
                <p className="text-lg md:text-xl text-white/80 mb-8">
                  {config.get('about.cta.text', 'Discover how our proven methodology can help your organization achieve more with less.')}
                </p>
                <a
                  href="/contact"
                  className="
                    inline-block
                    bg-white text-black
                    px-10 py-5
                    rounded-lg
                    font-bold text-lg
                    uppercase tracking-wider
                    hover:shadow-apple-glow hover:scale-105
                    transition-all duration-300
                  "
                >
                  {config.get('about.cta.button', 'Get in Touch')}
                </a>
              </div>
            </motion.section>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default About
