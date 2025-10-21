/**
 * Home Page - v2.0 Config API
 *
 * Professional homepage with high-impact storytelling
 * Category: 'homepage'
 * Design: Schwarz/Weiß, Apple Gradient hover, Professional typography
 */

import { motion } from 'framer-motion'
import { Container } from '../../../shared/ui-components/Container'
import { Section } from '../../../shared/ui-components/Section'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'
import { Link } from 'react-router-dom'

const Home = () => {
  const { language } = useTranslation()
  const config = useConfig('homepage', language)

  return (
    <div className="min-h-screen bg-eckert-white">
      {/* Hero Section - Maximum Impact */}
      <Section spacing="none" className="pt-40 md:pt-48 pb-20 md:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            {/* Preheading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base text-black/50 mb-8 uppercase tracking-[0.3em] text-center font-medium"
            >
              {config.get('home.hero.preheading', 'A Question That Arises')}
            </motion.p>

            {/* Main Heading - Huge Impact */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="
                text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                font-black text-black mb-12
                leading-[1.1] tracking-tight
                text-center
              "
            >
              {config.get('home.hero.title', 'Why do you invest millions in strategy – and still only harvest mediocrity?')}
            </motion.h1>

            {/* Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-3xl mx-auto text-center space-y-8"
            >
              <p className="text-xl md:text-2xl text-black/70 leading-relaxed">
                {config.get('home.hero.text1', 'Your competitors use the same consultancies. The same frameworks. The same "best practices". The result? An expensive balance of power.')}
              </p>

              <div className="pt-8">
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
                  {config.get('home.hero.text2', 'Maybe the problem isn\'t what you do.')}
                </p>
                <p className="text-xl md:text-2xl text-black/60">
                  {config.get('home.hero.text3', 'But what nobody mentions: The unused third dimension of your organization.')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Spacer */}
      <div className="h-20 md:h-32" />

      {/* Problem Section - 3 Thoughts */}
      <Section spacing="none" className="py-20 md:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6">
                {config.get('home.problem.title', 'The Real Problem')}
              </h2>
              <p className="text-2xl md:text-3xl text-black/60 mb-4">
                {config.get('home.problem.subtitle', 'You are optimizing the wrong variables')}
              </p>
              <p className="text-lg md:text-xl text-black/50 italic">
                {config.get('home.problem.intro', 'Three thoughts you may have already had yourself – but haven\'t thought through to the end')}
              </p>
            </div>

            {/* Three Thoughts - Staggered Cards */}
            <div className="space-y-6 md:space-y-8">
              {/* Thought 1 */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="
                  bg-black text-white rounded-xl p-8 md:p-10
                  hover:shadow-apple-glow hover:scale-[1.02]
                  transition-all duration-300
                "
              >
                <div className="flex items-start gap-6">
                  <span className="text-5xl md:text-6xl flex-shrink-0" role="img" aria-label="thought">💭</span>
                  <div className="flex-1">
                    <p className="text-xl md:text-2xl text-white mb-4 italic font-medium">
                      {config.get('home.problem.thought1.quote', '"Our strategy is solid. But the implementation..."')}
                    </p>
                    <p className="text-base md:text-lg text-white/80 leading-relaxed">
                      {config.get('home.problem.thought1.text', 'You\'re right. But what if the "implementation problem" is a symptom – not the disease? What if the most brilliant strategy shatters against an invisible ceiling?')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Thought 2 */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="
                  bg-black text-white rounded-xl p-8 md:p-10
                  hover:shadow-apple-glow hover:scale-[1.02]
                  transition-all duration-300
                "
              >
                <div className="flex items-start gap-6">
                  <span className="text-5xl md:text-6xl flex-shrink-0" role="img" aria-label="thinking">🤔</span>
                  <div className="flex-1">
                    <p className="text-xl md:text-2xl text-white mb-4 italic font-medium">
                      {config.get('home.problem.thought2.quote', '"We have the technology. We have the resources."')}
                    </p>
                    <p className="text-base md:text-lg text-white/80 leading-relaxed">
                      {config.get('home.problem.thought2.text', 'Two out of three pillars. But when did you last measure the Human Performance Potential of your organization? Not engagement. Not satisfaction. But: latent performance potential.')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Thought 3 */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="
                  bg-black text-white rounded-xl p-8 md:p-10
                  hover:shadow-apple-glow hover:scale-[1.02]
                  transition-all duration-300
                "
              >
                <div className="flex items-start gap-6">
                  <span className="text-5xl md:text-6xl flex-shrink-0" role="img" aria-label="lightning">⚡</span>
                  <div className="flex-1">
                    <p className="text-xl md:text-2xl text-white mb-4 italic font-medium">
                      {config.get('home.problem.thought3.quote', '"Our people are already giving 100%."')}
                    </p>
                    <p className="text-base md:text-lg text-white/80 leading-relaxed">
                      {config.get('home.problem.thought3.text', 'What if "100%" is only what your current system extracts from them? Finland\'s basketball players also thought they were at their limit. Until someone changed the system.')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Spacer */}
      <div className="h-20 md:h-32" />

      {/* Finland Story Section */}
      <Section spacing="none" className="py-20 md:py-32 bg-eckert-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            {/* Section Header */}
            <div className="text-center mb-20">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-sm md:text-base text-black/50 mb-6 uppercase tracking-[0.3em] font-medium"
              >
                {config.get('home.finland.preheading', 'A Story Outside Your Industry')}
              </motion.p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight">
                {config.get('home.finland.title', 'What Finland\'s Basketball Team Reveals About Your Company')}
              </h2>
              <p className="text-xl md:text-2xl text-black/50 italic">
                {config.get('home.finland.subtitle', 'Sometimes you see the truth more clearly when you don\'t look directly at it')}
              </p>
            </div>

            {/* The Finnish Paradox */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-black mb-8">
                {config.get('home.finland.paradox.title', 'The Finnish Paradox')}
              </h3>
              <p className="text-xl md:text-2xl text-black/70 leading-relaxed mb-10">
                {config.get('home.finland.paradox.text', 'In 2025, Finland reached the semifinals of the Basketball European Championship. 4th place out of 24 nations.')}
              </p>

              {/* Budget Stat Box - Prominent */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="
                  bg-black text-white rounded-xl p-10 md:p-12
                  inline-flex items-end gap-6
                  mb-10
                  shadow-elevated hover:shadow-apple-glow
                  transition-all duration-300
                "
              >
                <div className="text-7xl md:text-8xl lg:text-9xl font-black leading-none">
                  {config.get('home.finland.stat.value', '14.')}
                </div>
                <div className="pb-3 md:pb-5">
                  <p className="text-lg md:text-xl text-white/90 font-medium">
                    {config.get('home.finland.stat.text', 'Place by budget ranking')}
                  </p>
                </div>
              </motion.div>

              <p className="text-lg md:text-xl text-black/70 leading-relaxed mb-6">
                {config.get('home.finland.paradox.details', 'They had less money than 13 other teams. Fewer players. Smaller talent base. Less basketball tradition.')}
              </p>
              <p className="text-3xl md:text-4xl font-bold text-black">
                {config.get('home.finland.paradox.but', 'But they had something else.')}
              </p>
            </motion.div>

            {/* What Finland Did Differently */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-black mb-12">
                {config.get('home.finland.different.title', 'What Finland Did Differently')}
              </h3>

              <div className="space-y-8">
                {/* Point 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-black pl-8"
                >
                  <h4 className="text-2xl md:text-3xl font-bold text-black mb-3">
                    {config.get('home.finland.point1.title', '16 years of systematic human performance development')}
                  </h4>
                  <p className="text-lg md:text-xl text-black/70 leading-relaxed">
                    {config.get('home.finland.point1.text', 'Not "more training". A completely new system of how potential is unleashed.')}
                  </p>
                </motion.div>

                {/* Point 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-black pl-8"
                >
                  <h4 className="text-2xl md:text-3xl font-bold text-black mb-3">
                    {config.get('home.finland.point2.title', 'Underdog systematization instead of star cult')}
                  </h4>
                  <p className="text-lg md:text-xl text-black/70 leading-relaxed">
                    {config.get('home.finland.point2.text', 'They turned structural weakness into an advantage. Every player became a Performance Enabler.')}
                  </p>
                </motion.div>

                {/* Point 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-black pl-8"
                >
                  <h4 className="text-2xl md:text-3xl font-bold text-black mb-3">
                    {config.get('home.finland.point3.title', 'Measurable: 10x Return on Investment')}
                  </h4>
                  <p className="text-lg md:text-xl text-black/70 leading-relaxed">
                    {config.get('home.finland.point3.text', 'With 37% less budget than average to 4x better placement than expected.')}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Why Relevant - Strong Conclusion */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="
                bg-black text-white rounded-xl p-10 md:p-12
                hover:shadow-apple-glow hover:scale-[1.01]
                transition-all duration-300
              "
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {config.get('home.finland.relevance.title', 'Why This Story Is Relevant For You')}
              </h3>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                {config.get('home.finland.relevance.text', 'Sports is neutral. No operational blindness. No industry thinking. Just pure performance logic. And that\'s exactly why you can see more clearly here what is also possible in your company – if you activate the third pillar.')}
              </p>

              {/* CTA Button */}
              <Link
                to="/concept"
                className="
                  inline-block
                  bg-white text-black
                  px-8 py-4
                  rounded-lg
                  font-bold text-base md:text-lg
                  uppercase tracking-wider
                  hover:shadow-apple-glow hover:scale-105
                  transition-all duration-300
                "
              >
                {config.get('home.cta.learn', 'Learn Our Concept')}
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Bottom Spacer */}
      <div className="h-20 md:h-32" />
    </div>
  )
}

export default Home
