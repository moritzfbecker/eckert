/**
 * About Page - Peter Eckert Full Story
 *
 * Professional biography with 40-year journey
 * Category: 'about'
 * Design: Schwarz/Weiß, Timeline, Professional
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
        <div className="py-12 max-w-6xl mx-auto">
          {/* Hero - Peter Eckert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-4xl font-bold">
                PE
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-black">
                  {config.get('about.hero.name', 'Peter Eckert')}
                </h1>
                <p className="text-xl md:text-2xl text-black/70">
                  {config.get('about.hero.tagline', '40 Years Performance Architecture: From Fraunhofer via Entrepreneurship to Systematic CEO Development')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Four Pillars Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {/* Academic */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-black text-white rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-3">
                {config.get('about.pillars.academic.title', 'Academic')}
              </h3>
              <p className="text-sm text-white/80">
                {config.get('about.pillars.academic.text', '6 years Fraunhofer Institute for Manufacturing Engineering and Automation (1981-1986)')}
              </p>
            </motion.div>

            {/* Entrepreneurial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-black text-white rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-3">
                {config.get('about.pillars.entrepreneurial.title', 'Entrepreneurial')}
              </h3>
              <p className="text-sm text-white/80">
                {config.get('about.pillars.entrepreneurial.text', 'Testing and development of Performance Architecture in 5 companies across industries (1989-2020)')}
              </p>
            </motion.div>

            {/* Consulting */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-black text-white rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-3">
                {config.get('about.pillars.consulting.title', 'Consulting')}
              </h3>
              <p className="text-sm text-white/80">
                {config.get('about.pillars.consulting.text', '8 years ZOLLERN transformation to self-running system (1994-2002) with €192M profit impact (mainly in self-running phase)')}
              </p>
            </motion.div>

            {/* Methodology */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-black text-white rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-3">
                {config.get('about.pillars.methodology.title', 'Methodology')}
              </h3>
              <p className="text-sm text-white/80">
                {config.get('about.pillars.methodology.text', '44 years developing the 3-Pillar Performance Architecture across numerous Hidden Champions projects (1981-2025)')}
              </p>
            </motion.div>
          </div>

          {/* Journey Section */}
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-12 text-center">
              {config.get('about.journey.title', 'The Journey from Science to Entrepreneurship to Performance Architecture')}
            </h2>
            <p className="text-xl text-black/70 leading-relaxed mb-16 text-center max-w-4xl mx-auto">
              {config.get('about.journey.intro', 'Peter Eckert developed a unique framework over four decades that connects academic research, entrepreneurial practice, and systematic performance development. His thesis: Structural weaknesses in technology or resources can not only be compensated but overcompensated through systematic human performance development.')}
            </p>

            {/* Timeline */}
            <div className="space-y-12">
              {/* Phase 1: Fraunhofer */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="border-l-4 border-black pl-8"
              >
                <div className="text-2xl font-black text-black mb-3">
                  {config.get('about.phase1.years', '1981-1986')}
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">
                  {config.get('about.phase1.title', 'Fraunhofer Institute: Scientific Foundation')}
                </h3>
                <p className="text-lg text-black/70 leading-relaxed mb-4">
                  {config.get('about.phase1.text', '6 years at Fraunhofer Institute for Manufacturing Engineering and Automation (IPA). Focus: Technology transfer from research to industrial application. First insights: The "last mile" fails not because of technology, but because of organization and people.')}
                </p>
                <div className="bg-black text-white rounded-lg p-6">
                  <p className="text-base text-white/90">
                    <strong className="text-white">{config.get('about.phase1.insight.label', 'Key Insight:')}</strong> {config.get('about.phase1.insight.text', 'Technology excellence alone does not generate performance excellence. Systematic methodology for human performance is missing.')}
                  </p>
                </div>
              </motion.div>

              {/* Phase 2: Entrepreneurship */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="border-l-4 border-black pl-8"
              >
                <div className="text-2xl font-black text-black mb-3">
                  {config.get('about.phase2.years', '1989-2020')}
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">
                  {config.get('about.phase2.title', 'Entrepreneurship: Practice Validation')}
                </h3>
                <p className="text-lg text-black/70 leading-relaxed mb-6">
                  {config.get('about.phase2.intro', 'Co-founder of 5 companies across various industries. Direct experience with scale-up challenges, resource scarcity, team development.')}
                </p>

                <div className="space-y-3 mb-4">
                  <p className="text-base text-black/80">
                    <strong className="text-black">{config.get('about.phase2.company1', 'Company 1 (1989):')}</strong> {config.get('about.phase2.company1.text', 'Technology marketing. First systematic development of performance methods.')}
                  </p>
                  <p className="text-base text-black/80">
                    <strong className="text-black">{config.get('about.phase2.company2', 'Company 2 (1998):')}</strong> {config.get('about.phase2.company2.text', 'Process industry with production (paper mill restructuring). Proof: Crisis management competence under pressure.')}
                  </p>
                  <p className="text-base text-black/80">
                    <strong className="text-black">{config.get('about.phase2.company3', 'Company 3 (2005):')}</strong> {config.get('about.phase2.company3.text', 'Services. Scaling service organizations.')}
                  </p>
                  <p className="text-base text-black/80">
                    <strong className="text-black">{config.get('about.phase2.company4', 'Company 4 (2017):')}</strong> {config.get('about.phase2.company4.text', 'Technology scale-up. Practical testing of Pillar 3 prototypes.')}
                  </p>
                  <p className="text-base text-black/80">
                    <strong className="text-black">{config.get('about.phase2.company5', 'Company 5 (2020):')}</strong> {config.get('about.phase2.company5.text', 'Continuous development of methodology.')}
                  </p>
                </div>

                <div className="bg-black text-white rounded-lg p-6">
                  <p className="text-base text-white/90">
                    <strong className="text-white">{config.get('about.phase2.insight.label', 'Key Insight:')}</strong> {config.get('about.phase2.insight.text', 'The Pfeiffer Technology Portfolio Analysis (Pillar 1+2) is necessary but not sufficient. Pillar 3 is missing.')}
                  </p>
                </div>
              </motion.div>

              {/* Phase 3: ZOLLERN Transformation */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="border-l-4 border-black pl-8"
              >
                <div className="text-2xl font-black text-black mb-3">
                  {config.get('about.phase3.years', '1994-2002')}
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">
                  {config.get('about.phase3.title', 'ZOLLERN: Long-term Proof (8 years systematic transformation)')}
                </h3>
                <p className="text-lg text-black/70 leading-relaxed mb-6">
                  {config.get('about.phase3.intro', '8 years systematic transformation of a Hidden Champion with structural technology weaknesses. First complete application of the 3-Pillar methodology.')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white border-2 border-black/10 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-black mb-3">
                      {config.get('about.phase3.phase1.title', 'Phase 1 (1994-1998):')}
                    </h4>
                    <p className="text-sm text-black/70">
                      {config.get('about.phase3.phase1.text', 'Implicit application in projects. "World Champion Hypothesis" as orientation.')}
                    </p>
                  </div>

                  <div className="bg-white border-2 border-black/10 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-black mb-3">
                      {config.get('about.phase3.phase2.title', 'Phase 2 (1998-2002):')}
                    </h4>
                    <p className="text-sm text-black/70">
                      {config.get('about.phase3.phase2.text', 'Explicit formulation of 3 pillars. Systematization. 8% operating margin increase. Self-running quality achieved.')}
                    </p>
                  </div>
                </div>

                <div className="bg-black text-white rounded-lg p-6">
                  <p className="text-base text-white/90">
                    <strong className="text-white">{config.get('about.phase3.insight.label', 'Key Insight:')}</strong> {config.get('about.phase3.insight.text', 'The explicit 3-Pillar systematization developed in Phase 2 leads to self-running quality. After 8 years, it runs without external intervention.')}
                  </p>
                </div>
              </motion.div>

              {/* Phase 4: Self-Running Phase */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="border-l-4 border-black pl-8"
              >
                <div className="text-2xl font-black text-black mb-3">
                  {config.get('about.phase4.years', '2003-2015')}
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">
                  {config.get('about.phase4.title', 'ZOLLERN Phase 3: Self-Running Phase (12 years)')}
                </h3>
                <p className="text-lg text-black/70 leading-relaxed mb-6">
                  {config.get('about.phase4.text', 'Complete permeation with cumulative profit impact of €192M as self-running system. System continues without permanent external intervention.')}
                </p>
                <div className="bg-black text-white rounded-lg p-6">
                  <p className="text-base text-white/90">
                    {config.get('about.phase4.result', 'The result: The explicit 3-Pillar systematization developed in Phase 2 leads to self-running quality for another 12 years without requiring external intervention.')}
                  </p>
                </div>
              </motion.div>

              {/* Phase 5: Systematization */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="border-l-4 border-black pl-8"
              >
                <div className="text-2xl font-black text-black mb-3">
                  {config.get('about.phase5.years', '2002-2025')}
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">
                  {config.get('about.phase5.title', 'Systematization & Scaling')}
                </h3>
                <p className="text-lg text-black/70 leading-relaxed mb-6">
                  {config.get('about.phase5.text', 'Further development of ZOLLERN learnings into a complete framework. Through various consulting mandates with numerous Hidden Champions, completion of the 3-Pillar Framework and analysis of 153 external sources (Finland case) for validation. Development of the 306-Method Handbook.')}
                </p>
                <div className="bg-black text-white rounded-lg p-6">
                  <p className="text-base text-white/90">
                    <strong className="text-white">{config.get('about.phase5.result.label', 'Result:')}</strong> {config.get('about.phase5.result.text', '3-Pillar Performance Architecture as replicable, scientifically founded methodology for CEOs of all three target groups.')}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-black/10 mb-20" />

          {/* ZOLLERN Case Study */}
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-12 text-center">
              {config.get('about.zollern.title', 'ZOLLERN: 8-Year Transformation to Self-Running System (1994-2002)')}
            </h2>
            <p className="text-xl text-black/70 text-center mb-12 max-w-4xl mx-auto">
              {config.get('about.zollern.subtitle', '8 years systematic permeation until self-running quality, then 12 years self-running phase (2003-2015) with €192M cumulative impact')}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-black text-white rounded-xl p-6 text-center">
                <div className="text-5xl font-black text-white mb-2">€192M</div>
                <p className="text-sm text-white/80">{config.get('about.zollern.stat1', 'Cumulative profit impact (mainly self-running phase)')}</p>
              </div>
              <div className="bg-black text-white rounded-xl p-6 text-center">
                <div className="text-5xl font-black text-white mb-2">8%</div>
                <p className="text-sm text-white/80">{config.get('about.zollern.stat2', 'Operating margin increase (achieved in Phase 2)')}</p>
              </div>
              <div className="bg-black text-white rounded-xl p-6 text-center">
                <div className="text-5xl font-black text-white mb-2">8</div>
                <p className="text-sm text-white/80">{config.get('about.zollern.stat3', 'Years until self-running (1994-2002)')}</p>
              </div>
              <div className="bg-black text-white rounded-xl p-6 text-center">
                <div className="text-5xl font-black text-white mb-2">12</div>
                <p className="text-sm text-white/80">{config.get('about.zollern.stat4', 'Years self-running phase (2003-2015)')}</p>
              </div>
            </div>

            {/* ZOLLERN Story Details */}
            <div className="bg-black text-white rounded-xl p-10 md:p-12">
              <h3 className="text-2xl font-bold text-white mb-6">
                {config.get('about.zollern.essence.title', 'The Essence: What Was Done Concretely?')}
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {config.get('about.zollern.method1.title', 'Enabler Systems')}
                  </h4>
                  <p className="text-base text-white/80">
                    {config.get('about.zollern.method1.text', 'Every leader trained as Performance Enabler. Not "manager" but "igniter". Systematic coaching according to documented methods.')}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {config.get('about.zollern.method2.title', 'Collective Intelligence')}
                  </h4>
                  <p className="text-base text-white/80">
                    {config.get('about.zollern.method2.text', 'Cross-functional teams with "World Champion Hypothesis". Every project oriented on: "What would the world market leader do?"')}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {config.get('about.zollern.method3.title', 'Underdog Systematics')}
                  </h4>
                  <p className="text-base text-white/80">
                    {config.get('about.zollern.method3.text', 'Technology disadvantage is consciously recognized – and transformed into motivation driver. "We must work smarter, not harder."')}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {config.get('about.zollern.method4.title', 'Malik Cybernetics')}
                  </h4>
                  <p className="text-base text-white/80">
                    {config.get('about.zollern.method4.text', 'Functioning control loops instead of endless meetings. Feedback systems that automatically correct. Self-control instead of micromanagement.')}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-xl text-white font-bold">
                  {config.get('about.zollern.outcome', 'The Remarkable Outcome: ZOLLERN compensated its structural technology weaknesses (Pillar 1) through systematic human performance development (Pillar 3) and became world market leader in several segments – despite smaller R&D budgets than competitors.')}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-black/10 mb-20" />

          {/* 3 Pillars Framework */}
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6 text-center">
              {config.get('about.pillars.framework.title', 'The 3-Pillar Performance Architecture')}
            </h2>
            <p className="text-xl text-black/70 text-center mb-12">
              {config.get('about.pillars.framework.subtitle', 'Scientific foundation, practical validation, systematic application')}
            </p>

            <p className="text-lg text-black/70 mb-12 text-center max-w-4xl mx-auto">
              {config.get('about.pillars.framework.intro', 'The classical Technology Portfolio Analysis by Pfeiffer (University Erlangen-Nuremberg) comprises two pillars: Technology Portfolio and Resource Strength. Peter Eckert developed the third pillar over 44 years: Human Performance Potential. This extension makes it possible to overcompensate structural weaknesses in Pillar 1 or 2.')}
            </p>

            {/* Three Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="bg-white border-2 border-black/10 rounded-xl p-8">
                <div className="text-6xl font-black text-black mb-4">1</div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  {config.get('about.pillar1.title', 'Technology Portfolio')}
                </h3>
                <p className="text-sm text-black/60 mb-4">
                  {config.get('about.pillar1.source', 'According to Pfeiffer (University Erlangen-Nuremberg, 1982)')}
                </p>
                <p className="text-base text-black/80 mb-6">
                  {config.get('about.pillar1.desc', 'Systematic evaluation of technology positioning in competitive environment. Which technologies offer strategic advantage? Portfolio management according to scientific methodology.')}
                </p>
                <p className="text-sm text-black/60">
                  {config.get('about.pillar1.applications', 'Typical applications: Technology roadmapping, Make-or-buy decisions, R&D portfolio optimization, Technology scouting')}
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white border-2 border-black/10 rounded-xl p-8">
                <div className="text-6xl font-black text-black mb-4">2</div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  {config.get('about.pillar2.title', 'Resource Strength')}
                </h3>
                <p className="text-sm text-black/60 mb-4">
                  {config.get('about.pillar2.source', 'According to Pfeiffer (University Erlangen-Nuremberg, 1982)')}
                </p>
                <p className="text-base text-black/80 mb-6">
                  {config.get('about.pillar2.desc', 'Systematic analysis and optimization of organizational resource position. Financial resources, personnel qualification, infrastructure, processes.')}
                </p>
                <p className="text-sm text-black/60">
                  {config.get('about.pillar2.applications', 'Typical applications: Resource allocation, Organization design, Process optimization, Capability building')}
                </p>
              </div>

              {/* Pillar 3 - Highlighted */}
              <div className="bg-black text-white rounded-xl p-8">
                <div className="text-6xl font-black text-white mb-4">3</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {config.get('about.pillar3.title', 'Human Performance Potential')}
                </h3>
                <p className="text-sm text-white/70 mb-4">
                  {config.get('about.pillar3.source', 'According to Peter Eckert (1985-2025, 40 years)')}
                </p>
                <p className="text-base text-white/90 mb-6">
                  {config.get('about.pillar3.desc', 'Systematic unfolding of latent performance potential through integration of enabler systems, collective intelligence, and underdog systematics.')}
                </p>
                <p className="text-sm text-white/80 font-semibold mb-4">
                  {config.get('about.pillar3.principle', 'Core principle: 8-12% performance increase through systematic potential activation. Compensates structural weaknesses in Pillar 1 or 2.')}
                </p>
                <p className="text-sm text-white/70">
                  {config.get('about.pillar3.applications', 'Typical applications: Performance Enabler Development (Klopp/Alonso principle), Collective Intelligence Systems, Underdog Systematics (Finland model), Malik Cybernetics (functioning control loops), 306 documented coaching methods')}
                </p>
              </div>
            </div>

            {/* Revolutionary Insight */}
            <div className="mt-12 bg-black text-white rounded-xl p-10 md:p-12">
              <h3 className="text-3xl font-bold text-white mb-6">
                {config.get('about.insight.title', 'The Revolutionary Insight')}
              </h3>
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                {config.get('about.insight.text1', 'McKinsey, BCG, Bain optimize Pillar 1 and 2. Brilliantly. But all your competitors use the same consultancies. The result? An expensive balance of power.')}
              </p>
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                {config.get('about.insight.text2', 'Pillar 3 is the game changer: It cannot be copied through standard consulting. It develops over years. It generates self-running quality. And it compensates structural weaknesses in the other two pillars.')}
              </p>
              <p className="text-xl text-white font-bold">
                {config.get('about.insight.finland', 'Finland had weaker Pillar 1+2 than 13 other teams. But through Pillar 3: 4th place out of 24.')}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-black/10 mb-20" />

          {/* Finland Research */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="text-5xl">🏀</div>
              <h2 className="text-4xl md:text-5xl font-black text-black">
                {config.get('about.finland.title', '153 External Sources')}
              </h2>
            </div>
            <p className="text-2xl text-black/70 mb-8">
              {config.get('about.finland.subtitle', 'Finland EuroBasket 2025: The Scientific Validation')}
            </p>
            <p className="text-lg text-black/70 mb-12">
              {config.get('about.finland.intro', 'How Finland reached 4th place out of 24 nations with 37% less budget than average – and what this means for your company.')}
            </p>

            {/* Finland Stats Table */}
            <div className="bg-black text-white rounded-xl p-8 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="pb-4 text-white font-bold">{config.get('about.finland.table.metric', 'Metric')}</th>
                    <th className="pb-4 text-white font-bold">{config.get('about.finland.table.finland', 'Finland')}</th>
                    <th className="pb-4 text-white font-bold">{config.get('about.finland.table.average', 'Average (24 teams)')}</th>
                    <th className="pb-4 text-white font-bold">{config.get('about.finland.table.difference', 'Difference')}</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-4">{config.get('about.finland.row1.metric', 'Final placement')}</td>
                    <td className="py-4">4</td>
                    <td className="py-4">12.5 (Median)</td>
                    <td className="py-4 text-white font-semibold">+8.5 {config.get('about.finland.row1.unit', 'places')}</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4">{config.get('about.finland.row2.metric', 'Budget (estimate)')}</td>
                    <td className="py-4">€6.75M/{config.get('about.finland.year', 'year')}</td>
                    <td className="py-4">€10.77M/{config.get('about.finland.year', 'year')}</td>
                    <td className="py-4 text-white font-semibold">-37%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4">{config.get('about.finland.row3.metric', 'Budget ranking')}</td>
                    <td className="py-4">14/24</td>
                    <td className="py-4">-</td>
                    <td className="py-4 text-white font-semibold">{config.get('about.finland.row3.diff', 'Below average')}</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4">{config.get('about.finland.row4.metric', 'Talent base (population)')}</td>
                    <td className="py-4">5.5M</td>
                    <td className="py-4">~30M (Ø)</td>
                    <td className="py-4 text-white font-semibold">-82%</td>
                  </tr>
                  <tr>
                    <td className="py-4">{config.get('about.finland.row5.metric', 'ROI (Performance/Budget)')}</td>
                    <td className="py-4">10x</td>
                    <td className="py-4">1x (Baseline)</td>
                    <td className="py-4 text-white font-semibold">+900%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-black/10 mb-20" />

          {/* Client Portfolio */}
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-12 text-center">
              {config.get('about.clients.title', 'Client Portfolio & Industry Expertise')}
            </h2>
            <p className="text-xl text-black/70 text-center mb-12">
              {config.get('about.clients.subtitle', '40 years experience across diverse industries and company sizes')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Industry 1 */}
              <div className="bg-black text-white rounded-xl p-8">
                <div className="text-5xl mb-4">🏭</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {config.get('about.clients.industry1.title', 'Machinery & Manufacturing')}
                </h3>
                <p className="text-base text-white/80 mb-4">
                  {config.get('about.clients.industry1.example', 'ZOLLERN (1994-2015: 8 years to self-running, then 12 years self-running phase)')}
                </p>
                <p className="text-sm text-white/70 mb-4">
                  {config.get('about.clients.industry1.impact', '€192M cumulative profit impact (mainly in self-running phase)')}
                </p>
                <p className="text-sm text-white/80">
                  {config.get('about.clients.industry1.focus', 'Focus: Compensate technology disadvantage')}
                </p>
              </div>

              {/* Industry 2 */}
              <div className="bg-black text-white rounded-xl p-8">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {config.get('about.clients.industry2.title', 'Tech Scale-ups')}
                </h3>
                <p className="text-base text-white/80 mb-4">
                  {config.get('about.clients.industry2.desc', 'Innovative SMEs with scaling challenges')}
                </p>
                <p className="text-sm text-white/70 mb-4">
                  {config.get('about.clients.industry2.challenge', 'Brilliant technology, but resource bottlenecks')}
                </p>
                <p className="text-sm text-white/80">
                  {config.get('about.clients.industry2.focus', 'Focus: Scaling without burnout')}
                </p>
              </div>

              {/* Industry 3 */}
              <div className="bg-black text-white rounded-xl p-8">
                <div className="text-5xl mb-4">🏢</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {config.get('about.clients.industry3.title', 'Family Businesses')}
                </h3>
                <p className="text-base text-white/80 mb-4">
                  {config.get('about.clients.industry3.desc', 'Traditional companies with digitalization challenges')}
                </p>
                <p className="text-sm text-white/70 mb-4">
                  {config.get('about.clients.industry3.challenge', 'Resources available, but tech backlog')}
                </p>
                <p className="text-sm text-white/80">
                  {config.get('about.clients.industry3.focus', 'Focus: Agility despite tradition')}
                </p>
              </div>
            </div>

            {/* Industries List */}
            <div className="mt-12 text-center">
              <h3 className="text-xl font-bold text-black mb-6">
                {config.get('about.industries.title', 'Industry Expertise')}
              </h3>
              <p className="text-base text-black/70">
                {config.get('about.industries.list', 'Machinery • Automotive Suppliers • Precision Technology • Medical Technology • Process Engineering • Plant Engineering • Industrial Services • Tech Startups in B2B Segments')}
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-black text-white rounded-xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {config.get('about.final.title', 'Ready to Activate Your Third Pillar?')}
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
              {config.get('about.final.text', 'Free diagnostics: Where does your company stand? Which pillar is your bottleneck? How much latent potential is untapped?')}
            </p>
            <Link
              to="/contact"
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
              {config.get('about.final.button', 'Request Analysis Now')}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default About
