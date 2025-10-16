/**
 * Datenschutz Page (Privacy Policy)
 *
 * DSGVO-compliant privacy policy
 * Content from old EckertPreisser project
 * CRITICAL: Main sections use i18n system (DE/EN)
 */

import { Container } from '../../../shared/ui-components/Container'
import { useTranslation } from '@eckert-preisser/shared/hooks'

const Datenschutz = () => {
  const { t } = useTranslation()

  return (
    <div className="pt-32 pb-20 bg-eckert-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-4 text-black">{t('datenschutz.title')}</h1>
          <p className="text-black/60 mb-12">
            {t('datenschutz.updated')}: {new Date().toLocaleDateString('de-DE')}
          </p>

          <div className="space-y-10">
            {/* Section 1 - Datenschutz auf einen Blick */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('datenschutz.section1.title')}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('datenschutz.general.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('datenschutz.general.content')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('datenschutz.collection.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed mb-3">
                      <span className="font-semibold text-black">{t('datenschutz.collection.who')}</span>
                    </p>
                    <p className="text-black/70 leading-relaxed mb-4">
                      {t('datenschutz.collection.who.answer')}
                    </p>

                    <p className="text-black/70 leading-relaxed mb-3">
                      <span className="font-semibold text-black">{t('datenschutz.collection.how')}</span>
                    </p>
                    <p className="text-black/70 leading-relaxed mb-4">
                      {t('datenschutz.collection.how.answer1')}
                    </p>
                    <p className="text-black/70 leading-relaxed mb-4">
                      {t('datenschutz.collection.how.answer2')}
                    </p>

                    <p className="text-black/70 leading-relaxed mb-3">
                      <span className="font-semibold text-black">{t('datenschutz.collection.why')}</span>
                    </p>
                    <p className="text-black/70 leading-relaxed mb-4">
                      {t('datenschutz.collection.why.answer')}
                    </p>

                    <p className="text-black/70 leading-relaxed mb-3">
                      <span className="font-semibold text-black">{t('datenschutz.collection.rights')}</span>
                    </p>
                    <p className="text-black/70 leading-relaxed">
                      {t('datenschutz.collection.rights.answer')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 - Hosting */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('datenschutz.section2.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70 leading-relaxed mb-3">
                  <span className="font-semibold text-black">{t('datenschutz.hosting.subtitle')}</span>
                </p>
                <p className="text-black/70 leading-relaxed">
                  {t('datenschutz.hosting.content1')}
                </p>
                <p className="text-black/70 leading-relaxed mt-3">
                  {t('datenschutz.hosting.content2')}
                </p>
              </div>
            </section>

            {/* Section 3 - Allgemeine Hinweise */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('datenschutz.section3.title')}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('datenschutz.privacy.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('datenschutz.privacy.content1')}
                    </p>
                    <p className="text-black/70 leading-relaxed mt-3">
                      {t('datenschutz.privacy.content2')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('datenschutz.responsible.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed mb-3">
                      {t('datenschutz.responsible.content1')}
                    </p>
                    {t('datenschutz.responsible.company').split('\n').map((line, i) => (
                      <p key={`company-${i}`} className="text-black/70">{line}</p>
                    ))}
                    <p className="text-black/70 mt-3 whitespace-pre-line">
                      {t('datenschutz.responsible.contact')}
                    </p>
                    <p className="text-black/70 leading-relaxed mt-4">
                      {t('datenschutz.responsible.content2')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('datenschutz.storage.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('datenschutz.storage.content')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('datenschutz.revocation.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('datenschutz.revocation.content')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('datenschutz.complaint.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('datenschutz.complaint.content')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('datenschutz.portability.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('datenschutz.portability.content')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('datenschutz.information.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('datenschutz.information.content')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('datenschutz.restriction.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('datenschutz.restriction.content')}
                    </p>
                    <ul className="list-disc list-inside text-black/70 mt-3 space-y-2">
                      <li>{t('datenschutz.restriction.case1')}</li>
                      <li>{t('datenschutz.restriction.case2')}</li>
                      <li>{t('datenschutz.restriction.case3')}</li>
                      <li>{t('datenschutz.restriction.case4')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 - Datenerfassung */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('datenschutz.section4.title')}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('datenschutz.cookies.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('datenschutz.section4.cookies.note')}{' '}
                      <a href="/cookie-policy" className="text-blue-600 hover:underline font-semibold">
                        {t('legal.cookies')}
                      </a>.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('datenschutz.serverlogs.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed mb-3">
                      {t('datenschutz.serverlogs.intro')}
                    </p>
                    <ul className="list-disc list-inside text-black/70 space-y-1">
                      {t('datenschutz.serverlogs.items').split('\n').map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <p className="text-black/70 leading-relaxed mt-4">
                      {t('datenschutz.serverlogs.content')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('datenschutz.contactform.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    {t('datenschutz.contactform.content').split('\n\n').map((para, i) => (
                      <p key={i} className={`text-black/70 leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('datenschutz.email.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    {t('datenschutz.email.content').split('\n\n').map((para, i) => (
                      <p key={i} className={`text-black/70 leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 - SSL/TLS */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('datenschutz.ssl.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70 leading-relaxed">
                  {t('datenschutz.ssl.content')}
                </p>
              </div>
            </section>

            {/* Section 6 - Änderungen */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('datenschutz.changes.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70 leading-relaxed">
                  {t('datenschutz.changes.content')}
                </p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Datenschutz
