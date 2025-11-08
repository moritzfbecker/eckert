import { motion } from 'framer-motion'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'
import { useState, useEffect } from 'react'

/**
 * Concept Page - v2.0 Config API
 *
 * Uses NEW useConfig Hook with 'concept' category.
 * All Chapter 1 & 2 content with English defaults.
 * Language switches dynamically via Language Switcher.
 */
const Concept = () => {
  const [activeSection, setActiveSection] = useState('chapter1')

  // Get current language from I18nContext
  const { language } = useTranslation()

  // NEW v2.0: useConfig with 'concept' category and DYNAMIC language
  const config = useConfig('concept', language)

  // Kapitel mit IDs
  const chapters = [
    { id: 'chapter1', titleKey: 'concept.nav.chapter1' },
    { id: 'chapter2', titleKey: 'concept.nav.chapter2' },
    { id: 'chapter3', titleKey: 'concept.nav.chapter3' },
    { id: 'chapter4', titleKey: 'concept.nav.chapter4' },
    { id: 'chapter5', titleKey: 'concept.nav.chapter5' },
    { id: 'chapter6', titleKey: 'concept.nav.chapter6' },
    { id: 'chapter7', titleKey: 'concept.nav.chapter7' },
    { id: 'chapter8', titleKey: 'concept.nav.chapter8' },
    { id: 'chapter9', titleKey: 'concept.nav.chapter9' }
  ]

  // ScrollSpy - Detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = chapters.map(ch => document.getElementById(ch.id))
      const scrollPosition = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(chapters[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-eckert-white pt-24 md:pt-32 pb-20 overflow-x-hidden">
      <div className="flex gap-0 md:gap-8 px-0 md:px-6">
        {/* Desktop Sidebar - Sticky */}
        <aside className="
          hidden md:block
          w-72
          flex-shrink-0
        ">
          <div className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto">
            <div className="bg-black rounded-lg p-6">
              <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
                {config.get('concept.sidebar.title', 'Table of Contents')}
              </h2>
              <nav className="space-y-2">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => scrollToSection(chapter.id)}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg
                      transition-all duration-300
                      text-sm font-medium
                      ${activeSection === chapter.id
                        ? 'bg-white/10 text-white shadow-apple-glow'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {config.get(chapter.titleKey, `Chapter ${chapters.indexOf(chapter) + 1}`)}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full md:max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div>
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-black mb-4 md:mb-6">
                {config.get('concept.page.title', 'Our Concept')}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-black/80">
                {config.get('concept.page.subtitle', 'A new perspective on strategic HR consulting')}
              </p>
            </motion.div>

            {/* Chapter 1 - Special Visualization */}
            <motion.section
              id="chapter1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-12 md:mb-16 scroll-mt-32"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-3 md:mb-4">
                {config.get('concept.chapter1.title', 'The Hidden Crisis Your Board Meetings Don\'t Address')}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-black/60 mb-6 md:mb-8 italic">
                {config.get('concept.chapter1.subtitle', 'The pattern you probably already know – but haven\'t quantified yet')}
              </p>

              {/* Intro Text */}
              <div className="text-base md:text-lg text-black/80 leading-relaxed mb-8 md:mb-12">
                <p className="mb-4 md:mb-6">{config.get('concept.chapter1.intro.p1', 'Your last strategy consultation delivered a 300-page presentation. Brilliant analysis. Clear recommendations. 18 months later: 30% of recommendations implemented. The other 70% disappeared into organizational friction.')}</p>
                <p className="mb-4 md:mb-6">
                  {config.get('concept.chapter1.intro.p2', 'You thought that was normal. It\'s not normal � it\'s systematic.').split('Es ist nicht normal – es ist systematisch.')[0]}
                  <strong className="text-black">{config.get('concept.chapter1.intro.p2', 'You thought that was normal. It\'s not normal � it\'s systematic.').split('Es ist nicht normal – es ist systematisch.')[1] ? 'Es ist nicht normal – es ist systematisch.' : config.get('concept.chapter1.intro.p2', 'You thought that was normal. It\'s not normal � it\'s systematic.').match(/It's not normal.*$/)?.[0] || ''}</strong>
                </p>
                <p className="mb-4 md:mb-6">{config.get('concept.chapter1.intro.p3', 'What if the limiting factor isn\'t your strategy, but something that classical strategy consultancies systematically overlook?')}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                <div className="bg-black text-white rounded-lg p-6 md:p-8 hover:shadow-apple-glow transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold mb-2 md:mb-3">{config.get('concept.chapter1.stat1.value', '34%')}</div>
                  <p className="text-white/90" dangerouslySetInnerHTML={{ __html: config.get('concept.chapter1.stat1.text', 'of success is explained by budget. 66% remains unexplained.').replace('66%', '<strong class="text-white">66%</strong>') }} />
                </div>
                <div className="bg-black text-white rounded-lg p-6 md:p-8 hover:shadow-apple-glow transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold mb-2 md:mb-3">{config.get('concept.chapter1.stat2.value', '58%')}</div>
                  <p className="text-white/90" dangerouslySetInnerHTML={{ __html: config.get('concept.chapter1.stat2.text', 'of success correlates with Coaching-Leverage').replace('Coaching-Leverage', '<strong class="text-white">Coaching-Leverage</strong>') }} />
                </div>
                <div className="bg-black text-white rounded-lg p-6 md:p-8 hover:shadow-apple-glow transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold mb-2 md:mb-3">{config.get('concept.chapter1.stat3.value', '167%')}</div>
                  <p className="text-white/90" dangerouslySetInnerHTML={{ __html: config.get('concept.chapter1.stat3.text', 'efficiency advantage of systematic developers').replace(/^(\w+)/, '<strong class="text-white">$1</strong>') }} />
                </div>
              </div>

              {/* Annahmen Header */}
              <h3 className="text-xl md:text-2xl font-bold text-black mb-4 md:mb-6">
                {config.get('concept.chapter1.assumptions.title', 'The three assumptions sabotaging your resource allocation')}
              </h3>

              {/* Annahmen Cards */}
              <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                <div className="border-l-4 border-black pl-4 md:pl-6">
                  <h4 className="text-base md:text-lg font-bold text-black mb-2">
                    {config.get('concept.chapter1.assumption1.title', 'Assumption: Elite-Talent + Elite-Budget = Elite-Performance')}
                  </h4>
                  <p className="text-black/80" dangerouslySetInnerHTML={{ __html: config.get('concept.chapter1.assumption1.reality', 'Reality from 2025 EuroBasket: Finland reached 4th place. Spain eliminated in preliminary round.').replace(/^(\w+[^:]+:)/, '<strong>$1</strong>') }} />
                </div>

                <div className="border-l-4 border-black pl-4 md:pl-6">
                  <h4 className="text-base md:text-lg font-bold text-black mb-2">
                    {config.get('concept.chapter1.assumption2.title', 'Assumption: Best practices of market leaders should be copied')}
                  </h4>
                  <p className="text-black/80" dangerouslySetInnerHTML={{ __html: config.get('concept.chapter1.assumption2.reality', 'Reality: High-talent organizations systematically underperform.').replace(/^(\w+:)/, '<strong>$1</strong>') }} />
                </div>

                <div className="border-l-4 border-black pl-4 md:pl-6">
                  <h4 className="text-base md:text-lg font-bold text-black mb-2">
                    {config.get('concept.chapter1.assumption3.title', 'Assumption: ROI must be visible within 24 months')}
                  </h4>
                  <p className="text-black/80" dangerouslySetInnerHTML={{ __html: config.get('concept.chapter1.assumption3.reality', 'Reality: ZOLLERN Hidden Champion - 16 years, 8% margin contribution.').replace(/^([^:]+:)/, '<strong>$1</strong>') }} />
                </div>
              </div>

              <div className="border-t border-black/10 mt-12" />
            </motion.section>

            {/* Chapter 2 - Three Promises */}
            <motion.section
              id="chapter2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-12 md:mb-16 scroll-mt-32"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-3 md:mb-4">
                {config.get('concept.chapter2.title', 'Three Things We Promise You – And Why We Can Deliver Them')}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-black/60 mb-6 md:mb-8 italic">
                {config.get('concept.chapter2.subtitle', 'What distinguishes us from traditional strategy consultancies?')}
              </p>

              {/* Intro Text */}
              <div className="text-base md:text-lg text-black/80 leading-relaxed mb-8 md:mb-12">
                <p>{config.get('concept.chapter2.intro', 'We don\'t give you presentations. We give you three specific outcomes that traditional strategy consultancies cannot deliver.')}</p>
              </div>

              {/* Promises */}
              <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
                {/* Promise 1 */}
                <div className="border-l-4 border-black pl-4 md:pl-6">
                  <div className="flex items-start gap-3 md:gap-4 mb-3">
                    <span className="text-4xl md:text-5xl font-bold text-black/20 leading-none">
                      {config.get('concept.chapter2.promise1.number', '01')}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-black pt-1 md:pt-2">
                      {config.get('concept.chapter2.promise1.title', 'A New Perspective on Your Limiting Problem')}
                    </h3>
                  </div>
                  <p className="text-black/80 whitespace-pre-line">
                    {config.get('concept.chapter2.promise1.text', 'The problem you cannot see: Traditional strategy consultancies analyze what you already know.')}
                  </p>
                </div>

                {/* Promise 2 */}
                <div className="border-l-4 border-black pl-4 md:pl-6">
                  <div className="flex items-start gap-3 md:gap-4 mb-3">
                    <span className="text-4xl md:text-5xl font-bold text-black/20 leading-none">
                      {config.get('concept.chapter2.promise2.number', '02')}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-black pt-1 md:pt-2">
                      {config.get('concept.chapter2.promise2.title', 'Solutions for Problems You Haven\'t Explicitly Perceived Yet')}
                    </h3>
                  </div>
                  <p className="text-black/80 whitespace-pre-line">
                    {config.get('concept.chapter2.promise2.text', 'The Talent-Abundance-Paradox: You recruit MBA elite for €180k but invest only €1,200 per manager in development.')}
                  </p>
                </div>

                {/* Promise 3 */}
                <div className="border-l-4 border-black pl-4 md:pl-6">
                  <div className="flex items-start gap-3 md:gap-4 mb-3">
                    <span className="text-4xl md:text-5xl font-bold text-black/20 leading-none">
                      {config.get('concept.chapter2.promise3.number', '03')}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-black pt-1 md:pt-2">
                      {config.get('concept.chapter2.promise3.title', 'The Breakout from Stagnation Position')}
                    </h3>
                  </div>
                  <p className="text-black/80 whitespace-pre-line">
                    {config.get('concept.chapter2.promise3.text', 'When there seems to be no progress: You\'re #3 or #4 in your market. For 5 years.')}
                  </p>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-black text-white rounded-lg p-6 md:p-8 mb-8 md:mb-12">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                  {config.get('concept.chapter2.conclusion.title', 'Why These Three Promises Are Sustainable')}
                </h3>
                <p className="text-white/90 leading-relaxed whitespace-pre-line">
                  {config.get('concept.chapter2.conclusion.text', 'Traditional strategy consultancies deliver presentations with recommendations. Their methodology cannot structurally provide systematic anchoring.')}
                </p>
              </div>

              <div className="border-t border-black/10 mt-12" />
            </motion.section>

            {/* Chapter 3 - Science + Entrepreneurship */}
            <motion.section
              id="chapter3"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-16 scroll-mt-32"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {config.get('concept.chapter3.title', 'Science + Entrepreneurship: The Eckert-Preisser Methodology')}
              </h2>
              <p className="text-xl text-black/60 mb-8 italic">
                {config.get('concept.chapter3.subtitle', 'What distinguishes us from academic consultants and classical strategy consultancies')}
              </p>

              {/* Intro Text */}
              <div className="text-lg text-black/80 leading-relaxed mb-12">
                <p className="mb-6">
                  {config.get('concept.chapter3.intro.p1', 'Every concept we implement has been entrepreneurially developed and tested in our own companies over years.')}
                </p>
                <p className="mb-6">
                  {config.get('concept.chapter3.intro.p2', 'This creates a fundamental difference: We combine the scientific rigor of the Fraunhofer tradition (Peter Eckert\'s origin at IPA – Institute for Manufacturing Engineering and Automation) with entrepreneurial validation through real risk, real P&L responsibility, and real market proof.')}
                </p>
              </div>

              {/* Three Validation Levels Header */}
              <h3 className="text-2xl font-bold text-black mb-8">
                {config.get('concept.chapter3.validation.title', 'The Three Validation Levels of Our Methods')}
              </h3>

              {/* Validation Levels */}
              <div className="space-y-8 mb-12">
                {/* Level 1 - Scientific */}
                <div className="border-l-4 border-black pl-6">
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-5xl font-bold text-black/20 leading-none">
                      {config.get('concept.chapter3.level1.number', '01')}
                    </span>
                    <h4 className="text-2xl font-bold text-black pt-2">
                      {config.get('concept.chapter3.level1.title', 'Scientific Foundation')}
                    </h4>
                  </div>
                  <p className="text-black/80 mb-4">
                    {config.get('concept.chapter3.level1.subtitle', 'Fraunhofer Tradition: Systematic process analysis, cybernetic control mechanisms, documented measurement methodology.')}
                  </p>
                  <p className="text-black/70 whitespace-pre-line">
                    {config.get('concept.chapter3.level1.text', 'Our frameworks are not based on management fads, but on systems theory, cybernetics, and documented long-term patterns. The Finland analysis includes 153+ external sources – not gut feelings.')}
                  </p>
                </div>

                {/* Level 2 - Entrepreneurial */}
                <div className="border-l-4 border-black pl-6">
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-5xl font-bold text-black/20 leading-none">
                      {config.get('concept.chapter3.level2.number', '02')}
                    </span>
                    <h4 className="text-2xl font-bold text-black pt-2">
                      {config.get('concept.chapter3.level2.title', 'Entrepreneurial Validation')}
                    </h4>
                  </div>
                  <p className="text-black/80 mb-4">
                    {config.get('concept.chapter3.level2.subtitle', 'Skin in the Game: Every system was tested in our own companies with our own capital, our own risk, and our own P&L responsibility.')}
                  </p>
                  <p className="text-black/70 whitespace-pre-line">
                    {config.get('concept.chapter3.level2.text', 'We don\'t sell theories from textbooks. We implement systems that we ourselves have successfully operationalized under market conditions, with real competitive pressure and real employees.')}
                  </p>
                </div>

                {/* Level 3 - Long-term */}
                <div className="border-l-4 border-black pl-6">
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-5xl font-bold text-black/20 leading-none">
                      {config.get('concept.chapter3.level3.number', '03')}
                    </span>
                    <h4 className="text-2xl font-bold text-black pt-2">
                      {config.get('concept.chapter3.level3.title', 'Long-Term Validation')}
                    </h4>
                  </div>
                  <p className="text-black/80 mb-4">
                    {config.get('concept.chapter3.level3.subtitle', '16-Year Proof: Not 6-month quick wins, but documented performance patterns across economic cycles.')}
                  </p>
                  <p className="text-black/70 whitespace-pre-line">
                    {config.get('concept.chapter3.level3.text', 'While classical strategy consultancies disappear after presentation handover, we have accompanied and documented our systems through recessions, technology shifts, and management changes.')}
                  </p>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-black text-white rounded-lg p-6 md:p-8 mb-8 md:mb-12">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                  {config.get('concept.chapter3.conclusion.title', 'The Consequence of This Methodology')}
                </h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  {config.get('concept.chapter3.conclusion.text1', 'When a classical strategy consultancy sells you a framework, it comes from a case study with another client. When we sell you a framework, it comes from our own entrepreneurial validation – we built the system, operationalized it, defended it against competitors, and optimized it over years.')}
                </p>
                <p className="text-white/90 leading-relaxed font-bold text-xl">
                  {config.get('concept.chapter3.conclusion.text2', 'We don\'t consult about management. We are managers who consult.')}
                </p>
              </div>

              <div className="border-t border-black/10 mt-12" />
            </motion.section>

            {/* Chapter 4 - ZOLLERN Hidden Champion Validation */}
            <motion.section
              id="chapter4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-16 scroll-mt-32"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {config.get('concept.chapter4.title', '16-Year Performance Proof: The ZOLLERN Hidden Champion Validation')}
              </h2>
              <p className="text-xl text-black/60 mb-8 italic">
                {config.get('concept.chapter4.subtitle', 'What a rare long-term documentation reveals about consulting ROI')}
              </p>

              {/* Intro Text */}
              <div className="text-lg text-black/80 leading-relaxed mb-12">
                <p>
                  {config.get('concept.chapter4.intro', 'Peter Eckert\'s engagement at ZOLLERN (Hidden Champion, tool measurement/adjustment technology): 16 years of systematic support with a documented 8% contribution to pre-tax return on sales.')}
                </p>
              </div>

              {/* Stats Grid - ZOLLERN Proof */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-black text-white rounded-lg p-8 hover:shadow-apple-glow transition-all duration-300">
                  <div className="text-5xl font-bold mb-3">
                    {config.get('concept.chapter4.stat1.value', '16')}
                  </div>
                  <p className="text-white/90">
                    {config.get('concept.chapter4.stat1.text', 'years of systematic support').split('Wirtschaftszyklen')[0]}
                    <strong className="text-white block mt-1">
                      {config.get('concept.chapter4.stat1.highlight', 'Across multiple economic cycles')}
                    </strong>
                  </p>
                </div>

                <div className="bg-black text-white rounded-lg p-8 hover:shadow-apple-glow transition-all duration-300">
                  <div className="text-5xl font-bold mb-3">
                    {config.get('concept.chapter4.stat2.value', '8%')}
                  </div>
                  <p className="text-white/90">
                    {config.get('concept.chapter4.stat2.text', 'contribution to pre-tax return on sales').split('nachweisbar')[0]}
                    <strong className="text-white block mt-1">
                      {config.get('concept.chapter4.stat2.highlight', 'Documented and verifiable')}
                    </strong>
                  </p>
                </div>

                <div className="bg-black text-white rounded-lg p-8 hover:shadow-apple-glow transition-all duration-300">
                  <div className="text-5xl font-bold mb-3">
                    {config.get('concept.chapter4.stat3.value', 'Self-Running')}
                  </div>
                  <p className="text-white/90">
                    {config.get('concept.chapter4.stat3.text', 'CEO became Performance Enabler').split('Berater')[0]}
                    <strong className="text-white block mt-1">
                      {config.get('concept.chapter4.stat3.highlight', 'System runs independent of consultant')}
                    </strong>
                  </p>
                </div>
              </div>

              {/* Performance Curve Header */}
              <h3 className="text-2xl font-bold text-black mb-6">
                {config.get('concept.chapter4.curve.title', 'The ZOLLERN Performance Curve: From Foundation to Self-Running System')}
              </h3>
              <p className="text-lg text-black/70 mb-10">
                {config.get('concept.chapter4.curve.subtitle', 'What classical strategy consultancies cannot show – because they don\'t experience it: Systematic performance architecture develops self-running qualities when CEOs become Performance Enablers.')}
              </p>

              {/* Three Phases Header */}
              <h3 className="text-2xl font-bold text-black mb-8">
                {config.get('concept.chapter4.phases.title', 'The Path to Self-Steering System')}
              </h3>

              {/* Three Phases */}
              <div className="space-y-8 mb-12">
                {/* Phase 1: Years 1-4 */}
                <div className="border-l-4 border-black pl-6">
                  <div className="flex items-start gap-4 mb-3">
                    <h4 className="text-2xl font-bold text-black">
                      {config.get('concept.chapter4.phase1.title', 'Years 1-4: Foundation & CEO Transformation')}
                    </h4>
                  </div>
                  <p className="text-black/80 mb-4 whitespace-pre-line">
                    {config.get('concept.chapter4.phase1.text', 'Implementation of the 3-pillar framework. In parallel: Intensive executive coaching of the CEO. The CEO acquires the role of Performance Enabler – learns how Malik\'s cybernetics works, how coaching leverage emerges, how systematization is anchored. Break-even reached in year 4.')}
                  </p>
                  <p className="text-sm text-black/50 italic">
                    {config.get('concept.chapter4.phase1.label', 'Year 1-4: CEO becomes Performance Enabler')}
                  </p>
                </div>

                {/* Phase 2: Years 5-8 */}
                <div className="border-l-4 border-black pl-6">
                  <div className="flex items-start gap-4 mb-3">
                    <h4 className="text-2xl font-bold text-black">
                      {config.get('concept.chapter4.phase2.title', 'Years 5-8: Systematic Anchoring & Consultant Withdrawal')}
                    </h4>
                  </div>
                  <p className="text-black/80 mb-4 whitespace-pre-line">
                    {config.get('concept.chapter4.phase2.text', 'The three pillars work synergistically. Crucial: The CEO has internalized the systematic approach. He now steers himself. We increasingly withdraw into the background – as at ZOLLERN. The system develops self-running qualities because it is anchored in minds and hearts.')}
                  </p>
                  <p className="text-sm text-black/50 italic">
                    {config.get('concept.chapter4.phase2.label', 'Years 5-8: Self-running qualities emerge')}
                  </p>
                </div>

                {/* Phase 3: Years 9-16 */}
                <div className="border-l-4 border-black pl-6">
                  <div className="flex items-start gap-4 mb-3">
                    <h4 className="text-2xl font-bold text-black">
                      {config.get('concept.chapter4.phase3.title', 'Years 9-16: Sustainable Excellence Without Intensive Support')}
                    </h4>
                  </div>
                  <p className="text-black/80 mb-4 whitespace-pre-line">
                    {config.get('concept.chapter4.phase3.text', 'The system runs independently. Management changes are survived without performance drops (because systematization is institutionalized, not person-dependent). The 2008 financial crisis is navigated. The cumulative 8% pre-tax return contribution over 16 years is documented – without us needing to be intensively present.')}
                  </p>
                  <p className="text-sm text-black/50 italic">
                    {config.get('concept.chapter4.phase3.label', 'Years 9-16: Self-steering')}
                  </p>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-black text-white rounded-lg p-6 md:p-8 mb-8 md:mb-12">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                  {config.get('concept.chapter4.conclusion.title', 'The Strategic Implication')}
                </h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  {config.get('concept.chapter4.conclusion.text1', 'We don\'t commit you to "9 years until peak". We accompany you until the CEO has become a Performance Enabler and the system has developed self-running qualities. At ZOLLERN, we largely withdrew after systematic anchoring – the system continued to run for years. That\'s the difference between presentations (which disappear) and systematization (which stays).')}
                </p>
              </div>

              <div className="border-t border-black/10 mt-12" />
            </motion.section>

            {/* Chapter 5 - 3-Pillar Framework */}
            <motion.section
              id="chapter5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-16 scroll-mt-32"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {config.get('concept.chapter5.title', 'The 3-Pillar Framework by Pfeiffer & Eckert: The ZOLLERN-Validated Performance Architecture')}
              </h2>
              <p className="text-xl text-black/60 mb-8 italic">
                {config.get('concept.chapter5.subtitle', 'The framework distilled from 16 years of ZOLLERN engagement')}
              </p>

              {/* Intro Text */}
              <div className="text-lg text-black/80 leading-relaxed mb-12">
                <p className="mb-6">
                  {config.get('concept.chapter5.intro.p1', 'This 3-pillar framework is not academic theory. It is the systematized essence of the ZOLLERN engagement: 16 years of practical application at a Hidden Champion, from which we extracted the effective mechanisms and formulated them as an explicit framework.')}
                </p>
                <p className="mb-6">
                  {config.get('concept.chapter5.intro.p2', 'The original engagement generated a measurable 8% pre-tax return contribution with developed self-running qualities. Through the further development of the methodology based on these empirical findings – with expanded tools and refined systematization – we can achieve 12% today: 50% more than in the original engagement.')}
                </p>
              </div>

              {/* Three Pillars */}
              <div className="space-y-10 mb-12">
                {/* Pillar 1 - Technology Portfolio */}
                <div className="bg-white rounded-lg p-8 border-l-4 border-black border border-black/10">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-5xl font-bold text-black/20 leading-none">
                      {config.get('concept.chapter5.pillar1.number', '01')}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-black mb-2">
                        {config.get('concept.chapter5.pillar1.title', 'Technology Portfolio')}
                      </h3>
                      <p className="text-sm text-black/50 italic mb-4">
                        {config.get('concept.chapter5.pillar1.author', '(by Pfeiffer)')}
                      </p>
                      <p className="text-lg text-black/80 mb-4">
                        {config.get('concept.chapter5.pillar1.description', 'Systematic technology positioning in the competitive environment')}
                      </p>
                      <p className="text-black/70 mb-4">
                        {config.get('concept.chapter5.pillar1.content', 'Portfolio management based on technology attractiveness vs. relative resource strength. Which technologies offer strategic advantage? Which are commodity?')}
                      </p>
                      <div className="bg-white p-4 rounded border border-black/10">
                        <p className="text-sm font-semibold text-black mb-1">
                          {config.get('concept.chapter5.pillar1.application.label', 'ZOLLERN Application:')}
                        </p>
                        <p className="text-sm text-black/70">
                          {config.get('concept.chapter5.pillar1.application.text', 'Systematic evaluation of automation solutions in tool measurement/adjustment technology.')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pillar 2 - Resource Strength */}
                <div className="bg-white rounded-lg p-8 border-l-4 border-black border border-black/10">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-5xl font-bold text-black/20 leading-none">
                      {config.get('concept.chapter5.pillar2.number', '02')}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-black mb-2">
                        {config.get('concept.chapter5.pillar2.title', 'Resource Strength')}
                      </h3>
                      <p className="text-sm text-black/50 italic mb-4">
                        {config.get('concept.chapter5.pillar2.author', '(by Pfeiffer)')}
                      </p>
                      <p className="text-lg text-black/80 mb-4">
                        {config.get('concept.chapter5.pillar2.description', 'The organizational capability for technology implementation')}
                      </p>
                      <p className="text-black/70 mb-4">
                        {config.get('concept.chapter5.pillar2.content', 'Where are our relative strengths? How do we maximize organizational capabilities? How do we translate technology potential into actual implementation?')}
                      </p>
                      <div className="bg-white p-4 rounded border border-black/10">
                        <p className="text-sm font-semibold text-black mb-1">
                          {config.get('concept.chapter5.pillar2.application.label', 'ZOLLERN Application:')}
                        </p>
                        <p className="text-sm text-black/70">
                          {config.get('concept.chapter5.pillar2.application.text', 'The IPA Pattern – 4x faster technology adoption through systematic resource strength development.')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pillar 3 - Human Performance Potential */}
                <div className="bg-white rounded-lg p-8 border-l-4 border-black border border-black/10">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-5xl font-bold text-black/20 leading-none">
                      {config.get('concept.chapter5.pillar3.number', '03')}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-black mb-2">
                        {config.get('concept.chapter5.pillar3.title', 'Human Performance Potential')}
                      </h3>
                      <p className="text-sm text-black/50 italic mb-4">
                        {config.get('concept.chapter5.pillar3.author', '(by Peter Eckert)')}
                      </p>
                      <p className="text-lg text-black/80 mb-6">
                        {config.get('concept.chapter5.pillar3.description', 'The integrated dimensions for sustainable performance transformation')}
                      </p>

                      {/* Sub-dimensions */}
                      <div className="space-y-4">
                        {/* 3.1 Ermöglicher */}
                        <div className="bg-white p-5 rounded border border-black/10">
                          <h4 className="text-lg font-bold text-black mb-2">
                            {config.get('concept.chapter5.pillar3.dim1.title', '3.1 Enablers (Eckert)')}
                          </h4>
                          <p className="text-sm text-black/70">
                            {config.get('concept.chapter5.pillar3.dim1.text', 'Workflow redesign, team architectures, decision mechanisms – the systems that translate technology into productivity.')}
                          </p>
                        </div>

                        {/* 3.2 Erfolgstechniken */}
                        <div className="bg-white p-5 rounded border border-black/10">
                          <h4 className="text-lg font-bold text-black mb-2">
                            {config.get('concept.chapter5.pillar3.dim2.title', '3.2 Success Techniques (Klopp/Alonso)')}
                          </h4>
                          <p className="text-sm text-black/70 mb-2">
                            <strong className="text-black">Klopp:</strong> {config.get('concept.chapter5.pillar3.dim2.klopp', 'Collective intelligence instead of star dependency.')}
                          </p>
                          <p className="text-sm text-black/70">
                            <strong className="text-black">Alonso:</strong> {config.get('concept.chapter5.pillar3.dim2.alonso', 'Underdog advantage through systematization.')}
                          </p>
                        </div>

                        {/* 3.3 Malik's Kybernetik */}
                        <div className="bg-white p-5 rounded border border-black/10">
                          <h4 className="text-lg font-bold text-black mb-2">
                            {config.get('concept.chapter5.pillar3.dim3.title', '3.3 Malik\'s Cybernetics')}
                          </h4>
                          <p className="text-sm text-black/70">
                            {config.get('concept.chapter5.pillar3.dim3.text', 'Functioning control loops, feedback mechanisms, steering systems. This is where CEOs become Performance Enablers.')}
                          </p>
                        </div>
                      </div>

                      {/* Application Box */}
                      <div className="bg-black text-white p-5 rounded mt-6">
                        <p className="text-sm font-semibold mb-2">
                          {config.get('concept.chapter5.pillar3.application.label', 'ZOLLERN Application:')}
                        </p>
                        <p className="text-sm text-white/90">
                          {config.get('concept.chapter5.pillar3.application.text', 'This integrated pillar is the heart. Here the transformation happens from presentation to performance, from heads to hearts of CEOs, from there through the entire organization – until self-running qualities emerge.')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-black/10 mt-12" />
            </motion.section>

            {/* Chapter 6 - Finland Revolution - 5 Key Insights */}
            <motion.section
              id="chapter6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-16 scroll-mt-32"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {config.get('concept.chapter6.title', 'The Five Key Insights from the Finland Revolution')}
              </h2>
              <p className="text-xl text-black/60 mb-8 italic">
                {config.get('concept.chapter6.subtitle', 'Why we are now guiding you through a basketball analysis')}
              </p>

              {/* Intro Text */}
              <div className="text-lg text-black/80 leading-relaxed mb-12">
                <p className="mb-6">
                  <strong className="text-black">
                    {config.get('concept.chapter6.intro.benefit.label', 'The benefit for you:')}
                  </strong> {config.get('concept.chapter6.intro.benefit.text', 'EuroBasket 2025 provides rare, quantifiable evidence for patterns that exist in your company – but are not measured. Finland shows over 16 years documented how systematization compensates for resource gaps. This is not an analogy. These are transferable mechanisms.')}
                </p>
                <p className="mb-6">
                  <strong className="text-black">
                    {config.get('concept.chapter6.intro.learning.label', 'What you will learn in the next 5 minutes:')}
                  </strong> {config.get('concept.chapter6.intro.learning.text', 'How coaching leverage explains 71% more performance variance than budget. Why high-talent organizations systematically underperform. How 16-year systematization generates 167% efficiency premium. And why these patterns worked at ZOLLERN for 16 years.')}
                </p>
              </div>

              {/* Five Insights */}
              <div className="space-y-10 mb-12">
                {/* Insight 1 - Budget ≠ Success */}
                <div className="border-l-4 border-black pl-6">
                  <h3 className="text-2xl font-bold text-black mb-3">
                    {config.get('concept.chapter6.insight1.title', 'INSIGHT 1: Budget ≠ Success (R² = 0.34)')}
                  </h3>
                  <p className="text-black/80 mb-4">
                    {config.get('concept.chapter6.insight1.text', 'Only 34% of performance variance is explained by budget. 66% remains unexplained – until you understand that coaching leverage, not capital intensity, is the decisive factor.')}
                  </p>
                  <div className="bg-white p-6 rounded-lg border border-black/10">
                    <p className="text-sm font-semibold text-black mb-2">
                      {config.get('concept.chapter6.insight1.implication.label', 'Implication for your organization:')}
                    </p>
                    <p className="text-sm text-black/70">
                      {config.get('concept.chapter6.insight1.implication.text', 'Your current budget allocation logic neglects the dominant success factor. While you invest another 20 million in technology infrastructure, you ignore the 200% ROI potential of systematic manager development architectures.')}
                    </p>
                  </div>
                </div>

                {/* Insight 2 - Coaching Leverage */}
                <div className="border-l-4 border-black pl-6">
                  <h3 className="text-2xl font-bold text-black mb-3">
                    {config.get('concept.chapter6.insight2.title', 'INSIGHT 2: Coaching Leverage Factor Exceeds Budget Correlation by 71%')}
                  </h3>
                  <p className="text-black/80 mb-4">
                    {config.get('concept.chapter6.insight2.text', 'Coaching leverage explains 58% of performance variance – 71% more than budget (34%). Finland\'s coaching leverage of 1.86 was 7x higher than Germany\'s 1.14.')}
                  </p>
                  <div className="bg-white p-6 rounded-lg border border-black/10">
                    <p className="text-sm font-semibold text-black mb-2">
                      {config.get('concept.chapter6.insight2.implication.label', 'Implication for your organization:')}
                    </p>
                    <p className="text-sm text-black/70">
                      {config.get('concept.chapter6.insight2.implication.text', 'Your HR strategy prioritizes talent acquisition over systematic competence development. You recruit MBA elite for €180,000 annual salary, but invest only €1,200 per manager in development. The inversion pattern is evident.')}
                    </p>
                  </div>
                </div>

                {/* Insight 3 - Underdog Advantage */}
                <div className="border-l-4 border-black pl-6">
                  <h3 className="text-2xl font-bold text-black mb-3">
                    {config.get('concept.chapter6.insight3.title', 'INSIGHT 3: Underdog Advantage Through Systematization is Reproducible')}
                  </h3>
                  <p className="text-black/80 mb-4">
                    {config.get('concept.chapter6.insight3.text', 'Finland outperformed expectations by +10 places over 16 years. Georgia +11, Portugal +6. All three: Systematic developers, not talent accumulators.')}
                  </p>
                  <div className="bg-white p-6 rounded-lg border border-black/10">
                    <p className="text-sm font-semibold text-black mb-2">
                      {config.get('concept.chapter6.insight3.implication.label', 'Implication for your organization:')}
                    </p>
                    <p className="text-sm text-black/70">
                      {config.get('concept.chapter6.insight3.implication.text', 'If you are not #1 or #2 in resources in your market, do NOT copy the strategies of market leaders. You need underdog systematization: 16-20h development per week, 65% coaching share, system-over-star KPIs.')}
                    </p>
                  </div>
                </div>

                {/* Insight 4 - Talent Abundance Paradox */}
                <div className="border-l-4 border-black pl-6">
                  <h3 className="text-2xl font-bold text-black mb-3">
                    {config.get('concept.chapter6.insight4.title', 'INSIGHT 4: The Talent Abundance Paradox is Real and Measurable')}
                  </h3>
                  <p className="text-black/80 mb-4">
                    {config.get('concept.chapter6.insight4.text', 'Spain (elite talent) underperformed by -13 places. Serbia (Jokić = best player in the world) by -6. Finland (weakest talent in semifinals) outperformed by +10.')}
                  </p>
                  <div className="bg-white p-6 rounded-lg border border-black/10">
                    <p className="text-sm font-semibold text-black mb-2">
                      {config.get('concept.chapter6.insight4.implication.label', 'Implication for your organization:')}
                    </p>
                    <p className="text-sm text-black/70">
                      {config.get('concept.chapter6.insight4.implication.text', 'Your "War for Talent" strategy could be counterproductive. Talent abundance leads to system neglect, star dependency, and lack of hunger motivation.')}
                    </p>
                  </div>
                </div>

                {/* Insight 5 - 16-Year Systematization */}
                <div className="border-l-4 border-black pl-6">
                  <h3 className="text-2xl font-bold text-black mb-3">
                    {config.get('concept.chapter6.insight5.title', 'INSIGHT 5: 16-Year Systematization Beats 2-Year Quick Wins')}
                  </h3>
                  <p className="text-black/80 mb-4">
                    {config.get('concept.chapter6.insight5.text', 'Finland: Only team with documented 16-year development. ROI break-even year 4. Cumulative performance increase: 8-12% per year (vs. industry standard 2-3%).')}
                  </p>
                  <div className="bg-white p-6 rounded-lg border border-black/10">
                    <p className="text-sm font-semibold text-black mb-2">
                      {config.get('concept.chapter6.insight5.implication.label', 'Implication for your organization:')}
                    </p>
                    <p className="text-sm text-black/70">
                      {config.get('concept.chapter6.insight5.implication.text', 'Your quarterly earnings focus prevents the implementation of the only strategies that generate documented 10x returns. As long as your board has 24-month ROI expectations, you remain trapped in the mediocrity trap.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transfer Conclusion */}
              <div className="bg-black text-white rounded-lg p-8 mb-12">
                <h3 className="text-2xl font-bold mb-4">
                  {config.get('concept.chapter6.transfer.title', 'The Transfer: Finland → ZOLLERN → Your Organization')}
                </h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  {config.get('concept.chapter6.transfer.text', 'Same patterns. Same systematization. Same 16-year methodology.')}
                </p>
                <p className="text-white/70 mt-4">
                  {config.get('concept.chapter6.transfer.examples', 'Finland in sports. ZOLLERN in industry. Documented. Measurable. Reproducible.')}
                </p>
              </div>

              <div className="border-t border-black/10 mt-12" />
            </motion.section>

            {/* Chapter 7 - Malik Approach */}
            <motion.section
              id="chapter7"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-16 scroll-mt-32"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {config.get('concept.chapter7.title', 'The Malik Approach: Why We Work According to Cybernetic Systematization')}
              </h2>
              <p className="text-xl text-black/60 mb-8 italic">
                {config.get('concept.chapter7.subtitle', 'The fundamental difference in consulting methodology')}
              </p>

              {/* Intro Text */}
              <div className="text-lg text-black/80 leading-relaxed mb-12">
                <p className="mb-6">
                  {config.get('concept.chapter7.intro.p1', 'Fredmund Malik\'s cybernetic management methodology achieves documented implementation success rates of over 85%. Classical strategy consultancies, focused on analytical excellence and presentation quality, typically achieve implementation rates around 30%.')}
                </p>
                <p className="mb-6">
                  {config.get('concept.chapter7.intro.p2', 'The difference is not in the intelligence of the consultants or the quality of the analysis. It lies in the fundamental approach: Presentation results vs. field performance.')}
                </p>
              </div>

              {/* Comparison Table Header */}
              <h3 className="text-2xl font-bold text-black mb-6">
                {config.get('concept.chapter7.comparison.title', 'The Structural Difference of Approaches')}
              </h3>

              {/* Comparison Table */}
              <div className="overflow-x-auto mb-12">
                <div className="bg-white rounded-lg border border-black/10 p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-black/20">
                        <th className="text-left py-4 px-4 font-bold text-black">
                          {config.get('concept.chapter7.table.header.dimension', 'Dimension')}
                        </th>
                        <th className="text-left py-4 px-4 font-bold text-black">
                          {config.get('concept.chapter7.table.header.classical', 'Classical Strategy Consulting')}
                        </th>
                        <th className="text-left py-4 px-4 font-bold text-black bg-black/5">
                          {config.get('concept.chapter7.table.header.malik', 'Malik Systematization (Eckert Preisser)')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {/* Row 1 - Main Focus */}
                      <tr className="border-b border-black/10">
                        <td className="py-4 px-4 font-semibold text-black align-top">
                          {config.get('concept.chapter7.table.row1.dimension', 'Main Focus')}
                        </td>
                        <td className="py-4 px-4 text-black/70 align-top">
                          {config.get('concept.chapter7.table.row1.classical', 'Strategic analysis & recommendation ("What should we do?")')}
                        </td>
                        <td className="py-4 px-4 text-black/70 bg-black/5 align-top">
                          {config.get('concept.chapter7.table.row1.malik', 'Implementation & cybernetic steering ("How do we do it and how do we steer continuously?")')}
                        </td>
                      </tr>

                      {/* Row 2 - End Product */}
                      <tr className="border-b border-black/10">
                        <td className="py-4 px-4 font-semibold text-black align-top">
                          {config.get('concept.chapter7.table.row2.dimension', 'End Product')}
                        </td>
                        <td className="py-4 px-4 text-black/70 align-top">
                          {config.get('concept.chapter7.table.row2.classical', 'Presentation with strategic recommendations\nDetailed roadmap')}
                        </td>
                        <td className="py-4 px-4 text-black/70 bg-black/5 align-top whitespace-pre-line">
                          {config.get('concept.chapter7.table.row2.malik', 'Functioning management systems\nCEO becomes Performance Enabler\nSelf-running, steered processes')}
                        </td>
                      </tr>

                      {/* Row 3 - Consultant Role */}
                      <tr className="border-b border-black/10">
                        <td className="py-4 px-4 font-semibold text-black align-top">
                          {config.get('concept.chapter7.table.row3.dimension', 'Consultant Role')}
                        </td>
                        <td className="py-4 px-4 text-black/70 align-top">
                          {config.get('concept.chapter7.table.row3.classical', 'External expert who delivers the answer\nProject-based')}
                        </td>
                        <td className="py-4 px-4 text-black/70 bg-black/5 align-top whitespace-pre-line">
                          {config.get('concept.chapter7.table.row3.malik', 'System architect who enables the CEO\nConsulting independence as explicit goal\nWithdrawal after systematization anchoring')}
                        </td>
                      </tr>

                      {/* Row 4 - Time Horizon */}
                      <tr className="border-b border-black/10">
                        <td className="py-4 px-4 font-semibold text-black align-top">
                          {config.get('concept.chapter7.table.row4.dimension', 'Time Horizon')}
                        </td>
                        <td className="py-4 px-4 text-black/70 align-top">
                          {config.get('concept.chapter7.table.row4.classical', 'Discrete project\n3-6 months typical')}
                        </td>
                        <td className="py-4 px-4 text-black/70 bg-black/5 align-top whitespace-pre-line">
                          {config.get('concept.chapter7.table.row4.malik', 'Support until self-running qualities\n16-year pattern (ZOLLERN)\nThen largely withdrawal')}
                        </td>
                      </tr>

                      {/* Row 5 - Implementation Philosophy */}
                      <tr>
                        <td className="py-4 px-4 font-semibold text-black align-top">
                          {config.get('concept.chapter7.table.row5.dimension', 'Implementation Philosophy')}
                        </td>
                        <td className="py-4 px-4 text-black/70 align-top">
                          {config.get('concept.chapter7.table.row5.classical', 'Good presentation results\nClient responsible for implementation')}
                        </td>
                        <td className="py-4 px-4 text-black/70 bg-black/5 align-top whitespace-pre-line">
                          {config.get('concept.chapter7.table.row5.malik', 'Results on the field\nCEO becomes Performance Enabler\nSystem continues after our withdrawal')}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* The Decisive Question */}
              <div className="bg-black text-white rounded-lg p-8 mb-12">
                <h3 className="text-2xl font-bold mb-6">
                  {config.get('concept.chapter7.question.title', 'The Decisive Question')}
                </h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  {config.get('concept.chapter7.question.option1', 'Do you want good presentation results that remain in the heads of some executives and may be partially implemented?')}
                </p>
                <p className="text-xl font-bold text-white leading-relaxed">
                  {config.get('concept.chapter7.question.option2', 'Or do you want functioning cybernetic steering systems that settle in the heads and hearts of your CEOs, make their way through the company from there, develop self-running qualities – and generate measurable performance over 16 years, even after we have largely withdrawn?')}
                </p>
              </div>

              <div className="border-t border-black/10 mt-12" />
            </motion.section>

            {/* Chapter 8 - Two Client Archetypes */}
            <motion.section
              id="chapter8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-16 scroll-mt-32"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {config.get('concept.chapter8.title', 'Two Client Archetypes')}
              </h2>
              <p className="text-xl text-black/60 mb-8 italic">
                {config.get('concept.chapter8.subtitle', 'Why different mandates require different structures')}
              </p>

              {/* Intro Text */}
              <div className="text-lg text-black/80 leading-relaxed mb-12">
                <p>
                  {config.get('concept.chapter8.intro', 'Like Private Banking differentiates between Ultra-High-Net-Worth and Affluent Clients, we distinguish between two fundamentally different consulting contexts.')}
                </p>
              </div>

              {/* Two Archetypes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Archetype 1 - Underdog Systematizers */}
                <div className="bg-white rounded-lg p-8 border-2 border-black/10">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {config.get('concept.chapter8.archetype1.title', 'Underdog Systematizers')}
                  </h3>
                  <p className="text-sm text-black/50 italic mb-6">
                    {config.get('concept.chapter8.archetype1.subtitle', 'For organizations #3-#7 in the market')}
                  </p>

                  {/* Profile */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-black mb-3">
                      {config.get('concept.chapter8.archetype1.profile.title', 'Profile:')}
                    </h4>
                    <ul className="space-y-2 text-sm text-black/70">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{config.get('concept.chapter8.archetype1.profile.item1', 'Your budget is 30-60% below the market leader')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{config.get('concept.chapter8.archetype1.profile.item2', 'Talent density is limited')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{config.get('concept.chapter8.archetype1.profile.item3', 'Best-practice copying doesn\'t work')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{config.get('concept.chapter8.archetype1.profile.item4', 'You seek underdog advantage through systematization')}</span>
                      </li>
                    </ul>
                  </div>

                  {/* What You Receive */}
                  <div className="bg-white p-5 rounded border border-black/10">
                    <h4 className="text-lg font-bold text-black mb-3">
                      {config.get('concept.chapter8.archetype1.receive.title', 'What You Receive:')}
                    </h4>
                    <p className="text-sm text-black/70">
                      {config.get('concept.chapter8.archetype1.receive.text', 'The Finland Framework: 16-year roadmap to market leadership despite resource gap. 167% efficiency premium. The 3-pillar framework that works independent of star performers.')}
                    </p>
                  </div>

                  {/* Access */}
                  <div className="mt-6 pt-4 border-t border-black/10">
                    <p className="text-sm">
                      <span className="font-bold text-black">
                        {config.get('concept.chapter8.archetype1.access.label', 'Access:')}
                      </span>
                      <span className="text-black/70 ml-2">
                        {config.get('concept.chapter8.archetype1.access.text', 'Direct mandating')}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Archetype 2 - Elite Transformers */}
                <div className="bg-black text-white rounded-lg p-8 border-2 border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {config.get('concept.chapter8.archetype2.title', 'Elite Transformers')}
                  </h3>
                  <p className="text-sm text-white/50 italic mb-6">
                    {config.get('concept.chapter8.archetype2.subtitle', 'For market leaders #1-#2')}
                  </p>

                  {/* Profile */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-white mb-3">
                      {config.get('concept.chapter8.archetype2.profile.title', 'Profile:')}
                    </h4>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{config.get('concept.chapter8.archetype2.profile.item1', 'Budget and talent pool are excellent')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{config.get('concept.chapter8.archetype2.profile.item2', 'Performance good – but not 10x better with 5x higher resources')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{config.get('concept.chapter8.archetype2.profile.item3', 'Talent abundance paradox recognizable')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{config.get('concept.chapter8.archetype2.profile.item4', 'Good presentation results, limited field performance')}</span>
                      </li>
                    </ul>
                  </div>

                  {/* What You Receive */}
                  <div className="bg-white/10 p-5 rounded border border-white/20">
                    <h4 className="text-lg font-bold text-white mb-3">
                      {config.get('concept.chapter8.archetype2.receive.title', 'What You Receive:')}
                    </h4>
                    <p className="text-sm text-white/90">
                      {config.get('concept.chapter8.archetype2.receive.text', 'System Resilience Engineering. Transformation from star dependency to collective intelligence. The 3-pillar framework with ZOLLERN proof: CEO becomes Performance Enabler, system develops self-running qualities.')}
                    </p>
                  </div>

                  {/* Access */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-sm">
                      <span className="font-bold text-white">
                        {config.get('concept.chapter8.archetype2.access.label', 'Access:')}
                      </span>
                      <span className="text-white/70 ml-2">
                        {config.get('concept.chapter8.archetype2.access.text', 'After passed CEO Leadership Assessment')}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-black/10 mt-12" />
            </motion.section>

            {/* Chapter 9 - FRLA Assessment */}
            <motion.section
              id="chapter9"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-16 scroll-mt-32"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {config.get('concept.chapter9.title', 'Finnish Revolution Leadership Assessment (FRLA)')}
              </h2>
              <p className="text-xl text-black/60 mb-8 italic">
                {config.get('concept.chapter9.subtitle', 'Required for Elite Transformer mandates. Tests whether you meet the fundamental prerequisites for 16-year vision implementation. <5% of all CEOs achieve 70+ points.')}
              </p>

              {/* Five Scenarios */}
              <div className="space-y-10 mb-12">
                {/* Scenario 1 - Investment Patience */}
                <div className="bg-white rounded-lg p-8 border-l-4 border-black border border-black/10">
                  <h3 className="text-xl font-bold text-black mb-4">
                    {config.get('concept.chapter9.scenario1.title', 'SCENARIO 1: Investment Patience Under Pressure')}
                  </h3>
                  <p className="text-black/80 mb-6">
                    {config.get('concept.chapter9.scenario1.question', 'Your company has invested 5-8% of revenue in talent development for 2 years. No measurable performance improvements. Board demands cuts. Your decision?')}
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario1.option1', 'Immediate 50% cut to secure board satisfaction')}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario1.option2', '25% cut with strategic focus adjustment')}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario1.option3', 'Continue with intensified monitoring')}
                      </p>
                    </div>
                    <div className="bg-black text-white p-4 rounded border border-white/20">
                      <p className="text-sm text-white/90">
                        ✅ {config.get('concept.chapter9.scenario1.option4', 'Continue + communicate 4-year milestones (ZOLLERN: Break-even year 4, then self-running qualities) + external audit + board education on documented long-term ROI patterns')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scenario 2 - Vision Horizon */}
                <div className="bg-white rounded-lg p-8 border-l-4 border-black border border-black/10">
                  <h3 className="text-xl font-bold text-black mb-4">
                    {config.get('concept.chapter9.scenario2.title', 'SCENARIO 2: Vision Horizon Definition')}
                  </h3>
                  <p className="text-black/80 mb-6">
                    {config.get('concept.chapter9.scenario2.question', 'You are hired as CEO. Stakeholders expect a strategy plan. Which horizon do you choose?')}
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario2.option1', '3-year plan (industry standard)')}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario2.option2', '5-year plan (ambitious)')}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario2.option3', '10-year plan (very long-term)')}
                      </p>
                    </div>
                    <div className="bg-black text-white p-4 rounded border border-white/20">
                      <p className="text-sm text-white/90">
                        ✅ {config.get('concept.chapter9.scenario2.option4', '16-year vision with 4-year review gates (ZOLLERN: 8% over 16 years), CEO role as Performance Enabler, system with self-running qualities after anchoring')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scenario 3 - CEO Role Definition */}
                <div className="bg-white rounded-lg p-8 border-l-4 border-black border border-black/10">
                  <h3 className="text-xl font-bold text-black mb-4">
                    {config.get('concept.chapter9.scenario3.title', 'SCENARIO 3: CEO Role Definition')}
                  </h3>
                  <p className="text-black/80 mb-6">
                    {config.get('concept.chapter9.scenario3.question', 'What do you understand as your role in systematic performance transformation?')}
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario3.option1', 'Consultants tell me what to do, I implement')}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario3.option2', 'I delegate transformation to my executive team')}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario3.option3', 'I am actively involved, but mainly as a sponsor')}
                      </p>
                    </div>
                    <div className="bg-black text-white p-4 rounded border border-white/20">
                      <p className="text-sm text-white/90">
                        ✅ {config.get('concept.chapter9.scenario3.option4', 'I become a Performance Enabler myself through executive coaching – learn Malik cybernetics, coaching leverage, systematization anchoring – until I can steer the system myself and consultants can withdraw')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scenario 4 - Underdog Mentality */}
                <div className="bg-white rounded-lg p-8 border-l-4 border-black border border-black/10">
                  <h3 className="text-xl font-bold text-black mb-4">
                    {config.get('concept.chapter9.scenario4.title', 'SCENARIO 4: Underdog Mentality vs. External Skepticism')}
                  </h3>
                  <p className="text-black/80 mb-6">
                    {config.get('concept.chapter9.scenario4.question', 'Analysts predict: "Your company has no chance in competition." How do you communicate internally?')}
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario4.option1', '"Be realistic, it will be difficult"')}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario4.option2', '"We\'ll try our best"')}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario4.option3', '"We can win if everything goes perfectly"')}
                      </p>
                    </div>
                    <div className="bg-black text-white p-4 rounded border border-white/20">
                      <p className="text-sm text-white/90">
                        ✅ {config.get('concept.chapter9.scenario4.option4', '"Nobody but us expects us to win. We KNOW we will win." + Establishment of systematic underdog advantage mechanisms (Finland, ZOLLERN) + Anchoring in heads & hearts of entire organization')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scenario 5 - System over Talent */}
                <div className="bg-white rounded-lg p-8 border-l-4 border-black border border-black/10">
                  <h3 className="text-xl font-bold text-black mb-4">
                    {config.get('concept.chapter9.scenario5.title', 'SCENARIO 5: System-over-Talent Prioritization')}
                  </h3>
                  <p className="text-black/80 mb-6">
                    {config.get('concept.chapter9.scenario5.question', '€500k for star performer recruitment OR €500k for 3-pillar framework development. Your decision?')}
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario5.option1', 'Hire star – elite talent is decisive')}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario5.option2', '50/50 split as compromise')}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-black/10">
                      <p className="text-sm text-black/70">
                        ❌ {config.get('concept.chapter9.scenario5.option3', 'Prefer team development')}
                      </p>
                    </div>
                    <div className="bg-black text-white p-4 rounded border border-white/20">
                      <p className="text-sm text-white/90">
                        ✅ {config.get('concept.chapter9.scenario5.option4', '100% 3-pillar framework (Technology Portfolio + Resource Strength + Human Performance) + Malik cybernetics + system designs with self-running qualities (Talent Abundance Paradox: Spain -13 vs Finland +10)')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assessment Conclusion */}
              <div className="bg-black text-white rounded-lg p-8 mb-12">
                <h3 className="text-2xl font-bold mb-4">
                  {config.get('concept.chapter9.conclusion.title', 'Assessment Evaluation')}
                </h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  {config.get('concept.chapter9.conclusion.text', 'If you selected all 5 black options (✅): You understand what distinguishes presentations from performance. You have the prerequisites for Elite Transformer mandates.')}
                </p>
                <p className="text-white/70 text-sm">
                  {config.get('concept.chapter9.conclusion.stats', 'Statistical Reality: <5% of all CEOs achieve 70+ points. The Finland Revolution requires what classical strategy consultancies don\'t test: 16-year vision capability.')}
                </p>
              </div>
            </motion.section>

            {/* Other Chapters - Standard Layout (None left!) */}
            {chapters.slice(9).map((chapter, index) => (
              <motion.section
                key={chapter.id}
                id={chapter.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className="mb-16 scroll-mt-32"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  {config.get(`concept.${chapter.id}.title`, `Chapter ${chapters.indexOf(chapter) + 1}`)}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-black/80 leading-relaxed whitespace-pre-line">
                    {config.get(`concept.${chapter.id}.content`, 'Content coming soon...')}
                  </p>
                </div>

                {/* Separator */}
                {index < chapters.length - 2 && (
                  <div className="mt-12 border-t border-black/10" />
                )}
              </motion.section>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Concept
