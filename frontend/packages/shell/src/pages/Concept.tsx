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
    <div className="min-h-screen bg-eckert-white pt-24 md:pt-32 pb-24 md:pb-20">
      <div className="flex gap-8 px-6">
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

        {/* Mobile Bottom Navigation - App Style */}
        <nav className="
          md:hidden fixed bottom-0 left-0 right-0
          bg-black/95 backdrop-blur-md border-t border-white/10
          z-40
          overflow-x-auto
        ">
          <div className="flex px-2 py-2 gap-1 min-w-max">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => scrollToSection(chapter.id)}
                className={`
                  px-4 py-2 rounded-lg
                  transition-all duration-300
                  text-xs font-medium whitespace-nowrap
                  ${activeSection === chapter.id
                    ? 'bg-white/10 text-white shadow-apple-glow'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {config.get(chapter.titleKey, `Chapter ${chapters.indexOf(chapter) + 1}`)}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-44">
          <div>
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
                {config.get('concept.page.title', 'Our Concept')}
              </h1>
              <p className="text-xl md:text-2xl text-black/80">
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
              className="mb-16 scroll-mt-32"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {config.get('concept.chapter1.title', 'The Hidden Crisis Your Board Meetings Don\'t Address')}
              </h2>
              <p className="text-xl text-black/60 mb-8 italic">
                {config.get('concept.chapter1.subtitle', 'The pattern you probably already know – but haven\'t quantified yet')}
              </p>

              {/* Intro Text */}
              <div className="text-lg text-black/80 leading-relaxed mb-12">
                <p className="mb-6">{config.get('concept.chapter1.intro.p1', 'Your last strategy consultation delivered a 300-page presentation. Brilliant analysis. Clear recommendations. 18 months later: 30% of recommendations implemented. The other 70% disappeared into organizational friction.')}</p>
                <p className="mb-6">
                  {config.get('concept.chapter1.intro.p2', 'You thought that was normal. It\'s not normal � it\'s systematic.').split('Es ist nicht normal – es ist systematisch.')[0]}
                  <strong className="text-black">{config.get('concept.chapter1.intro.p2', 'You thought that was normal. It\'s not normal � it\'s systematic.').split('Es ist nicht normal – es ist systematisch.')[1] ? 'Es ist nicht normal – es ist systematisch.' : config.get('concept.chapter1.intro.p2', 'You thought that was normal. It\'s not normal � it\'s systematic.').match(/It's not normal.*$/)?.[0] || ''}</strong>
                </p>
                <p className="mb-6">{config.get('concept.chapter1.intro.p3', 'What if the limiting factor isn\'t your strategy, but something that classical strategy consultancies systematically overlook?')}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-black text-white rounded-lg p-8 hover:shadow-apple-glow transition-all duration-300">
                  <div className="text-5xl font-bold mb-3">{config.get('concept.chapter1.stat1.value', '34%')}</div>
                  <p className="text-white/90" dangerouslySetInnerHTML={{ __html: config.get('concept.chapter1.stat1.text', 'of success is explained by budget. 66% remains unexplained.').replace('66%', '<strong class="text-white">66%</strong>') }} />
                </div>
                <div className="bg-black text-white rounded-lg p-8 hover:shadow-apple-glow transition-all duration-300">
                  <div className="text-5xl font-bold mb-3">{config.get('concept.chapter1.stat2.value', '58%')}</div>
                  <p className="text-white/90" dangerouslySetInnerHTML={{ __html: config.get('concept.chapter1.stat2.text', 'of success correlates with Coaching-Leverage').replace('Coaching-Leverage', '<strong class="text-white">Coaching-Leverage</strong>') }} />
                </div>
                <div className="bg-black text-white rounded-lg p-8 hover:shadow-apple-glow transition-all duration-300">
                  <div className="text-5xl font-bold mb-3">{config.get('concept.chapter1.stat3.value', '167%')}</div>
                  <p className="text-white/90" dangerouslySetInnerHTML={{ __html: config.get('concept.chapter1.stat3.text', 'efficiency advantage of systematic developers').replace(/^(\w+)/, '<strong class="text-white">$1</strong>') }} />
                </div>
              </div>

              {/* Annahmen Header */}
              <h3 className="text-2xl font-bold text-black mb-6">
                {config.get('concept.chapter1.assumptions.title', 'The three assumptions sabotaging your resource allocation')}
              </h3>

              {/* Annahmen Cards */}
              <div className="space-y-6 mb-12">
                <div className="border-l-4 border-black pl-6">
                  <h4 className="text-lg font-bold text-black mb-2">
                    {config.get('concept.chapter1.assumption1.title', 'Assumption: Elite-Talent + Elite-Budget = Elite-Performance')}
                  </h4>
                  <p className="text-black/80" dangerouslySetInnerHTML={{ __html: config.get('concept.chapter1.assumption1.reality', 'Reality from 2025 EuroBasket: Finland reached 4th place. Spain eliminated in preliminary round.').replace(/^(\w+[^:]+:)/, '<strong>$1</strong>') }} />
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h4 className="text-lg font-bold text-black mb-2">
                    {config.get('concept.chapter1.assumption2.title', 'Assumption: Best practices of market leaders should be copied')}
                  </h4>
                  <p className="text-black/80" dangerouslySetInnerHTML={{ __html: config.get('concept.chapter1.assumption2.reality', 'Reality: High-talent organizations systematically underperform.').replace(/^(\w+:)/, '<strong>$1</strong>') }} />
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h4 className="text-lg font-bold text-black mb-2">
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
              className="mb-16 scroll-mt-32"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {config.get('concept.chapter2.title', 'Three Things We Promise You – And Why We Can Deliver Them')}
              </h2>
              <p className="text-xl text-black/60 mb-8 italic">
                {config.get('concept.chapter2.subtitle', 'What distinguishes us from traditional strategy consultancies?')}
              </p>

              {/* Intro Text */}
              <div className="text-lg text-black/80 leading-relaxed mb-12">
                <p>{config.get('concept.chapter2.intro', 'We don\'t give you presentations. We give you three specific outcomes that traditional strategy consultancies cannot deliver.')}</p>
              </div>

              {/* Promises */}
              <div className="space-y-8 mb-12">
                {/* Promise 1 */}
                <div className="border-l-4 border-black pl-6">
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-5xl font-bold text-black/20 leading-none">
                      {config.get('concept.chapter2.promise1.number', '01')}
                    </span>
                    <h3 className="text-2xl font-bold text-black pt-2">
                      {config.get('concept.chapter2.promise1.title', 'A New Perspective on Your Limiting Problem')}
                    </h3>
                  </div>
                  <p className="text-black/80 whitespace-pre-line">
                    {config.get('concept.chapter2.promise1.text', 'The problem you cannot see: Traditional strategy consultancies analyze what you already know.')}
                  </p>
                </div>

                {/* Promise 2 */}
                <div className="border-l-4 border-black pl-6">
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-5xl font-bold text-black/20 leading-none">
                      {config.get('concept.chapter2.promise2.number', '02')}
                    </span>
                    <h3 className="text-2xl font-bold text-black pt-2">
                      {config.get('concept.chapter2.promise2.title', 'Solutions for Problems You Haven\'t Explicitly Perceived Yet')}
                    </h3>
                  </div>
                  <p className="text-black/80 whitespace-pre-line">
                    {config.get('concept.chapter2.promise2.text', 'The Talent-Abundance-Paradox: You recruit MBA elite for €180k but invest only €1,200 per manager in development.')}
                  </p>
                </div>

                {/* Promise 3 */}
                <div className="border-l-4 border-black pl-6">
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-5xl font-bold text-black/20 leading-none">
                      {config.get('concept.chapter2.promise3.number', '03')}
                    </span>
                    <h3 className="text-2xl font-bold text-black pt-2">
                      {config.get('concept.chapter2.promise3.title', 'The Breakout from Stagnation Position')}
                    </h3>
                  </div>
                  <p className="text-black/80 whitespace-pre-line">
                    {config.get('concept.chapter2.promise3.text', 'When there seems to be no progress: You\'re #3 or #4 in your market. For 5 years.')}
                  </p>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-black text-white rounded-lg p-8 mb-12">
                <h3 className="text-2xl font-bold mb-4">
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
              <div className="bg-black text-white rounded-lg p-8 mb-12">
                <h3 className="text-2xl font-bold mb-4">
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

            {/* Other Chapters - Standard Layout */}
            {chapters.slice(3).map((chapter, index) => (
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
