/**
 * Impressum Page
 *
 * Legal notice page (required for German websites)
 * Content from old EckertPreisser project
 * CRITICAL: ALL text uses i18n system (DE/EN)
 */

import { Container } from '../../../shared/ui-components/Container'
import { useTranslation } from '@eckert-preisser/shared/hooks'

const Impressum = () => {
  const { t } = useTranslation()

  return (
    <div className="pt-32 pb-20 bg-eckert-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-4 text-black">{t('impressum.title')}</h1>
          <p className="text-black/60 mb-12">{t('impressum.subtitle')}</p>

          <div className="space-y-10">
            {/* Anbieter */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('impressum.provider.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="font-semibold text-black">{t('impressum.provider.name')}</p>
                {t('impressum.provider.address').split('\n').map((line, i) => (
                  <p key={i} className="text-black/70">{line}</p>
                ))}
              </div>
            </section>

            {/* Kontakt */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('impressum.contact.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10 space-y-2">
                <p className="text-black/70">
                  <span className="font-semibold text-black">{t('impressum.contact.phone')}:</span> +49 (0) 123 456789
                </p>
                <p className="text-black/70">
                  <span className="font-semibold text-black">{t('impressum.contact.email')}:</span> info@eckertpreisser.de
                </p>
                <p className="text-black/70">
                  <span className="font-semibold text-black">{t('impressum.contact.website')}:</span> www.eckertpreisser.de
                </p>
              </div>
            </section>

            {/* Vertretungsberechtigte */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('impressum.representative.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70">{t('impressum.representative.content')}</p>
              </div>
            </section>

            {/* Registereintrag */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('impressum.register.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10 space-y-2">
                <p className="text-black/70">
                  <span className="font-semibold text-black">{t('impressum.register.court')}:</span> Amtsgericht Musterstadt
                </p>
                <p className="text-black/70">
                  <span className="font-semibold text-black">{t('impressum.register.number')}:</span> HRB 12345
                </p>
              </div>
            </section>

            {/* Umsatzsteuer-ID */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('impressum.vat.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70">{t('impressum.vat.content')}</p>
              </div>
            </section>

            {/* Verantwortlich für den Inhalt */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('impressum.responsible.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                {t('impressum.responsible.content').split('\n').map((line, i) => (
                  <p key={i} className="text-black/70">{line}</p>
                ))}
              </div>
            </section>

            {/* Streitschlichtung */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('impressum.dispute.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70 leading-relaxed">
                  {t('impressum.dispute.content1')}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="text-black/70 leading-relaxed mt-4">
                  {t('impressum.dispute.content2')}
                </p>
              </div>
            </section>

            {/* Haftungsausschluss */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('impressum.liability.title')}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('impressum.liability.content.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('impressum.liability.content.text1')}
                    </p>
                    <p className="text-black/70 leading-relaxed mt-3">
                      {t('impressum.liability.content.text2')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('impressum.liability.links.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('impressum.liability.links.text1')}
                    </p>
                    <p className="text-black/70 leading-relaxed mt-3">
                      {t('impressum.liability.links.text2')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('impressum.copyright.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('impressum.copyright.text1')}
                    </p>
                    <p className="text-black/70 leading-relaxed mt-3">
                      {t('impressum.copyright.text2')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Website Design & Development */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('impressum.design.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70 leading-relaxed whitespace-pre-line">
                  {t('impressum.design.content')}
                  <br />
                  <a
                    href="https://becker.limited"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    www.becker.limited
                  </a>
                </p>
                <p className="text-black/70 leading-relaxed mt-4">
                  {t('impressum.design.rights')}
                </p>
              </div>
            </section>

            {/* Bildnachweise */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('impressum.images.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70 leading-relaxed">
                  {t('impressum.images.content')}
                </p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Impressum
