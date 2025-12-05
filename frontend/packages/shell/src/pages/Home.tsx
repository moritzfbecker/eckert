/**
 * Home Page - v3.1 Finland Basketball Story with Hero Video
 *
 * Professional homepage with Finland Basketball narrative
 * Category: 'homepage'
 * Design: Schwarz/Weiß, Apple Gradient hover, Professional typography
 */

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '../../../shared/ui-components/Container'
import { Section } from '../../../shared/ui-components/Section'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'
import { Link } from 'react-router-dom'
import TrustedBy from '../components/TrustedBy'
import PeterEckertSection from '../components/PeterEckertSection'

const Home = () => {
  const { language } = useTranslation()
  const config = useConfig('homepage', language)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Try to autoplay video on mount
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Attempt autoplay
      video.play().catch(() => {
        // Autoplay was prevented (browser policy), text stays visible
        setIsVideoPlaying(false)
      })
    }
  }, [])

  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
  }

  const handleVideoPause = () => {
    setIsVideoPlaying(false)
  }

  const handleVideoEnded = () => {
    setIsVideoPlaying(false)
  }

  return (
    <div className="min-h-screen bg-eckert-white">
      {/* Hero Section - Video with Text Overlay */}
      <Section spacing="none" className="pt-24 md:pt-32 pb-20 md:pb-32">
        <Container>
          <div className="max-w-6xl mx-auto relative">
            {/* Video Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                className="w-full h-auto"
                controls
                autoPlay
                muted
                playsInline
                poster="/images/peter-eckert-portrait-1.png"
                preload="auto"
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onEnded={handleVideoEnded}
              >
                <source src="/videos/peter-eckert-video-6.mp4" type="video/mp4" />
              </video>

              {/* Text Overlay - fades out when video plays */}
              <AnimatePresence>
                {!isVideoPlaying && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="
                      absolute inset-0
                      bg-black/70
                      flex flex-col items-center justify-center
                      p-6 md:p-12
                      pointer-events-none
                    "
                  >
                    {/* Main Question */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="
                        text-3xl md:text-5xl lg:text-6xl xl:text-7xl
                        font-black text-white mb-6 md:mb-8
                        leading-[1.1] tracking-tight
                        text-center
                      "
                    >
                      {config.get('home.hero.question', 'How do you achieve more with less than the competition?')}
                    </motion.h1>

                    {/* Finland Stat */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-base md:text-xl lg:text-2xl text-white/80 text-center mb-4 md:mb-6 leading-relaxed max-w-4xl"
                    >
                      {config.get('home.hero.finland.stat', 'Finland reached 4th place at the Basketball European Championship – with 37% less budget than average.')}
                    </motion.p>

                    {/* Secret */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-base md:text-xl text-white font-semibold text-center max-w-3xl"
                    >
                      {config.get('home.hero.secret', 'Their secret: The third pillar that 95% of all companies don\'t even measure.')}
                    </motion.p>

                    {/* Play hint */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="mt-8 text-white/60 text-sm md:text-base"
                    >
                      ▶ {config.get('home.hero.playHint', 'Click to play video')}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </Section>

      {/* Divider */}
      <div className="w-full border-t border-black/10" />

      {/* Trusted By Section */}
      <TrustedBy />

      {/* Divider */}
      <div className="w-full border-t border-black/10" />

      {/* 3-Column Video Teaser Section */}
      <Section spacing="none" className="py-20 md:py-32 !bg-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white text-center mb-6">
              {config.get('home.video.title', 'Learn More About Our Method')}
            </h2>
            <p className="text-lg md:text-xl text-white/70 text-center mb-12">
              {config.get('home.video.subtitle', 'Peter Eckert explains the methodology that transformed companies for over 40 years')}
            </p>

            {/* 3-Pillar Method - Three Columns with Vertical Videos */}
            <div className="mb-16 md:mb-24">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {config.get('home.pillars.section.title', 'The 3-Pillar Method')}
                </h3>
                <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
                  {config.get('home.pillars.section.subtitle', 'Technology Portfolio + Resource Strength + Human Performance = Sustainable Excellence')}
                </p>
              </div>

              {/* Three Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Spalte 1: Performance */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
                    {config.get('home.column1.title', 'Performance')}
                  </h4>
                  {/* Vertical Video */}
                  <div className="relative rounded-xl overflow-hidden mb-4 bg-white/10" style={{ aspectRatio: '9/16' }}>
                    <video
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                    >
                      <source src="/videos/herrschaftswissen.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <p className="text-sm text-white/70 text-center leading-relaxed">
                    {config.get('home.column1.text', 'What do Jürgen Klopp\'s Champions League victory and ZOLLERN\'s profit increase have in common? Performance Architecture transfers elite sports methods to corporate management.')}
                  </p>
                </motion.div>

                {/* Spalte 2: Leistungsethos */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
                    {config.get('home.column2.title', 'Leistungsethos')}
                  </h4>
                  {/* Vertical Video Placeholder */}
                  <div className="relative rounded-xl overflow-hidden mb-4 bg-white/10" style={{ aspectRatio: '9/16' }}>
                    <video
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                    >
                      <source src="/videos/pillar-2-resources.mp4" type="video/mp4" />
                    </video>
                    {/* Placeholder overlay - remove when video is added */}
                    <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                      <span className="text-white/50 text-sm">Video Placeholder</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 text-center leading-relaxed">
                    {config.get('home.column2.text', 'Klopp and Alonso achieve what most companies don\'t: genuine performance ethos. In sports, people want to improve. In companies? The majority withdraws. Performance Architecture makes the difference.')}
                  </p>
                </motion.div>

                {/* Spalte 3: Herrschaftswissen */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 ring-2 ring-white/20"
                >
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
                    {config.get('home.column3.title', 'Herrschaftswissen')}
                  </h4>
                  {/* Vertical Video Placeholder */}
                  <div className="relative rounded-xl overflow-hidden mb-4 bg-white/10" style={{ aspectRatio: '9/16' }}>
                    <video
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                    >
                      <source src="/videos/pillar-3-performance.mp4" type="video/mp4" />
                    </video>
                    {/* Placeholder overlay - remove when video is added */}
                    <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                      <span className="text-white/50 text-sm">Video Placeholder</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 text-center leading-relaxed">
                    {config.get('home.column3.text', 'ChatGPT democratizes knowledge. Marketing, finance, technology – AI makes everything accessible. What remains? The third pillar according to Pfeiffer: human performance potential. The new privileged knowledge for the post-AI era.')}
                  </p>
                </motion.div>
              </div>

              {/* CTA Button */}
              <div className="text-center mt-12">
                <Link
                  to="/concept"
                  className="
                    inline-block
                    bg-white text-black
                    px-8 py-4
                    rounded-lg
                    font-bold text-base
                    hover:shadow-apple-glow hover:scale-105
                    transition-all duration-300
                  "
                >
                  {config.get('home.pillars.button', 'Learn More')}
                </Link>
              </div>
            </div>

          </motion.div>
        </Container>
      </Section>

      {/* Divider */}
      <div className="w-full border-t border-black/10" />

      {/* Target Audience Section */}
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
              {config.get('home.audience.title', 'Three types of CEOs read this page:')}
            </h2>

            {/* Three CEO Types */}
            <div className="space-y-6 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <span className="text-2xl flex-shrink-0 text-black">→</span>
                <p className="text-xl md:text-2xl text-black">
                  {config.get('home.audience.elite', 'Elite companies with performance plateau despite massive strategy investments')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <span className="text-2xl flex-shrink-0 text-black">→</span>
                <p className="text-xl md:text-2xl text-black">
                  {config.get('home.audience.tech', 'Tech leaders with brilliant innovation but scaling problems')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <span className="text-2xl flex-shrink-0 text-black">→</span>
                <p className="text-xl md:text-2xl text-black">
                  {config.get('home.audience.resource', 'Resource-rich companies with technological backlog')}
                </p>
              </motion.div>
            </div>

            {/* Common Problem */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl text-black font-bold text-center"
            >
              {config.get('home.audience.common', 'All are missing the same thing: The systematic development of the third pillar.')}
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* Divider */}
      <div className="w-full border-t border-black/10" />

      {/* Three Pillars Section */}
      <Section spacing="none" className="py-20 md:py-32 bg-eckert-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black text-center mb-20">
              {config.get('home.pillars.title', 'The Untapped Third Pillar')}
            </h2>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Pillar 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-black/10 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-black mb-4">
                  {config.get('home.pillars.one.title', 'Pillar 1: Technology Portfolio')}
                </h3>
                <p className="text-lg text-black/60">
                  {config.get('home.pillars.one.desc', 'you have or can build')}
                </p>
              </motion.div>

              {/* Pillar 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-black/10 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-black mb-4">
                  {config.get('home.pillars.two.title', 'Pillar 2: Resource Strength')}
                </h3>
                <p className="text-lg text-black/60">
                  {config.get('home.pillars.two.desc', 'you have or can develop')}
                </p>
              </motion.div>

              {/* Pillar 3 - Highlighted */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="
                  bg-black text-white rounded-xl p-8
                  hover:shadow-apple-glow hover:scale-[1.02]
                  transition-all duration-300
                "
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {config.get('home.pillars.three.title', 'Pillar 3: Human Performance Potential')}
                </h3>
                <p className="text-lg text-white/80">
                  {config.get('home.pillars.three.desc', '95% do NOT have systematically developed.')}
                </p>
              </motion.div>
            </div>

            {/* Potential Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl text-black leading-relaxed">
                {config.get('home.pillars.three.potential', '8-12% latent performance potential. Measurable. Activatable. Compensates for structural weaknesses in Pillar 1 or 2.')}
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Stats + CTAs Section */}
      <Section spacing="none" className="py-20 md:py-32 bg-eckert-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            {/* ROI Stat - Black Card */}
            <motion.div
              className="
                bg-black text-white rounded-xl p-12 mb-20
                text-center
                hover:shadow-apple-glow hover:scale-[1.02]
                transition-all duration-300
              "
            >
              <div className="text-8xl md:text-9xl font-black text-white mb-4">
                {config.get('home.stats.roi', '340%')}
              </div>
              <p className="text-2xl md:text-3xl text-white/80">
                {config.get('home.stats.roi.label', 'average ROI with our clients')}
              </p>
            </motion.div>

            {/* Two CTAs Side by Side - Black Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* CTA 1 - Quick Start */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="
                  bg-black text-white rounded-xl p-8
                  hover:shadow-apple-glow hover:scale-105
                  transition-all duration-300
                "
              >
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {config.get('home.cta.quick.title', 'Quick Start')}
                </h3>
                <p className="text-lg text-white/80 mb-6">
                  {config.get('home.cta.quick.subtitle', 'Free 3-Pillar Diagnostics for your company')}
                </p>
                <Link
                  to="/contact"
                  className="
                    inline-block w-full
                    bg-white text-black
                    px-6 py-4
                    rounded-lg
                    font-bold text-center
                    hover:shadow-apple-glow
                    transition-all duration-300
                  "
                >
                  {config.get('home.cta.quick.button', 'Request Analysis Now')}
                </Link>
              </motion.div>

              {/* CTA 2 - Proof */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="
                  bg-black text-white rounded-xl p-8
                  hover:shadow-apple-glow hover:scale-105
                  transition-all duration-300
                "
              >
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {config.get('home.cta.proof.title', 'Evidence')}
                </h3>
                <p className="text-lg text-white/80 mb-6">
                  {config.get('home.cta.proof.subtitle', 'How Finland made it to the EC semifinals with 37% less budget')}
                </p>
                <Link
                  to="/concept"
                  className="
                    inline-block w-full
                    bg-white text-black
                    px-6 py-4
                    rounded-lg
                    font-bold text-center
                    hover:shadow-apple-glow
                    transition-all duration-300
                  "
                >
                  {config.get('home.cta.proof.button', 'Read Case Study')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Trust Metrics Section */}
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
            <h2 className="text-2xl md:text-3xl text-black/60 text-center mb-16">
              {config.get('home.trust.title', 'Trusted by leading companies and documented over 16 years')}
            </h2>

            {/* Three Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-7xl md:text-8xl font-black text-black mb-4">
                  {config.get('home.trust.years', '16')}
                </div>
                <p className="text-lg md:text-xl text-black/70">
                  {config.get('home.trust.years.label', 'Years ZOLLERN Transformation')}
                </p>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-7xl md:text-8xl font-black text-black mb-4">
                  {config.get('home.trust.margin', '8%')}
                </div>
                <p className="text-lg md:text-xl text-black/70">
                  {config.get('home.trust.margin.label', 'Pre-tax Operating Margin Contribution')}
                </p>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-7xl md:text-8xl font-black text-black mb-4">
                  {config.get('home.trust.ceos', '4,360')}
                </div>
                <p className="text-lg md:text-xl text-black/70">
                  {config.get('home.trust.ceos.label', 'CEOs in Newsletter Network')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Divider */}
      <div className="w-full border-t border-black/10" />

      {/* Two Paths Section */}
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
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6">
                {config.get('home.paths.title', 'The Consequence of Your Decision')}
              </h2>
              <p className="text-2xl md:text-3xl text-black/60 mb-8">
                {config.get('home.paths.subtitle', 'Two paths. One choice.')}
              </p>
              <p className="text-xl md:text-2xl text-black leading-relaxed">
                {config.get('home.paths.intro', 'The next 3-5 years of your company will be shaped by one decision: Do you activate the third pillar – or not?')}
              </p>
            </div>

            {/* Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Without Pillar 3 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-black/10 rounded-xl p-8"
              >
                <div className="text-4xl mb-4">❌</div>
                <h3 className="text-2xl font-bold text-black mb-8">
                  {config.get('home.paths.without.title', 'Without the third pillar')}
                </h3>

                <div className="space-y-6 mb-8">
                  <p className="text-base text-black/80 leading-relaxed">
                    <strong>Elite companies:</strong> {config.get('home.paths.without.elite', 'More millions into the same strategy consultancies as your competitors. Expensive balance of power.')}
                  </p>
                  <p className="text-base text-black/80 leading-relaxed">
                    <strong>Tech leaders:</strong> {config.get('home.paths.without.tech', 'Brilliant innovation, but scaling fails. Team burns out. Takeover by corporation threatens.')}
                  </p>
                  <p className="text-base text-black/80 leading-relaxed">
                    <strong>Resource-rich laggards:</strong> {config.get('home.paths.without.resource', 'Full coffers, but disruption eats market share. Slow death despite money.')}
                  </p>
                </div>

                <p className="text-lg text-black font-semibold">
                  {config.get('home.paths.without.common', 'Common to all: Compensation instead of transformation. More pressure, more processes – but no breakthrough.')}
                </p>
              </motion.div>

              {/* With Pillar 3 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="
                  bg-black text-white rounded-xl p-8
                  hover:shadow-apple-glow
                  transition-all duration-300
                "
              >
                <div className="text-4xl text-white mb-4">✓</div>
                <h3 className="text-2xl font-bold text-white mb-8">
                  {config.get('home.paths.with.title', 'With activated third pillar')}
                </h3>

                <div className="space-y-6 mb-8">
                  <p className="text-base text-white/90 leading-relaxed">
                    <strong>Elite companies:</strong> {config.get('home.paths.with.elite', 'Systematic differentiation through something competitors cannot copy. Defensible advantage.')}
                  </p>
                  <p className="text-base text-white/90 leading-relaxed">
                    <strong>Tech leaders:</strong> {config.get('home.paths.with.tech', 'Like Finland – better results with 37% fewer resources. Scaling without burnout.')}
                  </p>
                  <p className="text-base text-white/90 leading-relaxed">
                    <strong>Resource-rich laggards:</strong> {config.get('home.paths.with.resource', 'Technology disadvantage compensated by human performance. Traditional company becomes more agile than startups.')}
                  </p>
                </div>

                <p className="text-lg text-white font-semibold">
                  {config.get('home.paths.with.common', 'Common to all: 8-12% latent potential systematically unlocked. Measurable. Repeatable. Documented.')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Divider */}
      <div className="w-full border-t border-black/10" />

      {/* Finland Deep Dive Section */}
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6">
                {config.get('home.finland.title', 'Evidence Outside Your Industry')}
              </h2>
              <p className="text-2xl md:text-3xl text-black/60 mb-4">
                {config.get('home.finland.subtitle', 'What Finland\'s Basketball Team Reveals About Your Company')}
              </p>
              <p className="text-xl text-black/50 italic">
                {config.get('home.finland.intro', 'Sometimes you see the truth more clearly when you don\'t look directly at it')}
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
              <p className="text-xl md:text-2xl text-black/70 leading-relaxed mb-12">
                {config.get('home.finland.paradox.desc', '2025, Finland reached the semifinals of the Basketball European Championship. 4th place out of 24 nations.')}
              </p>

              {/* Three Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-black text-white rounded-xl p-8 text-center">
                  <div className="text-6xl font-black text-white mb-2">
                    {config.get('home.finland.rank', '14.')}
                  </div>
                  <p className="text-lg text-white/80">
                    {config.get('home.finland.rank.label', 'Place by budget ranking')}
                  </p>
                </div>

                <div className="bg-black text-white rounded-xl p-8 text-center">
                  <div className="text-6xl font-black text-white mb-2">
                    {config.get('home.finland.budget', '37%')}
                  </div>
                  <p className="text-lg text-white/80">
                    {config.get('home.finland.budget.label', 'less budget than average')}
                  </p>
                </div>

                <div className="bg-black text-white rounded-xl p-8 text-center">
                  <div className="text-6xl font-black text-white mb-2">
                    {config.get('home.finland.roi', '10x')}
                  </div>
                  <p className="text-lg text-white/80">
                    {config.get('home.finland.roi.label', 'Return on Investment')}
                  </p>
                </div>
              </div>

              <p className="text-xl md:text-2xl text-black font-bold">
                {config.get('home.finland.how', 'How? 16 years of systematic human performance development.')}
              </p>
            </motion.div>

            {/* Translation to Business */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-black mb-12">
                {config.get('home.translation.title', 'Translation to Your Reality')}
              </h3>

              <div className="space-y-8">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-black/10 rounded-xl p-6">
                    <p className="text-lg text-black">
                      {config.get('home.translation.finland.had', 'Finland had: Limited talent base')}
                    </p>
                  </div>
                  <div className="bg-black text-white rounded-xl p-6">
                    <p className="text-lg text-white">
                      {config.get('home.translation.you.have', 'You have: Structural weaknesses in technology or resources (maybe both)')}
                    </p>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-black/10 rounded-xl p-6">
                    <p className="text-lg text-black">
                      {config.get('home.translation.finland.did', 'Finland did: Develop underdog systematics')}
                    </p>
                  </div>
                  <div className="bg-black text-white rounded-xl p-6">
                    <p className="text-lg text-white">
                      {config.get('home.translation.you.can', 'You can: Overcompensate structural weaknesses through human performance')}
                    </p>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-black/10 rounded-xl p-6">
                    <p className="text-lg text-black">
                      {config.get('home.translation.finland.achieved', 'Finland achieved: 4x better placement')}
                    </p>
                  </div>
                  <div className="bg-black text-white rounded-xl p-6">
                    <p className="text-lg text-white">
                      {config.get('home.translation.you.achieve', 'You achieve: 8-12% latent potential systematically unlocked')}
                    </p>
                  </div>
                </div>
              </div>

              {/* The Difference */}
              <div className="mt-12 text-center">
                <p className="text-2xl md:text-3xl text-black font-bold mb-4">
                  {config.get('home.translation.difference', 'The difference: 16-year commitment')}
                </p>
                <p className="text-xl text-black/70">
                  {config.get('home.translation.difference.desc', 'Not "more training". A completely new system of how potential is unleashed.')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Divider */}
      <div className="w-full border-t border-black/10" />

      {/* Peter Eckert Section */}
      <PeterEckertSection />

      {/* Divider */}
      <div className="w-full border-t border-black/10" />

      {/* Final CTA Section */}
      <Section spacing="none" className="py-20 md:py-32 bg-eckert-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Black Card with all content */}
            <div className="
              bg-black text-white rounded-xl p-12 md:p-16
              text-center
              hover:shadow-apple-glow hover:scale-[1.01]
              transition-all duration-300
            ">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-12">
                {config.get('home.final.title', 'Now You Have a Choice')}
              </h2>

              <p className="text-xl md:text-2xl text-white/80 mb-6 leading-relaxed">
                {config.get('home.final.question1', 'The question is not whether your company has structural weaknesses.')}
              </p>

              <p className="text-2xl md:text-3xl text-white font-bold mb-12 leading-relaxed">
                {config.get('home.final.question2', 'The question is: Are you ready to overcompensate them through systematic human performance development?')}
              </p>

              {/* CTA Button */}
              <Link
                to="/contact"
                className="
                  inline-block
                  bg-white text-black
                  px-10 py-5
                  rounded-lg
                  font-bold text-xl
                  uppercase tracking-wider
                  hover:shadow-apple-glow hover:scale-105
                  transition-all duration-300
                  mb-8
                "
              >
                {config.get('home.final.cta', 'Request Free 3-Pillar Diagnostics')}
              </Link>

              <div className="space-y-2">
                <p className="text-base text-white/60">
                  {config.get('home.final.disclaimer', 'No sales presentation. No generic solutions.')}
                </p>
                <p className="text-base text-white/80">
                  {config.get('home.final.promise', 'Only an evidence-based analysis of where your greatest untapped potential lies.')}
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

export default Home
