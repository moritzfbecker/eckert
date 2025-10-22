/**
 * Impressum Page - v2.0 Config API
 *
 * Legal notice page (required for German websites)
 * Category: 'legal'
 */

import { Container } from '../../../shared/ui-components/Container'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'

const Impressum = () => {
  const { language } = useTranslation()
  const config = useConfig('legal', language)

  return (
    <div className="pt-24 pb-20 bg-eckert-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-4 text-black">
            {config.get('impressum.title', 'Legal Notice')}
          </h1>
          <p className="text-black/60 mb-12">
            {config.get('impressum.subtitle', 'Information according to §5 TMG (German Telemedia Act)')}
          </p>

          <div className="space-y-10">
            {/* Anbieter */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('impressum.provider.title', 'Provider')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                <p className="font-semibold text-white">
                  {config.get('impressum.provider.name', 'Eckert Preisser GmbH')}
                </p>
                {config.get('impressum.provider.address', 'Musterstraße 123\n12345 Musterstadt\nGermany').split('\n').map((line, i) => (
                  <p key={i} className="text-white/80">{line}</p>
                ))}
              </div>
            </section>

            {/* Kontakt */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('impressum.contact.title', 'Contact')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10 space-y-2">
                <p className="text-white/80">
                  <span className="font-semibold text-white">
                    {config.get('impressum.contact.phone', 'Phone')}:
                  </span> +49 (0) 123 456789
                </p>
                <p className="text-white/80">
                  <span className="font-semibold text-white">
                    {config.get('impressum.contact.email', 'Email')}:
                  </span> info@eckertpreisser.de
                </p>
                <p className="text-white/80">
                  <span className="font-semibold text-white">
                    {config.get('impressum.contact.website', 'Website')}:
                  </span> www.eckertpreisser.de
                </p>
              </div>
            </section>

            {/* Vertretungsberechtigte */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('impressum.representative.title', 'Authorized Representatives')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                <p className="text-white/80">
                  {config.get('impressum.representative.content', 'Managing Director: Max Mustermann')}
                </p>
              </div>
            </section>

            {/* Registereintrag */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('impressum.register.title', 'Register Entry')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10 space-y-2">
                <p className="text-white/80">
                  <span className="font-semibold text-white">
                    {config.get('impressum.register.court', 'Register Court')}:
                  </span> Amtsgericht Musterstadt
                </p>
                <p className="text-white/80">
                  <span className="font-semibold text-white">
                    {config.get('impressum.register.number', 'Registration Number')}:
                  </span> HRB 12345
                </p>
              </div>
            </section>

            {/* Umsatzsteuer-ID */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('impressum.vat.title', 'VAT ID')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                <p className="text-white/80">
                  {config.get('impressum.vat.content', 'VAT identification number according to §27a Value Added Tax Act: DE123456789')}
                </p>
              </div>
            </section>

            {/* Verantwortlich für den Inhalt */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('impressum.responsible.title', 'Responsible for Content')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                {config.get('impressum.responsible.content', 'Max Mustermann\nMusterstraße 123\n12345 Musterstadt').split('\n').map((line, i) => (
                  <p key={i} className="text-white/80">{line}</p>
                ))}
              </div>
            </section>

            {/* Streitschlichtung */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('impressum.dispute.title', 'Dispute Resolution')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                <p className="text-white/80 leading-relaxed">
                  {config.get('impressum.dispute.content1', 'The European Commission provides a platform for online dispute resolution (ODR):')}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline ml-1"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="text-white/80 leading-relaxed mt-4">
                  {config.get('impressum.dispute.content2', 'We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.')}
                </p>
              </div>
            </section>

            {/* Haftungsausschluss */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('impressum.liability.title', 'Disclaimer')}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('impressum.liability.content.title', 'Liability for Content')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('impressum.liability.content.text1', 'As a service provider, we are responsible for our own content on these pages according to §7 para.1 TMG under general law. However, according to §§8 to 10 TMG, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.')}
                    </p>
                    <p className="text-white/80 leading-relaxed mt-3">
                      {config.get('impressum.liability.content.text2', 'Obligations to remove or block the use of information under general law remain unaffected. However, liability in this regard is only possible from the point in time at which knowledge of a specific infringement is obtained. Upon notification of corresponding violations, we will remove this content immediately.')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('impressum.liability.links.title', 'Liability for Links')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('impressum.liability.links.text1', 'Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages.')}
                    </p>
                    <p className="text-white/80 leading-relaxed mt-3">
                      {config.get('impressum.liability.links.text2', 'The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking. However, a permanent control of the contents of the linked pages is not reasonable without concrete evidence of a violation. Upon notification of violations, we will remove such links immediately.')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('impressum.copyright.title', 'Copyright')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('impressum.copyright.text1', 'The content and works created by the site operators on these pages are subject to German copyright law. The reproduction, editing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator.')}
                    </p>
                    <p className="text-white/80 leading-relaxed mt-3">
                      {config.get('impressum.copyright.text2', 'Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are observed. In particular, third-party content is marked as such. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. Upon notification of violations, we will remove such content immediately.')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Website Design & Development */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('impressum.design.title', 'Website Design & Development')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                <p className="text-white/80 leading-relaxed whitespace-pre-line">
                  {config.get('impressum.design.content', 'Website design, development, and implementation:\nMoritz F. Becker\nBecker Limited')}
                  <br />
                  <a
                    href="https://becker.limited"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    www.becker.limited
                  </a>
                </p>
                <p className="text-white/80 leading-relaxed mt-4">
                  {config.get('impressum.design.rights', 'All rights for design, concept, and implementation remain with Becker Limited.')}
                </p>
              </div>
            </section>

            {/* Bildnachweise */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('impressum.images.title', 'Image Credits')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                <p className="text-white/80 leading-relaxed">
                  {config.get('impressum.images.content', 'All images and graphics used on this website are either created by us or used under appropriate licenses. Sources are indicated where required.')}
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
