/**
 * Home Page - v2.0 Config API
 *
 * Professional homepage with 3 key sections
 * Category: 'homepage'
 */

import { motion } from 'framer-motion'
import { Container } from '../../../shared/ui-components/Container'
import { Section } from '../../../shared/ui-components/Section'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'

const Home = () => {
  const { language } = useTranslation()
  const config = useConfig('homepage', language)

  return (
    <div className="min-h-screen bg-eckert-white">
      {/* Hero Section - Eine Frage, die sich stellt */}
      <Section spacing="2xl" className="pt-32 md:pt-40">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-xl md:text-2xl text-black/60 mb-6 uppercase tracking-wider">
              {config.get('home.hero.preheading', 'A Question That Arises')}
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
              {config.get('home.hero.title', 'Why do you invest millions in strategy – and still only harvest mediocrity?')}
            </h1>
            <p className="text-xl md:text-2xl text-black/80 mb-6 leading-relaxed">
              {config.get('home.hero.text1', 'Your competitors use the same consultancies. The same frameworks. The same "best practices". The result? An expensive balance of power.')}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-black mt-12">
              {config.get('home.hero.text2', 'Maybe the problem isn\'t what you do.')}
            </p>
            <p className="text-xl md:text-2xl text-black/70 mt-4">
              {config.get('home.hero.text3', 'But what nobody mentions: The unused third dimension of your organization.')}
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Problem Section - Das eigentliche Problem */}
      <Section spacing="2xl" className="bg-eckert-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 text-center">
              {config.get('home.problem.title', 'The Real Problem')}
            </h2>
            <p className="text-xl md:text-2xl text-black/60 mb-16 text-center">
              {config.get('home.problem.subtitle', 'You are optimizing the wrong variables')}
            </p>
            <p className="text-lg text-black/70 mb-12 text-center">
              {config.get('home.problem.intro', 'Three thoughts you may have already had yourself – but haven\'t thought through to the end')}
            </p>

            {/* Three Thoughts */}
            <div className="space-y-8">
              {/* Thought 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-black text-white rounded-lg p-8 hover:shadow-apple-glow transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl" role="img" aria-label="thought">💭</span>
                  <div className="flex-1">
                    <p className="text-lg text-white/90 mb-3 italic">
                      {config.get('home.problem.thought1.quote', '"Our strategy is solid. But the implementation..."')}
                    </p>
                    <p className="text-white/80">
                      {config.get('home.problem.thought1.text', 'You\'re right. But what if the "implementation problem" is a symptom – not the disease? What if the most brilliant strategy shatters against an invisible ceiling?')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Thought 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-black text-white rounded-lg p-8 hover:shadow-apple-glow transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl" role="img" aria-label="thinking">🤔</span>
                  <div className="flex-1">
                    <p className="text-lg text-white/90 mb-3 italic">
                      {config.get('home.problem.thought2.quote', '"We have the technology. We have the resources."')}
                    </p>
                    <p className="text-white/80">
                      {config.get('home.problem.thought2.text', 'Two out of three pillars. But when did you last measure the Human Performance Potential of your organization? Not engagement. Not satisfaction. But: latent performance potential.')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Thought 3 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-black text-white rounded-lg p-8 hover:shadow-apple-glow transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl" role="img" aria-label="lightning">⚡</span>
                  <div className="flex-1">
                    <p className="text-lg text-white/90 mb-3 italic">
                      {config.get('home.problem.thought3.quote', '"Our people are already giving 100%."')}
                    </p>
                    <p className="text-white/80">
                      {config.get('home.problem.thought3.text', 'What if "100%" is only what your current system extracts from them? Finland\'s basketball players also thought they were at their limit. Until someone changed the system.')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Finland Story Section */}
      <Section spacing="2xl" className="bg-eckert-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-xl md:text-2xl text-black/60 mb-6 text-center uppercase tracking-wider">
              {config.get('home.finland.preheading', 'A Story Outside Your Industry')}
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 text-center">
              {config.get('home.finland.title', 'What Finland\'s Basketball Team Reveals About Your Company')}
            </h3>
            <p className="text-xl text-black/60 mb-16 text-center italic">
              {config.get('home.finland.subtitle', 'Sometimes you see the truth more clearly when you don\'t look directly at it')}
            </p>

            {/* The Finnish Paradox */}
            <div className="mb-12">
              <h4 className="text-2xl font-bold text-black mb-6">
                {config.get('home.finland.paradox.title', 'The Finnish Paradox')}
              </h4>
              <p className="text-lg text-black/80 leading-relaxed mb-8">
                {config.get('home.finland.paradox.text', 'In 2025, Finland reached the semifinals of the Basketball European Championship. 4th place out of 24 nations.')}
              </p>

              {/* Budget Stat Box */}
              <div className="bg-black text-white rounded-lg p-8 mb-8 inline-block">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl md:text-6xl font-bold">
                    {config.get('home.finland.stat.value', '14.')}
                  </span>
                  <div>
                    <p className="text-lg text-white/90">
                      {config.get('home.finland.stat.text', 'Place by budget ranking')}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-black/80 leading-relaxed mb-6">
                {config.get('home.finland.paradox.details', 'They had less money than 13 other teams. Fewer players. Smaller talent base. Less basketball tradition.')}
              </p>
              <p className="text-2xl font-bold text-black">
                {config.get('home.finland.paradox.but', 'But they had something else.')}
              </p>
            </div>

            {/* What Finland Did Differently */}
            <div className="mb-12">
              <h4 className="text-2xl font-bold text-black mb-8">
                {config.get('home.finland.different.title', 'What Finland Did Differently')}
              </h4>

              <div className="space-y-6">
                {/* Point 1 */}
                <div className="border-l-4 border-black pl-6">
                  <h5 className="text-xl font-bold text-black mb-2">
                    {config.get('home.finland.point1.title', '16 years of systematic human performance development')}
                  </h5>
                  <p className="text-black/70">
                    {config.get('home.finland.point1.text', 'Not "more training". A completely new system of how potential is unleashed.')}
                  </p>
                </div>

                {/* Point 2 */}
                <div className="border-l-4 border-black pl-6">
                  <h5 className="text-xl font-bold text-black mb-2">
                    {config.get('home.finland.point2.title', 'Underdog systematization instead of star cult')}
                  </h5>
                  <p className="text-black/70">
                    {config.get('home.finland.point2.text', 'They turned structural weakness into an advantage. Every player became a Performance Enabler.')}
                  </p>
                </div>

                {/* Point 3 */}
                <div className="border-l-4 border-black pl-6">
                  <h5 className="text-xl font-bold text-black mb-2">
                    {config.get('home.finland.point3.title', 'Measurable: 10x Return on Investment')}
                  </h5>
                  <p className="text-black/70">
                    {config.get('home.finland.point3.text', 'With 37% less budget than average to 4x better placement than expected.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Why Relevant */}
            <div className="bg-black text-white rounded-lg p-8 hover:shadow-apple-glow transition-all duration-300">
              <h4 className="text-2xl font-bold text-white mb-4">
                {config.get('home.finland.relevance.title', 'Why This Story Is Relevant For You')}
              </h4>
              <p className="text-white/90 leading-relaxed">
                {config.get('home.finland.relevance.text', 'Sports is neutral. No operational blindness. No industry thinking. Just pure performance logic. And that\'s exactly why you can see more clearly here what is also possible in your company – if you activate the third pillar.')}
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}

export default Home
