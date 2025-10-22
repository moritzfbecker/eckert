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
                <div className="w-48 h-48 bg-black text-white rounded-full flex items-center justify-center text-6xl font-black mx-auto mb-8 shadow-apple-glow">
                  PE
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
                      {config.get('about.sidebar.entrepreneurial.text', '5 companies founded (1989-2020)')}
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
                    {config.get('about.phase2.years', '1989-2020')}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                    {config.get('about.phase2.title', 'Entrepreneurship: Practice Validation')}
                  </h3>
                  <p className="text-base text-black/70 leading-relaxed mb-6">
                    {config.get('about.phase2.intro', 'Co-founder of 5 companies across various industries. Direct experience with scale-up challenges, resource scarcity, team development.')}
                  </p>

                  <div className="space-y-3 text-sm text-black/80 leading-relaxed">
                    <p><strong className="text-black">{config.get('about.phase2.company1', 'Company 1 (1989):')}</strong> {config.get('about.phase2.company1.text', 'Technology marketing. First systematic development of performance methods.')}</p>
                    <p><strong className="text-black">{config.get('about.phase2.company2', 'Company 2 (1998):')}</strong> {config.get('about.phase2.company2.text', 'Process industry with production (paper mill restructuring). Proof: Crisis management competence under pressure.')}</p>
                    <p><strong className="text-black">{config.get('about.phase2.company3', 'Company 3 (2005):')}</strong> {config.get('about.phase2.company3.text', 'Services. Scaling service organizations.')}</p>
                    <p><strong className="text-black">{config.get('about.phase2.company4', 'Company 4 (2017):')}</strong> {config.get('about.phase2.company4.text', 'Technology scale-up. Practical testing of Pillar 3 prototypes.')}</p>
                    <p><strong className="text-black">{config.get('about.phase2.company5', 'Company 5 (2020):')}</strong> {config.get('about.phase2.company5.text', 'Continuous development of methodology.')}</p>
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

              {/* Unique Combination Box */}
              <div className="bg-white border-l-4 border-black rounded-xl p-8 mt-12 shadow-subtle">
                <h3 className="text-xl font-bold text-black mb-4">
                  {config.get('about.combination.title', 'The Unique Combination')}
                </h3>
                <p className="text-base text-black/70 leading-relaxed">
                  {config.get('about.combination.text', 'What distinguishes Peter Eckert from classical strategy consultants: He combines academic research methodology (6 years Fraunhofer), entrepreneurial hands-on experience (5 companies, diverse industries), long-term transformation proof (8 years ZOLLERN to self-running, then 12 years self-running phase = €192M impact), and systematic method development (44 years across numerous Hidden Champions projects). This combination exists at no MBB partner.')}
                </p>
              </div>
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
