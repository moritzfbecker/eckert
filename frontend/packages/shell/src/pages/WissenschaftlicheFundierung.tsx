/**
 * Wissenschaftliche Fundierung Page
 *
 * Die Eckert-Preisser-Methodik: Empirisch validiert, systematisch erprobt
 * 27 peer-reviewed Quellen, 16 Jahre ZOLLERN Case, 3.000+ validierte Unternehmen
 *
 * Category: 'science'
 * Design: Clean Black/White, Apple Gradient hover only
 */

import { motion } from 'framer-motion'
import { Container } from '../../../shared/ui-components/Container'
import { Section } from '../../../shared/ui-components/Section'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'
import { Link } from 'react-router-dom'

const WissenschaftlicheFundierung = () => {
  const { language } = useTranslation()
  const config = useConfig('science', language)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Section spacing="none" className="pt-40 md:pt-48 pb-20 md:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6" style={{ color: '#000000' }}>
              {config.get('hero.title', 'Wissenschaftliche Fundierung')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto" style={{ color: 'rgba(0,0,0,0.8)' }}>
              {config.get('hero.subtitle', 'Die Eckert-Preisser-Methodik: Empirisch validiert, systematisch erprobt')}
            </p>
            <div className="inline-block px-6 py-3 rounded-full text-sm font-bold" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
              {config.get('hero.badge', 'Die einzige wissenschaftlich fundierte Performance-Architecture-Methodik')}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Executive Summary */}
      <Section spacing="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-xl p-6 md:p-10 shadow-xl border-2"
            style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.1)' }}
          >
            <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ color: '#000000' }}>
              {config.get('summary.title', 'Executive Summary')}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(0,0,0,0.8)' }}>
              {config.get('summary.text', 'Die Eckert-Preisser-Methodik basiert auf 27 wissenschaftlichen Primärquellen aus führenden akademischen Institutionen (Harvard Business School, Stanford GSB, McKinsey Global Institute) und wurde über 16 Jahre praktisch validiert. Jeder Parameter und jede Aussage unserer Methodik ist mit mindestens zwei unabhängigen empirischen Studien belegt.')}
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Key Statistics */}
      <Section spacing="none" className="pb-20">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { number: '27', label: config.get('stats.sources', 'Peer-Reviewed Quellen') },
              { number: '3.000+', label: config.get('stats.companies', 'Validierte Unternehmen') },
              { number: '30 Jahre', label: config.get('stats.period', 'Forschungszeitraum') },
              { number: '16 Jahre', label: config.get('stats.case', 'ZOLLERN Case') }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl p-6 md:p-8 text-center hover:shadow-apple-glow transition-all duration-300"
                style={{ backgroundColor: '#000000' }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-2" style={{ color: '#FFFFFF' }}>
                  {stat.number}
                </div>
                <p className="text-sm md:text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Core Validation Table */}
      <Section spacing="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-center" style={{ color: '#000000' }}>
              {config.get('validation.title', 'Validierung der Kern-Parameter')}
            </h2>
            <p className="text-lg md:text-xl mb-12 text-center max-w-4xl mx-auto" style={{ color: 'rgba(0,0,0,0.7)' }}>
              {config.get('validation.intro', 'Alle zentralen Parameter der Eckert-Preisser-Methodik sind wissenschaftlich validiert. Die folgende Tabelle zeigt die empirische Basis unserer Kernaussagen:')}
            </p>

            {/* Responsive Table */}
            <div className="overflow-x-auto rounded-xl border-2" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
              <table className="w-full" style={{ backgroundColor: '#FFFFFF' }}>
                <thead style={{ backgroundColor: '#000000' }}>
                  <tr>
                    <th className="px-4 md:px-6 py-4 text-left font-bold text-sm md:text-base" style={{ color: '#FFFFFF' }}>{config.get('table.param', 'Parameter')}</th>
                    <th className="px-4 md:px-6 py-4 text-left font-bold text-sm md:text-base" style={{ color: '#FFFFFF' }}>{config.get('table.value', 'Wert')}</th>
                    <th className="px-4 md:px-6 py-4 text-left font-bold text-sm md:text-base hidden md:table-cell" style={{ color: '#FFFFFF' }}>{config.get('table.primary', 'Primärquelle')}</th>
                    <th className="px-4 md:px-6 py-4 text-left font-bold text-sm md:text-base hidden lg:table-cell" style={{ color: '#FFFFFF' }}>{config.get('table.secondary', 'Sekundärquelle')}</th>
                    <th className="px-4 md:px-6 py-4 text-left font-bold text-sm md:text-base" style={{ color: '#FFFFFF' }}>{config.get('table.status', 'Status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      param: 'MBB Umsetzungsrate',
                      value: '33%',
                      primary: 'Strategy& 2016',
                      secondary: 'McKinsey 2013',
                      status: 'Stark validiert'
                    },
                    {
                      param: 'Systemische Umsetzung',
                      value: '72,5%',
                      primary: 'Schwaninger 2009',
                      secondary: 'Kotter 1995',
                      status: 'Validiert'
                    },
                    {
                      param: 'ROI-Beitrag',
                      value: '8-12%',
                      primary: 'ZOLLERN Case 16 Jahre',
                      secondary: 'Collins 2001',
                      status: 'Empirisch belegt'
                    },
                    {
                      param: 'Coaching-Leverage',
                      value: '47% Varianz',
                      primary: 'McKinsey 2016',
                      secondary: 'Judge & Piccolo 2004',
                      status: 'Stark validiert'
                    },
                    {
                      param: 'Talent-Abundance-Paradox',
                      value: 'Höhere Fluktuation',
                      primary: 'Groysberg 2008 (HBS)',
                      secondary: 'Google Project Oxygen',
                      status: 'Stark validiert'
                    },
                    {
                      param: 'Langfrist-Vorteil',
                      value: '+47-81%',
                      primary: 'McKinsey 2017 (N=615)',
                      secondary: 'HBR Collins 2005',
                      status: 'Stark validiert'
                    },
                    {
                      param: 'Break-Even',
                      value: 'Jahr 5-7',
                      primary: 'Collins 2001',
                      secondary: 'ZOLLERN Jahr 4',
                      status: 'Konservativ adjustiert'
                    }
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className="transition-colors"
                      style={{
                        borderBottom: '1px solid rgba(0,0,0,0.1)',
                        backgroundColor: index % 2 === 0 ? 'rgba(0,0,0,0.05)' : '#FFFFFF'
                      }}
                    >
                      <td className="px-4 md:px-6 py-4 font-semibold text-sm md:text-base" style={{ color: '#000000' }}>{row.param}</td>
                      <td className="px-4 md:px-6 py-4 text-sm md:text-base" style={{ color: '#000000' }}>{row.value}</td>
                      <td className="px-4 md:px-6 py-4 text-sm hidden md:table-cell" style={{ color: 'rgba(0,0,0,0.7)' }}>{row.primary}</td>
                      <td className="px-4 md:px-6 py-4 text-sm hidden lg:table-cell" style={{ color: 'rgba(0,0,0,0.7)' }}>{row.secondary}</td>
                      <td className="px-4 md:px-6 py-4 font-bold text-sm md:text-base" style={{ color: '#000000' }}>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ZOLLERN Case Study */}
      <Section spacing="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-center" style={{ color: '#000000' }}>
              {config.get('zollern.title', 'ZOLLERN Hidden Champion Case')}
            </h3>
            <p className="text-lg md:text-xl mb-4 text-center" style={{ color: 'rgba(0,0,0,0.7)' }}>
              16 Jahre empirische Validierung
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-12 text-center max-w-5xl mx-auto" style={{ color: 'rgba(0,0,0,0.7)' }}>
              {config.get('zollern.intro', 'Die längste dokumentierte Validierung der Eckert-Preisser-Methodik: Ein Hidden Champion aus dem Werkzeugmaschinenbau mit 400 Mitarbeitern wurde über 16 Jahre (2008-2024) systematisch begleitet und dokumentiert. Die Ergebnisse übertreffen sogar die konservativsten Prognosen aus der Literatur.')}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
              {[
                { value: '8%', label: config.get('zollern.metric1', 'Beitrag zur Vorsteuerumsatzrendite') },
                { value: 'Jahr 4', label: config.get('zollern.metric2', 'Break-Even erreicht') },
                { value: '16 Jahre', label: config.get('zollern.metric3', 'Laufende Dokumentation') },
                { value: '12%', label: config.get('zollern.metric4', 'Heute erreichbar (weiterentwickelt)') }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl p-6 md:p-8 text-center"
                  style={{ backgroundColor: '#000000' }}
                >
                  <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: '#FFFFFF' }}>{metric.value}</div>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{metric.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-xl p-6 md:p-8 max-w-5xl mx-auto" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
              <p className="text-base md:text-lg leading-relaxed text-center" style={{ color: 'rgba(0,0,0,0.8)' }}>
                <strong>{config.get('zollern.mechanism', 'Kernmechanismen:')}</strong> {config.get('zollern.mechanism.text', '3-Säulen-Framework (Technologie-Portfolio nach Pfeiffer + Human-Performance nach Eckert), Malik-Kybernetik, CEO-Transformation zu Performance Enabler. Das System entwickelte Selbstläufer-Qualitäten ab Jahr 5-8.')}
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Scientific Sources by Category */}
      <Section spacing="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-12 text-center" style={{ color: '#000000' }}>
              {config.get('sources.title', 'Wissenschaftliche Quellen nach Kategorien')}
            </h2>

            {/* Category 1: MBB Reality */}
            <div className="rounded-xl p-6 md:p-8 mb-6 border-2" style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.1)' }}>
              <h4 className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#000000' }}>
                I. {config.get('sources.cat1.title', 'Management-Strategie-Umsetzung (MBB-Realität)')}
              </h4>
              <div className="space-y-4">
                {[
                  {
                    number: '[1]',
                    authors: 'Strategy& (PwC) (2016)',
                    title: 'Strategy – To Execution Gap',
                    finding: config.get('sources.cat1.s1', '67% aller Strategien werden nicht umgesetzt. Nur 33% erreichen ihr Implementierungsziel. 8% der Führungskräfte verbringen weniger als 1 Stunde/Monat an Strategie-Review.')
                  },
                  {
                    number: '[2]',
                    authors: 'McKinsey & Company (2013)',
                    title: "Strategy's Strategist: An Interview with Richard Rumelt",
                    finding: config.get('sources.cat1.s2', '70% scheitern an Umsetzung, nicht an Strategie-Qualität.')
                  },
                  {
                    number: '[3]',
                    authors: 'Sull, Donald; Homkes, Rebecca; Sull, Charles (2015)',
                    title: 'Why Strategy Execution Unravels – and What to Do About It',
                    finding: config.get('sources.cat1.s3', 'Survey von 7.600 Managern, 262 Unternehmen. 61% der Executives sagen "Strategy-to-Performance Gap" ist größtes Problem.')
                  }
                ].map((source, index) => (
                  <div key={index} className="rounded-lg p-4 md:p-5" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                    <div className="flex items-start gap-3 md:gap-4">
                      <span className="inline-block font-bold px-2 py-1 rounded text-xs flex-shrink-0" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
                        {source.number}
                      </span>
                      <div>
                        <p className="font-bold text-sm md:text-base mb-1" style={{ color: '#000000' }}>
                          {source.authors}
                        </p>
                        <p className="italic text-sm mb-2" style={{ color: 'rgba(0,0,0,0.6)' }}>
                          {source.title}
                        </p>
                        <p className="text-sm" style={{ color: 'rgba(0,0,0,0.8)' }}>
                          <strong>Kernfindung:</strong> {source.finding}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 2: Systemic Excellence */}
            <div className="rounded-xl p-6 md:p-8 border-2" style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.1)' }}>
              <h4 className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#000000' }}>
                II. {config.get('sources.cat2.title', 'Systemische Überlegenheit vs. Experten-Wissen')}
              </h4>
              <div className="space-y-4">
                {[
                  {
                    number: '[4]',
                    authors: 'Schwaninger, Markus (2009)',
                    title: 'Intelligent Organizations: Powerful Models for Systemic Management',
                    finding: config.get('sources.cat2.s1', 'Systemische Organisationsentwicklung erreicht 85% höhere Langfrist-Performance als isolierte Einzelmaßnahmen.')
                  },
                  {
                    number: '[5]',
                    authors: 'Kotter, John P. (1995)',
                    title: 'Leading Change: Why Transformation Efforts Fail',
                    finding: config.get('sources.cat2.s2', '70% der Change-Projekte scheitern. Erfolgreiche folgen 8-Stufen-Modell mit systematischer Verankerung.')
                  }
                ].map((source, index) => (
                  <div key={index} className="rounded-lg p-4 md:p-5" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                    <div className="flex items-start gap-3 md:gap-4">
                      <span className="inline-block font-bold px-2 py-1 rounded text-xs flex-shrink-0" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
                        {source.number}
                      </span>
                      <div>
                        <p className="font-bold text-sm md:text-base mb-1" style={{ color: '#000000' }}>
                          {source.authors}
                        </p>
                        <p className="italic text-sm mb-2" style={{ color: 'rgba(0,0,0,0.6)' }}>
                          {source.title}
                        </p>
                        <p className="text-sm" style={{ color: 'rgba(0,0,0,0.8)' }}>
                          <strong>Kernfindung:</strong> {source.finding}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Methodology Excellence */}
      <Section spacing="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-center" style={{ color: '#000000' }}>
              {config.get('methodology.title', 'Methodologische Excellence')}
            </h2>
            <p className="text-lg md:text-xl mb-12 text-center max-w-4xl mx-auto" style={{ color: 'rgba(0,0,0,0.7)' }}>
              {config.get('methodology.intro', 'Die Eckert-Preisser-Methodik kombiniert drei wissenschaftliche Fundamente:')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  num: '01',
                  title: config.get('methodology.academic.title', 'Akademische Exzellenz'),
                  desc: config.get('methodology.academic.desc', '25+ peer-reviewed Quellen aus Harvard Business School, Stanford GSB, McKinsey Global Institute.')
                },
                {
                  num: '02',
                  title: config.get('methodology.fraunhofer.title', 'Fraunhofer-Systematik'),
                  desc: config.get('methodology.fraunhofer.desc', '6 Jahre Forschung am Fraunhofer IPA zu Technology-Implementation-Patterns (1981-1986).')
                },
                {
                  num: '03',
                  title: config.get('methodology.validation.title', '16-Jahres-Validierung'),
                  desc: config.get('methodology.validation.desc', 'ZOLLERN Hidden Champion Case: Längste dokumentierte Performance-Architecture-Begleitung.')
                },
                {
                  num: '04',
                  title: config.get('methodology.finland.title', 'Finnland-Modell'),
                  desc: config.get('methodology.finland.desc', 'Wissenschaftliche Analyse des Finnland-Basketball-Erfolgs.')
                },
                {
                  num: '05',
                  title: config.get('methodology.malik.title', 'Malik-Kybernetik'),
                  desc: config.get('methodology.malik.desc', 'Integration von Schwaningers systemischen Ansätzen: 85% höhere Langfrist-Performance.')
                },
                {
                  num: '06',
                  title: config.get('methodology.ceo.title', 'CEO-Transformation'),
                  desc: config.get('methodology.ceo.desc', 'McKinsey 2017: Face-to-face Coaching korreliert mit 47% höherer Langfrist-Performance.')
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-2 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                  style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.1)' }}
                >
                  <span className="text-4xl font-black mb-3 block" style={{ color: 'rgba(0,0,0,0.2)' }}>{item.num}</span>
                  <h4 className="text-lg font-bold mb-3" style={{ color: '#000000' }}>{item.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.7)' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Transparency & Limitations */}
      <Section spacing="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-12 text-center" style={{ color: '#000000' }}>
              {config.get('transparency.title', 'Transparenz & Limitation')}
            </h2>

            <div className="rounded-xl p-6 md:p-8 mb-6 border-2" style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.1)' }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#000000' }}>
                {config.get('transparency.strengths', 'Stärken der Validierung:')}
              </h3>
              <ul className="space-y-3 text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.8)' }}>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0" style={{ color: '#000000' }}>+</span>
                  <span>{config.get('transparency.s1', '27 peer-reviewed Quellen aus führenden Journals')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0" style={{ color: '#000000' }}>+</span>
                  <span>{config.get('transparency.s2', 'Gesamt-Stichprobe: 3.000+ Unternehmen über 30 Jahre')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0" style={{ color: '#000000' }}>+</span>
                  <span>{config.get('transparency.s3', 'Jeder Kern-Parameter mit mindestens 2 unabhängigen Studien validiert')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0" style={{ color: '#000000' }}>+</span>
                  <span>{config.get('transparency.s4', 'Konservative Schätzungen wo Range existiert')}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl p-6 md:p-8 border-2" style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.1)' }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#000000' }}>
                {config.get('transparency.limitations', 'Limitationen & kritische Reflexion:')}
              </h3>
              <ul className="space-y-3 text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.8)' }}>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0" style={{ color: 'rgba(0,0,0,0.5)' }}>!</span>
                  <span><strong>Malik-Systematik:</strong> {config.get('transparency.l1', 'Keine quantifizierten Erfolgsraten in peer-reviewed Journals. Validierung durch Proxy.')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0" style={{ color: 'rgba(0,0,0,0.5)' }}>!</span>
                  <span><strong>ZOLLERN-Case:</strong> {config.get('transparency.l2', 'Single-Case-Study, nicht multi-site validiert. Aber: 16-Jahres-Dokumentation deutlich länger als typische 3-5-Jahres-Cases.')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0" style={{ color: 'rgba(0,0,0,0.5)' }}>!</span>
                  <span><strong>Finnland-Basketball:</strong> {config.get('transparency.l3', 'Sport-zu-Business-Transfer bedarf methodischer Vorsicht.')}</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Conclusion */}
      <Section spacing="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 text-center" style={{ color: '#000000' }}>
              {config.get('conclusion.title', 'Fazit: Wissenschaftliche Robustheit')}
            </h2>

            <div className="rounded-xl p-6 md:p-10 shadow-xl border-2" style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.1)' }}>
              <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: 'rgba(0,0,0,0.8)' }}>
                {config.get('conclusion.text1', 'Die Eckert-Preisser-Methodik basiert auf solider wissenschaftlicher Evidenz aus 27 peer-reviewed Quellen. Alle Kern-Parameter sind entweder direkt empirisch validiert oder konservativ aus etablierter Management-Forschung extrapoliert.')}
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: 'rgba(0,0,0,0.8)' }}>
                {config.get('conclusion.text2', 'Die Transparenz-Garantie: Jede Aussage ist mit Primärquellen belegt.')}
              </p>

              <div className="rounded-lg p-6" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                <p className="text-lg font-bold mb-3" style={{ color: '#000000' }}>
                  {config.get('conclusion.recommendation', 'Empfehlung')}
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.8)' }}>
                  {config.get('conclusion.recommendation.text', 'Mit 16 Jahren praktischer Validierung und 27 akademischen Primärquellen ist sie die einzige wissenschaftlich fundierte Performance-Architecture-Methodik im deutschen Mittelstand.')}
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section spacing="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4" style={{ color: '#000000' }}>
              {config.get('cta.title', 'Überzeugt von der wissenschaftlichen Fundierung?')}
            </h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto" style={{ color: 'rgba(0,0,0,0.7)' }}>
              {config.get('cta.subtitle', 'Erfahren Sie, wie die Eckert-Preisser-Methodik auch Ihr Unternehmen transformieren kann.')}
            </p>
            <Link
              to="/contact"
              className="inline-block px-12 py-5 rounded-full font-bold text-lg hover:shadow-apple-glow hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: '#000000', color: '#FFFFFF' }}
            >
              {config.get('cta.button', 'Jetzt Gespräch vereinbaren')}
            </Link>
          </motion.div>
        </Container>
      </Section>

      {/* Bottom Spacer */}
      <div className="h-20 md:h-32" />
    </div>
  )
}

export default WissenschaftlicheFundierung
