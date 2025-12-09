/**
 * Raketen-Start-Programm Page
 *
 * "FINNLAND IN 70 TAGEN" - Der wissenschaftlich fundierte Turbo-Einstieg
 * 10 Wochen Intensiv-Programm
 *
 * Features:
 * - 4-Phasen-Timeline (Akzeptanz-Modell)
 * - 5 Module detailliert
 * - Interaktiver ROI-Calculator
 * - Scientific Validation
 *
 * Category: 'raketen'
 * Design: Clean Black/White, Apple Gradient hover only
 */

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Container } from '../../../shared/ui-components/Container'
import { Section } from '../../../shared/ui-components/Section'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'
import { Link } from 'react-router-dom'

const RaketenStart = () => {
  const { language } = useTranslation()
  const config = useConfig('raketen', language)

  // ROI Calculator State
  const [revenue, setRevenue] = useState(50)
  const [employees, setEmployees] = useState(200)
  const [margin, setMargin] = useState(5)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({
    totalBenefit: 0,
    investment: 0,
    roi: 0,
    payback: '0',
    lighthouse: 0,
    productivity: 0,
    ceoTime: 50000,
    retention: 160000
  })

  const calculateROI = () => {
    const avgSalary = 65000
    const affectedEmployees = Math.min(employees * 0.5, 150)
    const productivityGain = (affectedEmployees * avgSalary * 0.20) * (10/52)
    const lighthouseProject = Math.min(150000 + (revenue - 50) * 5000, 500000)
    const ceoTime = 50000
    const retentionEffect = employees > 500 ? 240000 : 160000
    const totalBenefit = lighthouseProject + productivityGain + ceoTime + retentionEffect
    const investment = revenue < 100 ? 95000 : 150000
    const roi = ((totalBenefit - investment) / investment * 100)
    const payback = (investment / (totalBenefit / 10))

    setResults({
      totalBenefit: Math.round(totalBenefit),
      investment,
      roi: Math.round(roi),
      payback: payback.toFixed(1),
      lighthouse: Math.round(lighthouseProject),
      productivity: Math.round(productivityGain),
      ceoTime,
      retention: retentionEffect
    })
    setShowResults(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Section spacing="none" className="pt-40 md:pt-48 pb-20 md:pb-32 bg-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold mb-8"
            >
              {config.get('hero.badge', 'NEU: Der schnelle Einstieg ohne Langzeit-Commitment')}
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6">
              {config.get('hero.title.line1', 'Keine Zeit für 4 Jahre Change?')}<br/>
              <span className="relative">
                {config.get('hero.title.line2', 'Erste messbare Erfolge ')}
                <span className="bg-apple-gradient bg-clip-text text-transparent">
                  {config.get('hero.title.highlight', 'in 10 Wochen')}
                </span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-white/80 max-w-4xl mx-auto">
              {config.get('hero.subtitle', 'Das FINNLAND-70-TAGE-PROGRAMM: Wissenschaftlich fundierte Performance-Steigerung mit sichtbaren Ergebnissen - ohne jahrelange Berater-Abhängigkeit.')}
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <a
                href="#roi-rechner"
                className="inline-block bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:shadow-apple-glow hover:scale-105 transition-all duration-300"
              >
                {config.get('hero.cta1', '10-Wochen-Programm kennenlernen')}
              </a>
              <a
                href="#roi-rechner"
                className="inline-block bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                {config.get('hero.cta2', 'ROI-Rechner: Was bringt es mir?')}
              </a>
            </div>

            {/* Trust Metrics */}
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                config.get('hero.trust1', '563% ROI in 10 Wochen'),
                config.get('hero.trust2', 'Payback nach 1,5 Wochen'),
                config.get('hero.trust3', '25% der Langfrist-Wirkung sofort')
              ].map((metric, index) => (
                <div key={index} className="bg-white/10 px-5 py-2 rounded-lg text-sm font-medium">
                  {metric}
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* 4-Phasen-Timeline */}
      <Section spacing="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4 text-center">
              {config.get('phases.title', 'Die 4 Phasen des Programms')}
            </h2>
            <p className="text-lg md:text-xl text-black/70 mb-16 text-center max-w-3xl mx-auto">
              {config.get('phases.intro', 'Manager denken pragmatisch. Unser 10-Wochen-Programm folgt exakt dieser Psychologie - mit messbaren Erfolgen in jeder Phase.')}
            </p>

            <div className="space-y-6 max-w-5xl mx-auto">
              {[
                {
                  phase: '1',
                  question: config.get('phase1.question', 'Show Me The Numbers'),
                  timeframe: config.get('phase1.time', 'Woche 1-2'),
                  title: config.get('phase1.title', 'Strategic Assessment & Clarity'),
                  desc: config.get('phase1.desc', 'Wir diagnostizieren Ihren Performance-Gap mit kristallklarer Klarheit. Keine Vermutungen - harte Daten.'),
                  output: config.get('phase1.output', 'Performance-Gap-Report, Hidden-Talent-Matrix, Quick-Win-Roadmap')
                },
                {
                  phase: '2',
                  question: config.get('phase2.question', 'Prove It Works'),
                  timeframe: config.get('phase2.time', 'Woche 3-4'),
                  title: config.get('phase2.title', 'Measurable Value Creation'),
                  desc: config.get('phase2.desc', 'Erste messbare Erfolge nach 14 Tagen! Ihre Team-Performance steigt sichtbar - und Sie tracken es täglich.'),
                  output: config.get('phase2.output', 'Losada-Ratio 1,2:1 → 2,8:1 (+133%), +22% Mitarbeiter-Engagement')
                },
                {
                  phase: '3',
                  question: config.get('phase3.question', 'Make It Stick'),
                  timeframe: config.get('phase3.time', 'Woche 5-8'),
                  title: config.get('phase3.title', 'Systematic Implementation & Scale'),
                  desc: config.get('phase3.desc', '3-5 Ihrer "unsichtbaren" Stars übernehmen strategische Projekte. Das System läuft ohne permanenten CEO-Input.'),
                  output: config.get('phase3.output', '1 Leuchtturm-Projekt: €150k-€500k nachweisbarer Benefit')
                },
                {
                  phase: '4',
                  question: config.get('phase4.question', 'Your Call'),
                  timeframe: config.get('phase4.time', 'Woche 9-10'),
                  title: config.get('phase4.title', 'Long-Term Partnership Decision'),
                  desc: config.get('phase4.desc', 'Board-Ready-Präsentation mit ROI-Nachweis. Jetzt entscheiden SIE: Weiter mit Langfrist-Programm oder konsolidieren?'),
                  output: config.get('phase4.output', 'GO für 12-36 Monate oder Stop - ohne Vendor-Lock-In')
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 md:gap-6"
                >
                  {/* Phase Number */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-black">
                      {phase.phase}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white border-2 border-black/10 rounded-xl p-5 md:p-6 hover:border-black hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-wrap justify-between items-start mb-3">
                      <h3 className="text-xl md:text-2xl font-bold text-black">
                        {phase.question}
                      </h3>
                      <span className="text-sm font-semibold text-black/60 bg-black/5 px-3 py-1 rounded-full">
                        {phase.timeframe}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-black/80 mb-2">
                      {phase.title}
                    </h4>
                    <p className="text-base text-black/70 leading-relaxed mb-4">
                      {phase.desc}
                    </p>
                    <div className="bg-black/5 rounded-lg p-4">
                      <p className="text-sm text-black/80">
                        <strong>Output:</strong> {phase.output}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* 5 Module */}
      <Section spacing="lg" className="bg-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 text-center">
              {config.get('modules.title', 'Die 5 Module im Detail')}
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-16 text-center max-w-3xl mx-auto">
              {config.get('modules.intro', '5 wissenschaftlich validierte Module für maximale Wirkung in minimaler Zeit')}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  num: '01',
                  title: config.get('module1.title', 'Modul 1: Performance-Assessment'),
                  weeks: config.get('module1.weeks', 'Woche 1-2'),
                  desc: config.get('module1.desc', 'Kristallklare Diagnose Ihrer Organisation entlang der 3 Säulen: Strategie-Umsetzung, Talent-Utilization, Systemische Enabler.'),
                  output: config.get('module1.output', 'Performance-Gap-Report (15 Seiten), Hidden-Talent-Matrix, Baseline-Kennzahlen'),
                  ceo: config.get('module1.ceo', '6 Stunden CEO-Zeit')
                },
                {
                  num: '02',
                  title: config.get('module2.title', 'Modul 2: Losada-Leadership-Boost'),
                  weeks: config.get('module2.weeks', 'Woche 3-4'),
                  desc: config.get('module2.desc', 'Messbare Verbesserung der Team-Performance durch wissenschaftlich validierte Kommunikations-Optimierung. Losada-Ratio 3:1.'),
                  output: config.get('module2.output', 'Losada-Ratio von ∅1,2:1 auf ∅2,8:1 (+133%), +20-30% Engagement'),
                  ceo: config.get('module2.ceo', '30 Min/Tag (14 Tage)')
                },
                {
                  num: '03',
                  title: config.get('module3.title', 'Modul 3: Hidden-Talent-Aktivierung'),
                  weeks: config.get('module3.weeks', 'Woche 5-6'),
                  desc: config.get('module3.desc', 'Identifikation und Aktivierung von 3-5 "unsichtbaren" High-Performern. Übertragung strategischer Quick-Win-Projekte.'),
                  output: config.get('module3.output', '3-5 aktivierte Talents mit konkreten Projekten, €150k-€500k Impact'),
                  ceo: config.get('module3.ceo', '8 Stunden CEO-Zeit')
                },
                {
                  num: '04',
                  title: config.get('module4.title', 'Modul 4: Selbstläufer-Mechanismen'),
                  weeks: config.get('module4.weeks', 'Woche 7-8'),
                  desc: config.get('module4.desc', 'Installation von 3 Selbstläufer-Prozessen. Übergang von "CEO treibt" zu "System treibt". Performance-Architektur ohne CEO-Input.'),
                  output: config.get('module4.output', '3 installierte Mechanismen, SOPs dokumentiert, -35% CEO Firefighting-Zeit'),
                  ceo: config.get('module4.ceo', '6 Stunden CEO-Zeit')
                },
                {
                  num: '05',
                  title: config.get('module5.title', 'Modul 5: Leuchtturm-Projekt & Roll-Out'),
                  weeks: config.get('module5.weeks', 'Woche 9-10'),
                  desc: config.get('module5.desc', 'Sichtbares Vorzeige-Ergebnis für Board. Board-Ready-Präsentation. Entscheidung: Langfrist-Programm oder konsolidieren?'),
                  output: config.get('module5.output', '1 Leuchtturm abgeschlossen, Board-Präsentation (20 Slides), Skalierungsplan'),
                  ceo: config.get('module5.ceo', '4 Stunden CEO-Zeit')
                }
              ].map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-xl p-6 md:p-8 hover:shadow-apple-glow transition-all duration-300 ${index === 4 ? 'lg:col-span-2' : ''}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl font-black text-black/20">{module.num}</span>
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-xl font-bold text-black">{module.title}</h3>
                        <span className="text-xs font-semibold text-black/60 bg-black/5 px-3 py-1 rounded-full">
                          {module.weeks}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-base text-black/70 leading-relaxed mb-4">
                    {module.desc}
                  </p>
                  <div className="bg-black/5 rounded-lg p-4 mb-3">
                    <p className="text-sm text-black/80">
                      <strong>Output:</strong> {module.output}
                    </p>
                  </div>
                  <p className="text-sm text-black/60">
                    <strong>CEO-Aufwand:</strong> {module.ceo}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl text-white/80 font-bold">
                {config.get('modules.total', 'Gesamt CEO-Zeitaufwand: Nur 28 Stunden über 10 Wochen')}
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ROI Calculator */}
      <div id="roi-rechner">
        <Section spacing="lg">
          <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4 text-center">
              {config.get('calculator.title', 'ROI-Rechner: Was bringt das Programm Ihrem Unternehmen?')}
            </h2>
            <p className="text-lg md:text-xl text-black/70 mb-12 text-center">
              {config.get('calculator.intro', 'Geben Sie Ihre Unternehmenskennzahlen ein - wir berechnen Ihren erwarteten Benefit wissenschaftlich fundiert.')}
            </p>

            <div className="bg-white rounded-xl p-6 md:p-10 shadow-xl border-2 border-black/10">
              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-black mb-3">
                    {config.get('calculator.revenue', 'Jahresumsatz (Mio. €)')}
                  </label>
                  <input
                    type="number"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-lg text-lg font-semibold focus:border-black focus:outline-none transition-colors"
                    min="10"
                    max="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-3">
                    {config.get('calculator.employees', 'Anzahl Mitarbeiter')}
                  </label>
                  <input
                    type="number"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-lg text-lg font-semibold focus:border-black focus:outline-none transition-colors"
                    min="50"
                    max="5000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-3">
                    {config.get('calculator.margin', 'Umsatzrendite (%)')}
                  </label>
                  <input
                    type="number"
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-lg text-lg font-semibold focus:border-black focus:outline-none transition-colors"
                    min="1"
                    max="20"
                    step="0.5"
                  />
                </div>
              </div>

              <button
                onClick={calculateROI}
                className="w-full bg-black text-white px-8 py-5 rounded-full font-bold text-xl hover:shadow-apple-glow hover:scale-[1.02] transition-all duration-300"
              >
                {config.get('calculator.button', 'Benefit berechnen')}
              </button>

              {/* Results */}
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mt-12"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-black mb-8 text-center">
                    {config.get('calculator.results.title', 'Ihr erwarteter Benefit (10 Wochen)')}
                  </h3>

                  {/* Main Results Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-black text-white rounded-xl p-5 text-center">
                      <div className="text-xs font-semibold mb-1 text-white/70">Gesamt-Benefit</div>
                      <div className="text-2xl md:text-3xl font-black">€{results.totalBenefit.toLocaleString('de-DE')}</div>
                    </div>
                    <div className="bg-black text-white rounded-xl p-5 text-center">
                      <div className="text-xs font-semibold mb-1 text-white/70">Investment</div>
                      <div className="text-2xl md:text-3xl font-black">€{results.investment.toLocaleString('de-DE')}</div>
                    </div>
                    <div className="bg-black text-white rounded-xl p-5 text-center">
                      <div className="text-xs font-semibold mb-1 text-white/70">ROI</div>
                      <div className="text-2xl md:text-3xl font-black">{results.roi}%</div>
                    </div>
                    <div className="bg-black text-white rounded-xl p-5 text-center">
                      <div className="text-xs font-semibold mb-1 text-white/70">Payback</div>
                      <div className="text-2xl md:text-3xl font-black">{results.payback} Wo.</div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="bg-black/5 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-black mb-4">Benefit-Zusammensetzung:</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Leuchtturm-Projekt:', value: results.lighthouse },
                        { label: 'Produktivitätssteigerung:', value: results.productivity },
                        { label: 'CEO-Zeit-Freischaufeln:', value: results.ceoTime },
                        { label: 'Retention-Effekt:', value: results.retention }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-base text-black/70">{item.label}</span>
                          <span className="text-base font-bold text-black">€{item.value.toLocaleString('de-DE')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 text-center">
                    <p className="text-base text-black/70 mb-6">
                      {config.get('calculator.results.cta.text', 'Überzeugt? Lassen Sie uns in einem 30-Minuten-Gespräch Ihre spezifischen Quick Wins identifizieren.')}
                    </p>
                    <Link
                      to="/contact"
                      className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-apple-glow hover:scale-105 transition-all duration-300"
                    >
                      {config.get('calculator.results.cta.button', 'Jetzt Strategiegespräch buchen')}
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Disclaimer */}
            <p className="text-sm text-black/50 text-center mt-8">
              {config.get('calculator.disclaimer', 'Hinweis: Berechnung basiert auf wissenschaftlich validierten Durchschnittswerten (27 peer-reviewed Studien, 16-Jahres-ZOLLERN-Case). Individuelle Ergebnisse können variieren.')}
              {' '}
              <Link to="/wissenschaftliche-fundierung" className="text-black font-semibold hover:underline">
                {config.get('calculator.disclaimer.link', 'Wissenschaftliche Basis ansehen')}
              </Link>
            </p>
          </motion.div>
        </Container>
      </Section>
      </div>

      {/* Scientific Validation */}
      <Section spacing="lg" className="bg-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              {config.get('validation.title', 'Wissenschaftlich validiert')}
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-12">
              {config.get('validation.intro', 'Alle Aussagen und Parameter basieren auf 27 peer-reviewed Studien und 16 Jahren ZOLLERN Case-Dokumentation.')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: config.get('validation.source1', '27 Peer-Reviewed Quellen'),
                  desc: config.get('validation.source1.desc', 'Harvard, Stanford, McKinsey')
                },
                {
                  title: config.get('validation.source2', '16-Jahres-ZOLLERN-Case'),
                  desc: config.get('validation.source2.desc', 'Längste Performance-Dokumentation')
                },
                {
                  title: config.get('validation.source3', '3.000+ Unternehmen'),
                  desc: config.get('validation.source3.desc', '30 Jahre Forschungszeitraum')
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6">
                  <p className="text-xl font-black text-black mb-2">{item.title}</p>
                  <p className="text-sm text-black/60">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link
              to="/wissenschaftliche-fundierung"
              className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:shadow-apple-glow hover:scale-105 transition-all duration-300"
            >
              {config.get('validation.cta', 'Vollständige wissenschaftliche Fundierung ansehen')}
            </Link>
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
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-6">
              {config.get('final.title', 'Bereit für Finnland in 70 Tagen?')}
            </h2>
            <p className="text-lg md:text-xl text-black/70 mb-10">
              {config.get('final.subtitle', 'Starten Sie in 2 Wochen. Erste Erfolge nach 14 Tagen. Entscheidung nach 10 Wochen.')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-block bg-black text-white px-12 py-5 rounded-full font-bold text-lg hover:shadow-apple-glow hover:scale-105 transition-all duration-300"
              >
                {config.get('final.cta1', 'Strategiegespräch buchen (30 Min, kostenlos)')}
              </Link>
              <a
                href="#roi-rechner"
                className="inline-block bg-white text-black border-2 border-black px-12 py-5 rounded-full font-bold text-lg hover:bg-black hover:text-white transition-all duration-300"
              >
                {config.get('final.cta2', 'ROI nochmal berechnen')}
              </a>
            </div>

            <div className="mt-12 space-y-1 text-black/50 text-sm">
              <p>{config.get('final.footer1', 'Keine Langzeit-Bindung. Keine versteckten Kosten.')}</p>
              <p>{config.get('final.footer2', 'Nur ein wissenschaftlich fundiertes 10-Wochen-Programm mit messbaren Ergebnissen.')}</p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Bottom Spacer */}
      <div className="h-20 md:h-32" />
    </div>
  )
}

export default RaketenStart
