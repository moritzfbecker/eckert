import { motion } from 'framer-motion'
import { useTranslation } from '@eckert-preisser/shared/hooks'
import { useState, useEffect } from 'react'

const Concept = () => {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('chapter1')

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
                {t('concept.sidebar.title')}
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
                    {t(chapter.titleKey)}
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
                {t(chapter.titleKey)}
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
                {t('concept.page.title')}
              </h1>
              <p className="text-xl md:text-2xl text-black/80">
                {t('concept.page.subtitle')}
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
                {t('concept.chapter1.title')}
              </h2>
              <p className="text-xl text-black/60 mb-8 italic">
                {t('concept.chapter1.subtitle')}
              </p>

              {/* Intro Text */}
              <div className="text-lg text-black/80 leading-relaxed mb-12">
                <p className="mb-6">{t('concept.chapter1.intro.p1')}</p>
                <p className="mb-6">
                  {t('concept.chapter1.intro.p2').split('Es ist nicht normal – es ist systematisch.')[0]}
                  <strong className="text-black">{t('concept.chapter1.intro.p2').split('Es ist nicht normal – es ist systematisch.')[1] ? 'Es ist nicht normal – es ist systematisch.' : t('concept.chapter1.intro.p2').match(/It's not normal.*$/)?.[0] || ''}</strong>
                </p>
                <p className="mb-6">{t('concept.chapter1.intro.p3')}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-black text-white rounded-lg p-8 hover:shadow-apple-glow transition-all duration-300">
                  <div className="text-5xl font-bold mb-3">{t('concept.chapter1.stat1.value')}</div>
                  <p className="text-white/90" dangerouslySetInnerHTML={{ __html: t('concept.chapter1.stat1.text').replace('66%', '<strong class="text-white">66%</strong>') }} />
                </div>
                <div className="bg-black text-white rounded-lg p-8 hover:shadow-apple-glow transition-all duration-300">
                  <div className="text-5xl font-bold mb-3">{t('concept.chapter1.stat2.value')}</div>
                  <p className="text-white/90" dangerouslySetInnerHTML={{ __html: t('concept.chapter1.stat2.text').replace('Coaching-Leverage', '<strong class="text-white">Coaching-Leverage</strong>') }} />
                </div>
                <div className="bg-black text-white rounded-lg p-8 hover:shadow-apple-glow transition-all duration-300">
                  <div className="text-5xl font-bold mb-3">{t('concept.chapter1.stat3.value')}</div>
                  <p className="text-white/90" dangerouslySetInnerHTML={{ __html: t('concept.chapter1.stat3.text').replace(/^(\w+)/, '<strong class="text-white">$1</strong>') }} />
                </div>
              </div>

              {/* Annahmen Header */}
              <h3 className="text-2xl font-bold text-black mb-6">
                {t('concept.chapter1.assumptions.title')}
              </h3>

              {/* Annahmen Cards */}
              <div className="space-y-6 mb-12">
                <div className="border-l-4 border-black pl-6">
                  <h4 className="text-lg font-bold text-black mb-2">
                    {t('concept.chapter1.assumption1.title')}
                  </h4>
                  <p className="text-black/80" dangerouslySetInnerHTML={{ __html: t('concept.chapter1.assumption1.reality').replace(/^(\w+[^:]+:)/, '<strong>$1</strong>') }} />
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h4 className="text-lg font-bold text-black mb-2">
                    {t('concept.chapter1.assumption2.title')}
                  </h4>
                  <p className="text-black/80" dangerouslySetInnerHTML={{ __html: t('concept.chapter1.assumption2.reality').replace(/^(\w+:)/, '<strong>$1</strong>') }} />
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h4 className="text-lg font-bold text-black mb-2">
                    {t('concept.chapter1.assumption3.title')}
                  </h4>
                  <p className="text-black/80" dangerouslySetInnerHTML={{ __html: t('concept.chapter1.assumption3.reality').replace(/^([^:]+:)/, '<strong>$1</strong>') }} />
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
                {t('concept.chapter2.title')}
              </h2>
              <p className="text-xl text-black/60 mb-8 italic">
                {t('concept.chapter2.subtitle')}
              </p>

              {/* Intro Text */}
              <div className="text-lg text-black/80 leading-relaxed mb-12">
                <p>{t('concept.chapter2.intro')}</p>
              </div>

              {/* Promises */}
              <div className="space-y-8 mb-12">
                {/* Promise 1 */}
                <div className="border-l-4 border-black pl-6">
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-5xl font-bold text-black/20 leading-none">
                      {t('concept.chapter2.promise1.number')}
                    </span>
                    <h3 className="text-2xl font-bold text-black pt-2">
                      {t('concept.chapter2.promise1.title')}
                    </h3>
                  </div>
                  <p className="text-black/80 whitespace-pre-line">
                    {t('concept.chapter2.promise1.text')}
                  </p>
                </div>

                {/* Promise 2 */}
                <div className="border-l-4 border-black pl-6">
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-5xl font-bold text-black/20 leading-none">
                      {t('concept.chapter2.promise2.number')}
                    </span>
                    <h3 className="text-2xl font-bold text-black pt-2">
                      {t('concept.chapter2.promise2.title')}
                    </h3>
                  </div>
                  <p className="text-black/80 whitespace-pre-line">
                    {t('concept.chapter2.promise2.text')}
                  </p>
                </div>

                {/* Promise 3 */}
                <div className="border-l-4 border-black pl-6">
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-5xl font-bold text-black/20 leading-none">
                      {t('concept.chapter2.promise3.number')}
                    </span>
                    <h3 className="text-2xl font-bold text-black pt-2">
                      {t('concept.chapter2.promise3.title')}
                    </h3>
                  </div>
                  <p className="text-black/80 whitespace-pre-line">
                    {t('concept.chapter2.promise3.text')}
                  </p>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-black text-white rounded-lg p-8 mb-12">
                <h3 className="text-2xl font-bold mb-4">
                  {t('concept.chapter2.conclusion.title')}
                </h3>
                <p className="text-white/90 leading-relaxed whitespace-pre-line">
                  {t('concept.chapter2.conclusion.text')}
                </p>
              </div>

              <div className="border-t border-black/10 mt-12" />
            </motion.section>

            {/* Other Chapters - Standard Layout */}
            {chapters.slice(2).map((chapter, index) => (
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
                  {t(`concept.${chapter.id}.title`)}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-black/80 leading-relaxed whitespace-pre-line">
                    {t(`concept.${chapter.id}.content`)}
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
