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
  const config = useConfig('impressum', language)

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
                  {config.get('impressum.provider.name', 'ECKERTPREISSER Personalberatung Partnerschaft')}
                </p>
                {config.get('impressum.provider.address', 'Im Burgstall 25\n74343 Sachsenheim\nDeutschland').split('\n').map((line, i) => (
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
                    {config.get('impressum.contact.phone', 'Telefon')}:
                  </span> {config.get('impressum.contact.phone.number', '+49 (0) 7147 960210')}
                </p>
                <p className="text-white/80">
                  <span className="font-semibold text-white">
                    {config.get('impressum.contact.email', 'E-Mail')}:
                  </span> {config.get('impressum.contact.email.address', 'kontakt@eckertpreisser.de')}
                </p>
                <p className="text-white/80">
                  <span className="font-semibold text-white">
                    {config.get('impressum.contact.website', 'Webseite')}:
                  </span> {config.get('impressum.contact.website.url', 'www.eckertpreisser.de')}
                </p>
              </div>
            </section>

            {/* Vertretungsberechtigte */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('impressum.representative.title', 'Vertretungsberechtigte')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10 space-y-2">
                <p className="text-white/80">
                  <span className="font-semibold text-white">Partner:</span> {config.get('impressum.representative.partner1', 'Peter Eckert')}
                </p>
                <p className="text-white/80">
                  <span className="font-semibold text-white">PartnerIn:</span> {config.get('impressum.representative.partner2', 'Margarete Eckert-Preisser')}
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
                    {config.get('impressum.register.court', 'Registergericht')}:
                  </span> {config.get('impressum.register.court.name', 'Amtsgericht Stuttgart')}
                </p>
                <p className="text-white/80">
                  <span className="font-semibold text-white">
                    {config.get('impressum.register.number', 'Registernummer')}:
                  </span> {config.get('impressum.register.number.value', 'PR 720497')}
                </p>
              </div>
            </section>

            {/* Umsatzsteuer-ID */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('impressum.vat.title', 'Umsatzsteuer-ID')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                <p className="text-white/80">
                  {config.get('impressum.vat.content', 'Umsatzsteuer-Identifikationsnummer § 27 a Umsatzsteuergesetz: DE298681715')}
                </p>
              </div>
            </section>

            {/* Verantwortlich für den Inhalt */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('impressum.responsible.title', 'Verantwortlich für den Inhalt')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                {config.get('impressum.responsible.content', 'Peter Eckert\nIm Burgstall 25\n74343 Sachsenheim').split('\n').map((line, i) => (
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

            {/* Bildnachweise und Quellen */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('impressum.sources.title', 'Bildnachweise und Quellen')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10 space-y-4">
                <p className="text-white/80 leading-relaxed">
                  {config.get('impressum.sources.intro', 'Alle auf dieser Webseite verwendeten Bilder, Grafiken und Quellen wurden entweder von uns erstellt oder werden unter entsprechenden Lizenzen verwendet. Quellen sind wo erforderlich explizit angegeben. Insbesondere sind dies:')}
                </p>
                <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                  <p className="text-white/80 leading-relaxed">
                    • {config.get('impressum.sources.source1', 'Fredmund Malik: Strategie des Managements komplexer Systeme, Haupt-Verlag 2015')}
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    • {config.get('impressum.sources.source2', 'W. Pfeiffer, G. Metze, W. Schneider, R. Amler: Technologie-Portfolio zum Management strategischer Zukunftsgeschäftsfelder. 1. Auflage. Göttingen 1982.')}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Impressum
