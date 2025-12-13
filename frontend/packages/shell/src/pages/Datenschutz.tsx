/**
 * Datenschutz Page (Privacy Policy) - v2.0 Config API
 *
 * DSGVO-compliant privacy policy
 * Category: 'legal'
 */

import { Container } from '../../../shared/ui-components/Container'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'

const Datenschutz = () => {
  const { language } = useTranslation()
  const config = useConfig('privacypolicy', language)

  return (
    <div className="pt-24 pb-20 bg-eckert-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-4 text-black">
            {config.get('datenschutz.title', 'Privacy Policy')}
          </h1>
          <p className="text-black/60 mb-12">
            {config.get('datenschutz.updated', 'Last updated')}: {new Date().toLocaleDateString('en-US')}
          </p>

          <div className="space-y-10">
            {/* Section 1 - Datenschutz auf einen Blick */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('datenschutz.section1.title', '1. Data Protection at a Glance')}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('datenschutz.general.title', 'General Information')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('datenschutz.general.content', 'The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data by which you can be personally identified.')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('datenschutz.collection.title', 'Data Collection on this Website')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed mb-3">
                      <span className="font-semibold text-white">
                        {config.get('datenschutz.collection.who', 'Who is responsible for data collection on this website?')}
                      </span>
                    </p>
                    <p className="text-white/80 leading-relaxed mb-4">
                      {config.get('datenschutz.collection.who.answer', 'Data processing on this website is carried out by the website operator. You can find the operator\'s contact details in the section "Information about the responsible party" in this privacy policy.')}
                    </p>

                    <p className="text-white/80 leading-relaxed mb-3">
                      <span className="font-semibold text-white">
                        {config.get('datenschutz.collection.how', 'How do we collect your data?')}
                      </span>
                    </p>
                    <p className="text-white/80 leading-relaxed mb-4">
                      {config.get('datenschutz.collection.how.answer1', 'Your data is collected on the one hand by you providing it to us. This may be, for example, data that you enter in a contact form.')}
                    </p>
                    <p className="text-white/80 leading-relaxed mb-4">
                      {config.get('datenschutz.collection.how.answer2', 'Other data is collected automatically or with your consent by our IT systems when you visit the website. This is primarily technical data (e.g. internet browser, operating system or time of page view). This data is collected automatically as soon as you enter this website.')}
                    </p>

                    <p className="text-white/80 leading-relaxed mb-3">
                      <span className="font-semibold text-white">
                        {config.get('datenschutz.collection.why', 'What do we use your data for?')}
                      </span>
                    </p>
                    <p className="text-white/80 leading-relaxed mb-4">
                      {config.get('datenschutz.collection.why.answer', 'Some of the data is collected to ensure error-free provision of the website. Other data may be used to analyze your user behavior.')}
                    </p>

                    <p className="text-white/80 leading-relaxed mb-3">
                      <span className="font-semibold text-white">
                        {config.get('datenschutz.collection.rights', 'What rights do you have regarding your data?')}
                      </span>
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      {config.get('datenschutz.collection.rights.answer', 'You have the right to receive information about the origin, recipient and purpose of your stored personal data free of charge at any time. You also have the right to request the correction or deletion of this data. If you have given consent to data processing, you can revoke this consent at any time for the future. You also have the right to request the restriction of the processing of your personal data under certain circumstances.')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 - Hosting */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('datenschutz.section2.title', '2. Hosting')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                <p className="text-white/80 leading-relaxed mb-3">
                  <span className="font-semibold text-white">
                    {config.get('datenschutz.hosting.subtitle', 'External Hosting')}
                  </span>
                </p>
                <p className="text-white/80 leading-relaxed">
                  {config.get('datenschutz.hosting.content1', 'This website is hosted externally. The personal data collected on this website is stored on the servers of the hoster(s). This may include, in particular, IP addresses, contact requests, meta and communication data, contract data, contact details, names, website accesses and other data generated via a website.')}
                </p>
                <p className="text-white/80 leading-relaxed mt-3">
                  {config.get('datenschutz.hosting.content2', 'External hosting is carried out for the purpose of fulfilling contracts with our potential and existing customers (Art. 6 para. 1 lit. b GDPR) and in the interest of a secure, fast and efficient provision of our online offer by a professional provider (Art. 6 para. 1 lit. f GDPR).')}
                </p>
              </div>
            </section>

            {/* Section 3 - Allgemeine Hinweise */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('datenschutz.section3.title', '3. General Information and Mandatory Information')}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('datenschutz.privacy.title', 'Data Protection')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('datenschutz.privacy.content1', 'The operators of this website take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy.')}
                    </p>
                    <p className="text-white/80 leading-relaxed mt-3">
                      {config.get('datenschutz.privacy.content2', 'When you use this website, various personal data is collected. Personal data is data with which you can be personally identified. This privacy policy explains what data we collect and what we use it for. It also explains how and for what purpose this is done.')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('datenschutz.responsible.title', 'Information about the Responsible Party')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed mb-3">
                      {config.get('datenschutz.responsible.content1', 'The responsible party for data processing on this website is:')}
                    </p>
                    {config.get('datenschutz.responsible.company', 'Eckert Preisser GmbH\nMusterstraße 123\n12345 Musterstadt\nGermany').split('\n').map((line, i) => (
                      <p key={`company-${i}`} className="text-white/80">{line}</p>
                    ))}
                    <p className="text-white/80 mt-3 whitespace-pre-line">
                      Phone: +49 1578 9033073{'\n'}Email: info@ep-pb.de
                    </p>
                    <p className="text-white/80 leading-relaxed mt-4">
                      {config.get('datenschutz.responsible.content2', 'The responsible party is the natural or legal person who alone or jointly with others determines the purposes and means of the processing of personal data (e.g. names, email addresses, etc.).')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('datenschutz.storage.title', 'Storage Duration')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('datenschutz.storage.content', 'Unless a more specific storage period has been specified in this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies. If you assert a justified request for deletion or revoke your consent to data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data (e.g. tax or commercial law retention periods).')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('datenschutz.revocation.title', 'Revocation of Your Consent to Data Processing')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('datenschutz.revocation.content', 'Many data processing operations are only possible with your express consent. You can revoke consent you have already given at any time. The legality of the data processing carried out until the revocation remains unaffected by the revocation.')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('datenschutz.complaint.title', 'Right to Lodge a Complaint with the Supervisory Authority')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('datenschutz.complaint.content', 'In the event of violations of the GDPR, data subjects have the right to lodge a complaint with a supervisory authority, in particular in the Member State of their habitual residence, their place of work or the place of the alleged violation. The right to lodge a complaint exists without prejudice to other administrative or judicial remedies.')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('datenschutz.portability.title', 'Right to Data Portability')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('datenschutz.portability.content', 'You have the right to have data that we process automatically on the basis of your consent or in fulfillment of a contract handed over to you or to a third party in a common, machine-readable format. If you request the direct transfer of the data to another responsible party, this will only be done insofar as it is technically feasible.')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('datenschutz.information.title', 'Information, Correction and Deletion')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('datenschutz.information.content', 'Within the framework of the applicable legal provisions, you have the right to free information about your stored personal data, its origin and recipients and the purpose of the data processing and, if applicable, a right to correction or deletion of this data at any time. You can contact us at any time at the address given in the legal notice if you have further questions on the subject of personal data.')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('datenschutz.restriction.title', 'Right to Restriction of Processing')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('datenschutz.restriction.content', 'You have the right to request the restriction of the processing of your personal data. You can contact us at any time at the address given in the legal notice. The right to restriction of processing exists in the following cases:')}
                    </p>
                    <ul className="list-disc list-inside text-white/80 mt-3 space-y-2">
                      <li>{config.get('datenschutz.restriction.case1', 'If you dispute the accuracy of your personal data stored by us, we usually need time to verify this. For the duration of the review, you have the right to request the restriction of the processing of your personal data.')}</li>
                      <li>{config.get('datenschutz.restriction.case2', 'If the processing of your personal data happened/is happening unlawfully, you can request the restriction of data processing instead of deletion.')}</li>
                      <li>{config.get('datenschutz.restriction.case3', 'If we no longer need your personal data, but you need it to exercise, defend or assert legal claims, you have the right to request restriction of the processing of your personal data instead of deletion.')}</li>
                      <li>{config.get('datenschutz.restriction.case4', 'If you have lodged an objection pursuant to Art. 21 (1) GDPR, a balance must be struck between your interests and ours. As long as it is not yet clear whose interests prevail, you have the right to request the restriction of the processing of your personal data.')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 - Datenerfassung */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('datenschutz.section4.title', '4. Data Collection on this Website')}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('datenschutz.cookies.title', 'Cookies')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('datenschutz.section4.cookies.note', 'For detailed information about cookies used on this website, please refer to our')}{' '}
                      <a href="/cookie-policy" className="text-blue-400 hover:underline font-semibold">
                        {config.get('legal.cookies', 'Cookie Policy')}
                      </a>.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('datenschutz.serverlogs.title', 'Server Log Files')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed mb-3">
                      {config.get('datenschutz.serverlogs.intro', 'The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:')}
                    </p>
                    <ul className="list-disc list-inside text-white/80 space-y-1">
                      {config.get('datenschutz.serverlogs.items', 'Browser type and version\nOperating system used\nReferrer URL\nHost name of the accessing computer\nTime of the server request\nIP address').split('\n').map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <p className="text-white/80 leading-relaxed mt-4">
                      {config.get('datenschutz.serverlogs.content', 'This data will not be merged with other data sources. The data is collected on the basis of Art. 6 (1) lit. f GDPR. The website operator has a legitimate interest in the technically error-free presentation and optimization of its website - for this purpose, the server log files must be recorded.')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('datenschutz.contactform.title', 'Contact Form')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    {config.get('datenschutz.contactform.content', 'If you send us inquiries via the contact form, your data from the inquiry form, including the contact data you provided there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not pass on this data without your consent.\n\nThe processing of this data is based on Art. 6 (1) lit. b GDPR, if your request is related to the performance of a contract or is necessary for the implementation of pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective processing of requests addressed to us (Art. 6 (1) lit. f GDPR) or on your consent (Art. 6 (1) lit. a GDPR) if this has been requested.\n\nThe data you enter in the contact form will remain with us until you request us to delete it, revoke your consent to storage or the purpose for data storage no longer applies (e.g. after your request has been processed). Mandatory statutory provisions - in particular retention periods - remain unaffected.').split('\n\n').map((para, i) => (
                      <p key={i} className={`text-white/80 leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('datenschutz.email.title', 'Request by Email, Phone or Fax')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    {config.get('datenschutz.email.content', 'If you contact us by email, phone or fax, your request, including all resulting personal data (name, request), will be stored and processed by us for the purpose of processing your request. We do not pass on this data without your consent.\n\nThe processing of this data is based on Art. 6 (1) lit. b GDPR, if your request is related to the performance of a contract or is necessary for the implementation of pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective processing of requests addressed to us (Art. 6 (1) lit. f GDPR) or on your consent (Art. 6 (1) lit. a GDPR) if this has been requested.\n\nThe data you send to us via contact requests will remain with us until you request us to delete it, revoke your consent to storage or the purpose for data storage no longer applies (e.g. after your request has been processed). Mandatory statutory provisions - in particular statutory retention periods - remain unaffected.').split('\n\n').map((para, i) => (
                      <p key={i} className={`text-white/80 leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 - SSL/TLS */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('datenschutz.ssl.title', '5. SSL/TLS Encryption')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                <p className="text-white/80 leading-relaxed">
                  {config.get('datenschutz.ssl.content', 'This site uses SSL or TLS encryption for security reasons and to protect the transmission of confidential content, such as orders or requests that you send to us as the site operator. You can recognize an encrypted connection by the fact that the address line of the browser changes from "http://" to "https://" and by the lock symbol in your browser line. If SSL or TLS encryption is activated, the data you transmit to us cannot be read by third parties.')}
                </p>
              </div>
            </section>

            {/* Section 6 - Änderungen */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('datenschutz.changes.title', '6. Changes to this Privacy Policy')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                <p className="text-white/80 leading-relaxed">
                  {config.get('datenschutz.changes.content', 'We reserve the right to update this privacy policy from time to time to ensure that it complies with current legal requirements or to implement changes to our services in the privacy policy, e.g. when introducing new services. The new privacy policy will then apply to your next visit.')}
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
