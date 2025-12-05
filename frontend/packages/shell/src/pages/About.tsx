/**
 * About Page - Peter Eckert v3.0
 *
 * Clean sidebar layout inspired by hier.html
 * Category: 'about'
 * Design: Schwarz/Weiß, Sidebar, Timeline, Metric Boxes
 */

import { motion } from 'framer-motion'
import { Container } from '../../../shared/ui-components/Container'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'
import { Link } from 'react-router-dom'

const About = () => {
  const { language } = useTranslation()
  const config = useConfig('about', language)

  return (
    <div className="min-h-screen bg-eckert-white pt-24 pb-20">
      {/* Hero Banner with Portrait */}
      <div className="relative bg-black overflow-hidden mb-12">
        <div className="absolute inset-0">
          <img
            src="/images/peter-eckert-portrait-5.png"
            alt="Peter Eckert"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        <Container>
          <div className="relative py-20 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                {config.get('about.hero.title', 'Peter Eckert')}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                {config.get('about.hero.subtitle', 'Vom Unternehmer für Unternehmer – 40 Jahre Performance Architecture')}
              </p>
            </motion.div>
          </div>
        </Container>
      </div>

      <Container>
        {/* Bio Grid: Sidebar + Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12 md:gap-16 mb-20">
            {/* Sidebar */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white border-2 border-black/10 rounded-xl p-8 shadow-subtle sticky top-32"
              >
                {/* Photo */}
                <div className="w-48 h-48 rounded-full mx-auto mb-8 shadow-apple-glow overflow-hidden">
                  <img
                    src="/images/peter-eckert-library.png"
                    alt="Peter Eckert"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-2xl font-bold text-black text-center mb-8">
                  {config.get('about.hero.name', 'Peter Eckert')}
                </h3>

                {/* Quick Facts */}
                <ul className="space-y-6">
                  <li className="pb-6 border-b border-black/10">
                    <strong className="block text-black font-bold mb-2">
                      {config.get('about.sidebar.academic', 'Academic')}
                    </strong>
                    <p className="text-sm text-black/70 leading-relaxed">
                      {config.get('about.sidebar.academic.text', '6 years Fraunhofer Institute (1981-1986)')}
                    </p>
                  </li>
                  <li className="pb-6 border-b border-black/10">
                    <strong className="block text-black font-bold mb-2">
                      {config.get('about.sidebar.entrepreneurial', 'Entrepreneurial')}
                    </strong>
                    <p className="text-sm text-black/70 leading-relaxed">
                      {config.get('about.sidebar.entrepreneurial.text', '5 companies founded (1989-2019)')}
                    </p>
                  </li>
                  <li className="pb-6 border-b border-black/10">
                    <strong className="block text-black font-bold mb-2">
                      {config.get('about.sidebar.consulting', 'Consulting')}
                    </strong>
                    <p className="text-sm text-black/70 leading-relaxed">
                      {config.get('about.sidebar.consulting.text', '€192M ZOLLERN impact (1994-2015)')}
                    </p>
                  </li>
                  <li>
                    <strong className="block text-black font-bold mb-2">
                      {config.get('about.sidebar.methodology', 'Methodology')}
                    </strong>
                    <p className="text-sm text-black/70 leading-relaxed">
                      {config.get('about.sidebar.methodology.text', '44 years 3-Pillar development (1981-2025)')}
                    </p>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Main Content */}
            <div>
              {/* Journey Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <h1 className="text-4xl md:text-5xl font-black text-black mb-6">
                  {config.get('about.journey.title', 'The Journey from Science to Entrepreneurship to Performance Architecture')}
                </h1>
                <p className="text-xl text-black/70 leading-relaxed">
                  {config.get('about.journey.intro', 'Peter Eckert developed a unique framework over four decades that connects academic research, entrepreneurial practice, and systematic performance development. His thesis: Structural weaknesses in technology or resources can not only be compensated but overcompensated through systematic human performance development.')}
                </p>
              </motion.div>

              {/* Timeline with Vertical Line */}
              <div className="relative pl-12 space-y-16">
                {/* Vertical Line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-black" />

                {/* Timeline Items */}
                {/* 1981-1986: Fraunhofer */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className="absolute -left-[51px] top-0 w-4 h-4 bg-black rounded-full border-4 border-white shadow-md" />

                  <div className="text-2xl font-bold text-black mb-2">
                    {config.get('about.phase1.years', '1981-1986')}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                    {config.get('about.phase1.title', 'Fraunhofer Institute: Scientific Foundation')}
                  </h3>
                  <p className="text-base text-black/70 leading-relaxed mb-4">
                    {config.get('about.phase1.text', '6 years at Fraunhofer Institute for Manufacturing Engineering and Automation (IPA). Focus: Technology transfer from research to industrial application. First insights: The "last mile" fails not because of technology, but because of organization and people.')}
                  </p>
                  <div className="bg-white border-l-4 border-black rounded-lg p-4">
                    <p className="text-sm text-black/80">
                      <strong className="text-black">{config.get('about.phase1.insight.label', 'Key Insight:')}</strong> {config.get('about.phase1.insight.text', 'Technology excellence alone does not generate performance excellence. Systematic methodology for human performance is missing.')}
                    </p>
                  </div>
                </motion.div>

                {/* 1989-2020: Entrepreneurship */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -left-[51px] top-0 w-4 h-4 bg-black rounded-full border-4 border-white shadow-md" />

                  <div className="text-2xl font-bold text-black mb-2">
                    {config.get('about.phase2.years', '1989-2019')}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                    {config.get('about.phase2.title', 'Entrepreneurship: Practice Validation')}
                  </h3>
                  <p className="text-base text-black/70 leading-relaxed mb-6">
                    {config.get('about.phase2.intro', 'Co-founder of 5 companies across various industries. Direct experience with scale-up challenges, resource scarcity, team development.')}
                  </p>

                  {/* Papierfabrik Video */}
                  <div className="mb-8">
                    <div className="relative rounded-xl overflow-hidden shadow-elevated">
                      <video
                        className="w-full h-auto"
                        controls
                        preload="metadata"
                      >
                        <source src="/videos/papierfabrik.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <p className="text-sm text-black/50 mt-3 text-center italic">
                      {config.get('about.phase2.video.caption', 'Peter Eckert on the paper mill restructuring experience')}
                    </p>
                  </div>

                  <div className="space-y-3 text-sm text-black/80 leading-relaxed">
                    <p><strong className="text-black">{config.get('about.phase2.company1', 'Company 1 (1989):')}</strong> {config.get('about.phase2.company1.text', 'Technology marketing. First systematic development of performance methods.')}</p>
                    <p><strong className="text-black">{config.get('about.phase2.company2', 'Company 2 (1998):')}</strong> {config.get('about.phase2.company2.text', 'Process industry with production (paper mill restructuring). Proof: Crisis management competence under pressure.')}</p>
                    <p><strong className="text-black">{config.get('about.phase2.company3', 'Company 3 (2005):')}</strong> {config.get('about.phase2.company3.text', 'Services. Scaling service organizations.')}</p>
                    <p><strong className="text-black">{config.get('about.phase2.company4', 'Company 4 (2017):')}</strong> {config.get('about.phase2.company4.text', 'Technology scale-up. Practical testing of Pillar 3 prototypes.')}</p>
                    <p>
                      <Link
                        to="/medicallix"
                        className="hover:opacity-70 transition-opacity duration-300 inline-block"
                      >
                        <strong className="text-black">{config.get('about.phase2.company5', 'Company 5 (2019): Medicallix')}</strong> {config.get('about.phase2.company5.text', 'Development of AI-powered medical documentation software. Application of Performance Architecture principles to healthcare technology. Systematic elaboration of techniques for real-time documentation.')}
                      </Link>
                    </p>
                  </div>

                  <div className="bg-white border-l-4 border-black rounded-lg p-4 mt-6">
                    <p className="text-sm text-black/80">
                      <strong className="text-black">{config.get('about.phase2.insight.label', 'Key Insight:')}</strong> {config.get('about.phase2.insight.text', 'The Pfeiffer Technology Portfolio Analysis (Pillar 1+2) is necessary but not sufficient. Pillar 3 is missing.')}
                    </p>
                  </div>
                </motion.div>

                {/* 1994-2002: ZOLLERN Transformation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -left-[51px] top-0 w-4 h-4 bg-black rounded-full border-4 border-white shadow-md" />

                  <div className="text-2xl font-bold text-black mb-2">
                    {config.get('about.phase3.years', '1994-2002')}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                    {config.get('about.phase3.title', 'ZOLLERN: Long-term Proof (8 years transformation)')}
                  </h3>
                  <p className="text-base text-black/70 leading-relaxed mb-6">
                    {config.get('about.phase3.intro', '8 years systematic transformation of a Hidden Champion with structural technology weaknesses. First complete application of the 3-Pillar methodology.')}
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-white border-l-4 border-black rounded-lg p-5">
                      <p className="font-bold text-black mb-2">{config.get('about.phase3.phase1.title', 'Phase 1 (1994-1998):')}</p>
                      <p className="text-sm text-black/70">{config.get('about.phase3.phase1.text', 'Implicit application. "World Champion Hypothesis".')}</p>
                    </div>
                    <div className="bg-black text-white rounded-lg p-5 hover:shadow-apple-glow transition-all">
                      <p className="font-bold text-white mb-2">{config.get('about.phase3.phase2.title', 'Phase 2 (1998-2002):')}</p>
                      <p className="text-sm text-white/80">{config.get('about.phase3.phase2.text', '8% margin increase. Self-running quality achieved.')}</p>
                    </div>
                  </div>
                </motion.div>

                {/* 2003-2015: Self-Running */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -left-[51px] top-0 w-4 h-4 bg-black rounded-full border-4 border-white shadow-md" />

                  <div className="text-2xl font-bold text-black mb-2">
                    {config.get('about.phase4.years', '2003-2015')}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                    {config.get('about.phase4.title', 'Self-Running Phase (12 years)')}
                  </h3>
                  <p className="text-base text-black/70 leading-relaxed mb-4">
                    {config.get('about.phase4.text', '€192M cumulative impact as self-running system. System continues without permanent external intervention.')}
                  </p>
                </motion.div>

                {/* 2002-2025: Systematization */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -left-[51px] top-0 w-4 h-4 bg-black rounded-full border-4 border-white shadow-md" />

                  <div className="text-2xl font-bold text-black mb-2">
                    {config.get('about.phase5.years', '2002-2025')}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                    {config.get('about.phase5.title', 'Systematization & Scaling')}
                  </h3>
                  <p className="text-base text-black/70 leading-relaxed mb-6">
                    {config.get('about.phase5.text', '153 external sources analyzed (Finland case). 306-Method Handbook developed. Complete framework established.')}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black text-white rounded-lg p-6 text-center">
                      <div className="text-5xl font-black text-white mb-2">153</div>
                      <p className="text-sm text-white/80">{config.get('about.phase5.sources', 'Sources')}</p>
                    </div>
                    <div className="bg-black text-white rounded-lg p-6 text-center">
                      <div className="text-5xl font-black text-white mb-2">306</div>
                      <p className="text-sm text-white/80">{config.get('about.phase5.methods', 'Methods')}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Unique Combination Box with Image */}
              <div className="bg-white border-l-4 border-black rounded-xl p-8 mt-12 shadow-subtle">
                {/* Text Content - Top */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-black mb-4">
                    {config.get('about.combination.title', 'The Unique Combination')}
                  </h3>
                  <p className="text-base text-black/70 leading-relaxed">
                    {config.get('about.combination.text', 'What distinguishes Peter Eckert from classical strategy consultants: He combines academic research methodology (6 years Fraunhofer), entrepreneurial hands-on experience (5 companies, diverse industries), long-term transformation proof (8 years ZOLLERN to self-running, then 12 years self-running phase = €192M impact), and systematic method development (44 years across numerous Hidden Champions projects). This combination exists at no MBB partner.')}
                  </p>
                </div>

                {/* Image Left + Placeholder Text Right */}
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Thought Leadership Image - Left */}
                  <div className="md:w-1/2 flex-shrink-0">
                    <div className="rounded-xl overflow-hidden shadow-elevated">
                      <img
                        src="/images/peter-eckert-thinking.png"
                        alt="Peter Eckert - Thought Leadership"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                  {/* Placeholder Text - Right */}
                  <div className="md:w-1/2">
                    <p className="text-base text-black/70 leading-relaxed">
                      {config.get('about.combination.placeholder', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-t-2 border-black/10 my-20" />

          {/* Viktor Frankl Section - Video Left, Text Right */}
          <div className="mb-24">
            {/* Grid: Video Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              {/* Video - Left */}
              <div>
                <div className="relative rounded-xl overflow-hidden shadow-elevated">
                  <video
                    className="w-full h-auto"
                    controls
                    preload="metadata"
                  >
                    <source src="/videos/viktor-frankl.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              {/* Text - Right */}
              <div>
                <span className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  {config.get('about.frankl.badge', 'Philosophical Foundation')}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-black mb-6">
                  {config.get('about.frankl.title', 'Viktor Frankl')}
                </h2>
                <p className="text-lg md:text-xl text-black/80 leading-relaxed">
                  {config.get('about.frankl.text', 'Viktor Frankl survived four concentration camps. His insight: People need meaning, not happiness. Performance Architecture systematizes meaning: Clear mission. Visible impact. Respect as a system. Then productivity becomes self-running.')}
                </p>
              </div>
            </div>

            {/* Die philosophische Basis - Black Box below */}
            <div className="bg-black text-white rounded-xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {config.get('about.frankl.basis.title', 'Die philosophische Basis')}
              </h3>
              <p className="text-base md:text-lg text-white/90 leading-relaxed">
                <strong className="text-white">{config.get('about.frankl.application.label', 'Anwendung in Säule 3:')}</strong> {config.get('about.frankl.application.text', 'Performance without purpose is unsustainable. Our methodology helps organizations discover and activate their collective "why" – the foundation for self-running excellence.')}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-t-2 border-black/10 my-20" />

          {/* ZOLLERN Case Study */}
          <div className="mb-24">
            {/* Case Header - Black */}
            <div className="bg-black text-white rounded-xl p-12 md:p-16 mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                {config.get('about.zollern.title', 'ZOLLERN: 8-Year Transformation to Self-Running System (1994-2002)')}
              </h2>
              <p className="text-xl text-white/80 mb-12">
                {config.get('about.zollern.subtitle', '8 years systematic permeation until self-running quality, then 12 years self-running phase (2003-2015) with €192M cumulative impact')}
              </p>

              {/* 4 Stats in Gradient Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                  <div className="text-5xl font-black text-white mb-2">€192M</div>
                  <p className="text-sm text-white/80">{config.get('about.zollern.stat1', 'Impact')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                  <div className="text-5xl font-black text-white mb-2">8%</div>
                  <p className="text-sm text-white/80">{config.get('about.zollern.stat2', 'Margin')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                  <div className="text-5xl font-black text-white mb-2">8</div>
                  <p className="text-sm text-white/80">{config.get('about.zollern.stat3', 'Years to SR')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                  <div className="text-5xl font-black text-white mb-2">12</div>
                  <p className="text-sm text-white/80">{config.get('about.zollern.stat4', 'Years SR')}</p>
                </div>
              </div>
            </div>

            {/* SECTION 1: Die Ausgangssituation (1994) */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-black mb-6">
                {config.get('about.zollern.situation.title', 'The Initial Situation (1994)')}
              </h3>
              <p className="text-lg text-black/70 leading-relaxed mb-8">
                {config.get('about.zollern.situation.intro', 'ZOLLERN, traditional machinery manufacturer, Hidden Champion in niche markets. Strong market position, but structural weaknesses:')}
              </p>

              {/* 2 Metric Boxes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Negative Box - Säule 1 */}
                <div className="bg-white border-l-4 border-black rounded-lg p-6 shadow-subtle">
                  <div className="font-bold text-black mb-4">
                    ❌ {config.get('about.zollern.situation.pillar1.title', 'Pillar 1: Technology Portfolio')}
                  </div>
                  <ul className="space-y-3 text-sm text-black/70">
                    <li>→ {config.get('about.zollern.situation.pillar1.point1', 'Technology backlog to competitors')}</li>
                    <li>→ {config.get('about.zollern.situation.pillar1.point2', 'R&D budget below average')}</li>
                    <li>→ {config.get('about.zollern.situation.pillar1.point3', 'Innovation speed too slow')}</li>
                  </ul>
                </div>

                {/* Positive Box - Säule 2 */}
                <div className="bg-white border-l-4 border-black rounded-lg p-6 shadow-subtle">
                  <div className="font-bold text-black mb-4">
                    ✓ {config.get('about.zollern.situation.pillar2.title', 'Pillar 2: Resource Strength')}
                  </div>
                  <ul className="space-y-3 text-sm text-black/70">
                    <li>→ {config.get('about.zollern.situation.pillar2.point1', 'Solid financing (family business)')}</li>
                    <li>→ {config.get('about.zollern.situation.pillar2.point2', 'Stable customer relationships')}</li>
                    <li>→ {config.get('about.zollern.situation.pillar2.point3', 'Experienced management')}</li>
                  </ul>
                </div>
              </div>

              {/* Yellow Warning Box */}
              <div className="bg-white border-l-4 border-black rounded-lg p-6 shadow-subtle">
                <p className="text-base text-black/80 leading-relaxed">
                  <strong className="text-black">{config.get('about.zollern.situation.dilemma.title', 'The Dilemma:')}</strong> {config.get('about.zollern.situation.dilemma.text', 'Classical strategy consulting would have recommended: "Invest massively in Pillar 1 (Technology)." Problem: Competitors with larger budgets would always be ahead. The alternative: Activate Pillar 3.')}
                </p>
              </div>
            </div>

            {/* 4 Methods - Metric Boxes */}
            <h3 className="text-3xl font-bold text-black mb-8 pb-4 border-b-2 border-black">
              {config.get('about.zollern.essence.title', 'The Essence: What Was Done Concretely?')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white border-l-4 border-black rounded-lg p-6 shadow-subtle hover:shadow-elevated transition-all">
                <h4 className="font-bold text-black mb-3">{config.get('about.zollern.method1.title', 'Enabler Systems')}</h4>
                <p className="text-sm text-black/70 leading-relaxed">{config.get('about.zollern.method1.text', 'Every leader trained as Performance Enabler. Not "manager" but "igniter". Systematic coaching.')}</p>
              </div>
              <div className="bg-white border-l-4 border-black rounded-lg p-6 shadow-subtle hover:shadow-elevated transition-all">
                <h4 className="font-bold text-black mb-3">{config.get('about.zollern.method2.title', 'Collective Intelligence')}</h4>
                <p className="text-sm text-black/70 leading-relaxed">{config.get('about.zollern.method2.text', 'Cross-functional teams with "World Champion Hypothesis". Every project: "What would the world market leader do?"')}</p>
              </div>
              <div className="bg-white border-l-4 border-black rounded-lg p-6 shadow-subtle hover:shadow-elevated transition-all">
                <h4 className="font-bold text-black mb-3">{config.get('about.zollern.method3.title', 'Underdog Systematics')}</h4>
                <p className="text-sm text-black/70 leading-relaxed">{config.get('about.zollern.method3.text', 'Technology disadvantage transformed into motivation driver. "We must work smarter, not harder."')}</p>
              </div>
              <div className="bg-white border-l-4 border-black rounded-lg p-6 shadow-subtle hover:shadow-elevated transition-all">
                <h4 className="font-bold text-black mb-3">{config.get('about.zollern.method4.title', 'Malik Cybernetics')}</h4>
                <p className="text-sm text-black/70 leading-relaxed">{config.get('about.zollern.method4.text', 'Functioning control loops instead of endless meetings. Self-control instead of micromanagement.')}</p>
              </div>
            </div>

            {/* SECTION 2: Die Intervention (2006-2022) */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-black mb-8 pb-4 border-b-2 border-black">
                {config.get('about.zollern.intervention.title', 'The Intervention (1994-2022)')}
              </h3>

              {/* Timeline with 3 Phases */}
              <div className="relative pl-12 space-y-12">
                {/* Vertical Line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-black" />

                {/* Phase 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -left-[51px] top-0 w-4 h-4 bg-black rounded-full border-4 border-white shadow-md" />

                  <div className="text-2xl font-bold text-black mb-2">
                    {config.get('about.zollern.intervention.phase1.years', 'Phase 1: 1994-1998 (4 years)')}
                  </div>
                  <h4 className="text-xl font-bold text-black mb-4">
                    {config.get('about.zollern.intervention.phase1.title', 'Foundation Building & Implicit Application')}
                  </h4>
                  <p className="text-base text-black/70 leading-relaxed mb-3">
                    <strong className="text-black">{config.get('about.zollern.intervention.phase1.approach.label', 'Approach:')}</strong> {config.get('about.zollern.intervention.phase1.approach.text', 'Implicit application of 3-Pillar principles in projects. Development of "World Champion Hypothesis" as orientation for every project.')}
                  </p>
                  <p className="text-base text-black/70 leading-relaxed mb-3">
                    <strong className="text-black">{config.get('about.zollern.intervention.phase1.methods.label', 'Methods:')}</strong> {config.get('about.zollern.intervention.phase1.methods.text', 'Performance Enabler training for leaders, establishment of control loop systems (Malik), first Underdog Systematics workshops.')}
                  </p>
                  <div className="bg-white border-l-4 border-black rounded-lg p-4">
                    <p className="text-sm text-black/80">
                      <strong className="text-black">{config.get('about.zollern.intervention.phase1.success.label', 'First Successes:')}</strong> {config.get('about.zollern.intervention.phase1.success.text', '3% margin increase in pilot areas. Management begins to recognize potential.')}
                    </p>
                  </div>
                </motion.div>

                {/* Phase 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -left-[51px] top-0 w-4 h-4 bg-black rounded-full border-4 border-white shadow-md" />

                  <div className="text-2xl font-bold text-black mb-2">
                    {config.get('about.zollern.intervention.phase2.years', 'Phase 2: 1998-2002 (4 years)')}
                  </div>
                  <h4 className="text-xl font-bold text-black mb-4">
                    {config.get('about.zollern.intervention.phase2.title', 'Full Permeation & Self-Running Quality Achieved')}
                  </h4>
                  <p className="text-base text-black/70 leading-relaxed mb-3">
                    <strong className="text-black">{config.get('about.zollern.intervention.phase2.breakthrough.label', 'Breakthrough:')}</strong> {config.get('about.zollern.intervention.phase2.breakthrough.text', 'Full organizational permeation. Explicit formulation of 3 Pillars. Integration into strategic management processes. Development of internal trainers.')}
                  </p>
                  <p className="text-base text-black/70 leading-relaxed mb-3">
                    <strong className="text-black">{config.get('about.zollern.intervention.phase2.methods.label', 'Methods:')}</strong> {config.get('about.zollern.intervention.phase2.methods.text', 'Complete rollout of documented coaching methods. Establishment of "CEO as Performance Enabler" model.')}
                  </p>
                  <div className="bg-black text-white rounded-lg p-5">
                    <p className="text-base text-white font-semibold mb-2">
                      {config.get('about.zollern.intervention.phase2.milestone.label', 'Milestone Reached (2002):')}
                    </p>
                    <p className="text-sm text-white/90">
                      {config.get('about.zollern.intervention.phase2.milestone.text', '8% pre-tax margin increase. Technology disadvantage compensated. System develops self-running quality – continues without permanent external intervention.')}
                    </p>
                  </div>
                </motion.div>

                {/* Phase 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -left-[51px] top-0 w-4 h-4 bg-black rounded-full border-4 border-white shadow-md" />

                  <div className="text-2xl font-bold text-black mb-2">
                    {config.get('about.zollern.intervention.phase3.years', 'Phase 3: 2002-2022 (20 years)')}
                  </div>
                  <h4 className="text-xl font-bold text-black mb-4">
                    {config.get('about.zollern.intervention.phase3.title', 'Continuous Guidance & Further Development')}
                  </h4>
                  <p className="text-base text-black/70 leading-relaxed mb-3">
                    <strong className="text-black">{config.get('about.zollern.intervention.phase3.guidance.label', 'Long-term Guidance:')}</strong> {config.get('about.zollern.intervention.phase3.guidance.text', 'Pillar 3 is anchored and runs independently. Continuous development and adaptation to new challenges. System runs as self-runner without permanent external intervention.')}
                  </p>
                  <p className="text-base text-black/70 leading-relaxed mb-3">
                    <strong className="text-black">{config.get('about.zollern.intervention.phase3.result.label', 'The Result:')}</strong> {config.get('about.zollern.intervention.phase3.result.text', 'ZOLLERN overtakes technologically stronger competitors through superior human performance. Becomes world market leader in several segments.')}
                  </p>
                  <div className="bg-black text-white rounded-lg p-5">
                    <p className="text-lg text-white font-bold mb-2">
                      {config.get('about.zollern.intervention.phase3.final.label', 'Final Numbers (28 years: 1994-2022):')}
                    </p>
                    <p className="text-sm text-white/90 leading-relaxed">
                      {config.get('about.zollern.intervention.phase3.final.line1', '8% average pre-tax margin increase')}<br />
                      {config.get('about.zollern.intervention.phase3.final.line2', '= €12M additional annual profit at €150M revenue')}<br />
                      {config.get('about.zollern.intervention.phase3.final.line3', '= €192M cumulative profit impact')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Outcome Box */}
            <div className="bg-black text-white rounded-xl p-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">{config.get('about.zollern.outcome.title', 'The Remarkable Outcome')}</h3>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
                {config.get('about.zollern.outcome', 'ZOLLERN compensated its structural technology weaknesses (Pillar 1) through systematic human performance development (Pillar 3) and became world market leader in several segments – despite smaller R&D budgets than competitors.')}
              </p>
              <p className="text-xl md:text-2xl text-white font-bold mt-8 pt-8 border-t border-white/20">
                {config.get('about.zollern.proof', '8 years to self-running. 12 years self-running phase. €192M proof: Pillar 3 works.')}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-t-2 border-black/10 my-20" />

          {/* 3 Pillars Framework */}
          <div className="mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6 text-center">
              {config.get('about.pillars.framework.title', 'The 3-Pillar Performance Architecture')}
            </h2>
            <p className="text-xl text-black/70 text-center mb-16">
              {config.get('about.pillars.framework.subtitle', 'From Pfeiffer to Eckert: Extending the Technology Portfolio approach')}
            </p>

            {/* 3 Pillar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Pillar 1 */}
              <div className="bg-white border-t-4 border-black rounded-xl p-8 shadow-subtle hover:-translate-y-2 transition-all">
                <div className="text-5xl font-black text-black mb-4">1</div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {config.get('about.pillar1.title', 'Technology Portfolio')}
                </h3>
                <p className="text-sm text-black/60 italic mb-4">
                  {config.get('about.pillar1.source', 'Pfeiffer (1982)')}
                </p>
                <p className="text-sm text-black/70 leading-relaxed mb-4">
                  {config.get('about.pillar1.desc', 'Systematic evaluation of technology positioning. Which technologies offer strategic advantage?')}
                </p>
                <div className="bg-white border border-black/10 p-4 rounded-lg">
                  <p className="text-xs text-black/60 leading-relaxed">
                    {config.get('about.pillar1.applications', 'Technology roadmapping • Make-or-buy • R&D portfolio • Tech scouting')}
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white border-t-4 border-black rounded-xl p-8 shadow-subtle hover:-translate-y-2 transition-all">
                <div className="text-5xl font-black text-black mb-4">2</div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {config.get('about.pillar2.title', 'Resource Strength')}
                </h3>
                <p className="text-sm text-black/60 italic mb-4">
                  {config.get('about.pillar2.source', 'Pfeiffer (1982)')}
                </p>
                <p className="text-sm text-black/70 leading-relaxed mb-4">
                  {config.get('about.pillar2.desc', 'Systematic analysis of organizational resource position. Financial resources, personnel, infrastructure.')}
                </p>
                <div className="bg-white border border-black/10 p-4 rounded-lg">
                  <p className="text-xs text-black/60 leading-relaxed">
                    {config.get('about.pillar2.applications', 'Resource allocation • Org design • Process optimization • Capability building')}
                  </p>
                </div>
              </div>

              {/* Pillar 3 - Highlighted */}
              <div className="bg-black text-white border-t-4 border-white rounded-xl p-8 shadow-apple-glow hover:-translate-y-2 transition-all">
                <div className="text-5xl font-black text-white mb-4">3</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {config.get('about.pillar3.title', 'Human Performance Potential')}
                </h3>
                <p className="text-sm text-white/70 italic mb-4">
                  {config.get('about.pillar3.source', 'Peter Eckert (1985-2025, 40 years)')}
                </p>
                <p className="text-sm text-white/90 leading-relaxed mb-4">
                  {config.get('about.pillar3.desc', 'Systematic unfolding of latent performance potential through enabler systems, collective intelligence, underdog systematics.')}
                </p>
                <div className="bg-white/10 p-4 rounded-lg mb-4">
                  <p className="text-sm text-white font-semibold">
                    {config.get('about.pillar3.principle', '8-12% performance increase. Compensates weaknesses in Pillar 1 or 2.')}
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-xs text-white/70 leading-relaxed">
                    {config.get('about.pillar3.applications', 'Performance Enabler Development • Collective Intelligence • Underdog Systematics • Malik Cybernetics • 306 coaching methods')}
                  </p>
                </div>
              </div>
            </div>

            {/* Revolutionary Insight - Black Box */}
            <div className="bg-black text-white rounded-xl p-12 text-center">
              <h3 className="text-3xl font-bold text-white mb-8">{config.get('about.insight.title', 'The Revolutionary Insight')}</h3>
              <div className="max-w-4xl mx-auto space-y-6 text-lg text-white/90 leading-relaxed">
                <p>{config.get('about.insight.text1', 'McKinsey, BCG, Bain optimize Pillar 1 and 2. Brilliantly. But all your competitors use the same consultancies. Result? An expensive balance of power.')}</p>
                <p><strong className="text-white">{config.get('about.insight.text2', 'Pillar 3 is the game changer:')}</strong> {config.get('about.insight.text2b', 'Cannot be copied. Develops over years. Generates self-running quality. Compensates weaknesses in other pillars.')}</p>
                <p className="text-2xl font-black text-white pt-8 border-t border-white/20">
                  {config.get('about.insight.finland', 'Finland had weaker Pillar 1+2 than 13 teams. But through Pillar 3: 4th place out of 24.')}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-t-2 border-black/10 my-20" />

          {/* Finland Research */}
          <div className="mb-24">
            <div className="bg-white border-l-4 border-black rounded-xl p-8 mb-12 shadow-subtle">
              <span className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🏀 {config.get('about.finland.badge', '153 External Sources')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {config.get('about.finland.title', 'Finland EuroBasket 2025: The Scientific Validation')}
              </h2>
              <p className="text-lg text-black/70 leading-relaxed">
                {config.get('about.finland.intro', 'How Finland reached 4th place out of 24 nations with 37% less budget than average – and what this means for your company.')}
              </p>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-xl shadow-elevated overflow-hidden">
              <table className="w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-5 text-left font-bold">{config.get('about.finland.table.metric', 'Metric')}</th>
                    <th className="p-5 text-left font-bold">{config.get('about.finland.table.finland', 'Finland')}</th>
                    <th className="p-5 text-left font-bold">{config.get('about.finland.table.average', 'Average')}</th>
                    <th className="p-5 text-left font-bold">{config.get('about.finland.table.difference', 'Difference')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black/10 bg-black/5">
                    <td className="p-5 font-semibold text-black">{config.get('about.finland.row1.metric', 'Final placement')}</td>
                    <td className="p-5 font-bold text-black">4</td>
                    <td className="p-5 text-black/70">12.5</td>
                    <td className="p-5 font-bold text-black">+8.5 {config.get('about.finland.row1.unit', 'places')}</td>
                  </tr>
                  <tr className="border-b border-black/10">
                    <td className="p-5 text-black/80">{config.get('about.finland.row2.metric', 'Budget')}</td>
                    <td className="p-5 text-black/80">€6.75M/{config.get('about.finland.year', 'year')}</td>
                    <td className="p-5 text-black/70">€10.77M/{config.get('about.finland.year', 'year')}</td>
                    <td className="p-5 font-bold text-black">-37%</td>
                  </tr>
                  <tr className="border-b border-black/10 bg-black/5">
                    <td className="p-5 font-semibold text-black">{config.get('about.finland.row3.metric', 'Budget ranking')}</td>
                    <td className="p-5 font-bold text-black">14/24</td>
                    <td className="p-5 text-black/70">-</td>
                    <td className="p-5 text-black/70">{config.get('about.finland.row3.diff', 'Below average')}</td>
                  </tr>
                  <tr className="border-b border-black/10">
                    <td className="p-5 text-black/80">{config.get('about.finland.row4.metric', 'Talent base')}</td>
                    <td className="p-5 text-black/80">5.5M</td>
                    <td className="p-5 text-black/70">~30M</td>
                    <td className="p-5 font-bold text-black">-82%</td>
                  </tr>
                  <tr className="bg-black/5">
                    <td className="p-5 font-semibold text-black">{config.get('about.finland.row5.metric', 'ROI')}</td>
                    <td className="p-5 font-bold text-black">10x</td>
                    <td className="p-5 text-black/70">1x</td>
                    <td className="p-5 font-bold text-black text-lg">+900%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* SECTION 3: Finland Säulen-Analyse */}
            <div className="mt-12">
              <h3 className="text-3xl font-bold text-black mb-8">
                {config.get('about.finland.pillars.title', 'The Pillar Analysis: Why Finland Won')}
              </h3>

              {/* 3 Boxes for Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Pillar 1 - Weak */}
                <div className="bg-white border-l-4 border-black rounded-lg p-6 shadow-subtle">
                  <h4 className="font-bold text-black mb-3">
                    {config.get('about.finland.pillars.pillar1.title', 'Pillar 1: Talent Base')}
                  </h4>
                  <p className="text-sm text-black/70 mb-2">
                    <strong className="text-black">{config.get('about.finland.pillars.pillar1.status', 'Weak:')}</strong>
                  </p>
                  <p className="text-sm text-black/60 leading-relaxed">
                    {config.get('about.finland.pillars.pillar1.text', '5.5M population, basketball not main sport, no NBA pipeline.')}
                  </p>
                </div>

                {/* Pillar 2 - Below Average */}
                <div className="bg-white border-l-4 border-black rounded-lg p-6 shadow-subtle">
                  <h4 className="font-bold text-black mb-3">
                    {config.get('about.finland.pillars.pillar2.title', 'Pillar 2: Resources')}
                  </h4>
                  <p className="text-sm text-black/70 mb-2">
                    <strong className="text-black">{config.get('about.finland.pillars.pillar2.status', 'Below Average:')}</strong>
                  </p>
                  <p className="text-sm text-black/60 leading-relaxed">
                    {config.get('about.finland.pillars.pillar2.text', 'Budget rank 14/24, 37% below average.')}
                  </p>
                </div>
              </div>

              {/* Pillar 3 - Excellent (Full Width, Highlighted) */}
              <div className="bg-black text-white rounded-lg p-8 mb-8 hover:shadow-apple-glow transition-all">
                <h4 className="text-2xl font-bold text-white mb-4">
                  ✓ {config.get('about.finland.pillars.pillar3.title', 'Pillar 3: Human Performance')}
                </h4>
                <p className="text-base text-white/90 mb-4">
                  <strong className="text-white">{config.get('about.finland.pillars.pillar3.status', 'Excellent:')}</strong> {config.get('about.finland.pillars.pillar3.text', '16 years systematic performance development through Helsinki Basketball Academy (HBA). Investment structure: €35M over 2012-2021 in systematic talent and coach development according to documented framework.')}
                </p>
                <div className="bg-white/10 rounded-lg p-5 mt-4">
                  <p className="text-sm text-white/90 leading-relaxed">
                    <strong className="text-white">{config.get('about.finland.pillars.pillar3.methodology.label', 'The Methodology:')}</strong> {config.get('about.finland.pillars.pillar3.methodology.text', 'Underdog Systematics, collective intelligence development, Performance Enabler training for coaches, long-term commitment without quick-win expectations.')}
                  </p>
                </div>
              </div>

              {/* Business Translation Box */}
              <div className="bg-black text-white rounded-xl p-10 text-center">
                <p className="text-2xl font-bold text-white mb-4">
                  {config.get('about.finland.pillars.business.title', 'The Business Translation')}
                </p>
                <p className="text-lg text-white/90 leading-relaxed mb-6">
                  {config.get('about.finland.pillars.business.text1', 'Finland had the same structural disadvantages as many mid-sized companies:')}
                  <br />
                  {config.get('about.finland.pillars.business.text2', 'Limited resources (Pillar 2), weaker "technology" (Pillar 1 = talent base).')}
                </p>
                <p className="text-xl font-bold text-white pt-6 border-t border-white/20">
                  {config.get('about.finland.pillars.business.conclusion', 'But through Pillar 3: Overcompensation. 4th place out of 24 with budget rank 14.')}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-t-2 border-black/10 my-20" />

          {/* Client Portfolio */}
          <div className="mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6 text-center">
              {config.get('about.clients.title', 'Client Portfolio & Industry Expertise')}
            </h2>
            <p className="text-xl text-black/70 text-center mb-12">
              {config.get('about.clients.subtitle', '40 years experience across diverse industries')}
            </p>

            {/* 3 Client Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl p-8 shadow-subtle hover:shadow-elevated transition-all text-center">
                <div className="text-6xl mb-6">🏭</div>
                <h4 className="text-xl font-bold text-black mb-4">{config.get('about.clients.industry1.title', 'Machinery & Manufacturing')}</h4>
                <p className="text-base text-black/80 mb-3">{config.get('about.clients.industry1.example', 'ZOLLERN (1994-2015)')}</p>
                <p className="text-sm text-black/70 mb-3">{config.get('about.clients.industry1.impact', '€192M cumulative impact')}</p>
                <p className="text-xs text-black/60">{config.get('about.clients.industry1.focus', 'Focus: Compensate technology disadvantage')}</p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-subtle hover:shadow-elevated transition-all text-center">
                <div className="text-6xl mb-6">⚡</div>
                <h4 className="text-xl font-bold text-black mb-4">{config.get('about.clients.industry2.title', 'Tech Scale-ups')}</h4>
                <p className="text-base text-black/80 mb-3">{config.get('about.clients.industry2.desc', 'Innovative SMEs')}</p>
                <p className="text-sm text-black/70 mb-3">{config.get('about.clients.industry2.challenge', 'Brilliant tech, resource bottlenecks')}</p>
                <p className="text-xs text-black/60">{config.get('about.clients.industry2.focus', 'Focus: Scaling without burnout')}</p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-subtle hover:shadow-elevated transition-all text-center">
                <div className="text-6xl mb-6">🏢</div>
                <h4 className="text-xl font-bold text-black mb-4">{config.get('about.clients.industry3.title', 'Family Businesses')}</h4>
                <p className="text-base text-black/80 mb-3">{config.get('about.clients.industry3.desc', 'Traditional companies')}</p>
                <p className="text-sm text-black/70 mb-3">{config.get('about.clients.industry3.challenge', 'Resources available, tech backlog')}</p>
                <p className="text-xs text-black/60">{config.get('about.clients.industry3.focus', 'Focus: Agility despite tradition')}</p>
              </div>
            </div>

            {/* Industries List */}
            <div className="bg-white rounded-xl p-8 text-center shadow-subtle">
              <h3 className="text-lg font-bold text-black mb-4">{config.get('about.industries.title', 'Industry Expertise')}</h3>
              <p className="text-base text-black/70 leading-relaxed">
                {config.get('about.industries.list', 'Machinery • Automotive Suppliers • Precision Technology • Medical Technology • Process Engineering • Plant Engineering • Industrial Services • Tech Startups in B2B')}
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-black text-white rounded-xl p-16 text-center hover:shadow-apple-glow transition-all">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              {config.get('about.final.title', 'Ready to Activate Your Third Pillar?')}
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
              {config.get('about.final.text', 'Free diagnostics: Where does your company stand? Which pillar is your bottleneck? How much latent potential is untapped?')}
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-black px-12 py-5 rounded-lg font-bold text-lg uppercase tracking-wider hover:shadow-apple-glow hover:scale-105 transition-all duration-300"
            >
              {config.get('about.final.button', 'Request Analysis Now')}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default About
