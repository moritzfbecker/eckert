/**
 * Cookie Policy Page - v2.0 Config API
 *
 * Comprehensive cookie usage information
 * Category: 'legal' (uses cookies.* prefix)
 */

import { Container } from '../../../shared/ui-components/Container'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'

const CookiePolicy = () => {
  const { language } = useTranslation()
  const config = useConfig('cookies', language)

  return (
    <div className="pt-24 pb-20 bg-eckert-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-4 text-black">
            {config.get('cookies.title', 'Cookie Policy')}
          </h1>
          <p className="text-black/60 mb-12">
            {config.get('cookies.updated', 'Last updated')}: {new Date().toLocaleDateString('en-US')}
          </p>

          <div className="space-y-10">
            {/* Was sind Cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('cookies.what.title', 'What are Cookies?')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                <p className="text-white/80 leading-relaxed">
                  {config.get('cookies.what.content1', 'Cookies are small text files that are stored on your device (computer, tablet, smartphone) when you visit a website. They allow the website to recognize your device and remember certain information.')}
                </p>
                <p className="text-white/80 leading-relaxed mt-3">
                  {config.get('cookies.what.content2', 'Cookies can be "session cookies" (deleted when you close the browser) or "persistent cookies" (remain on your device until they expire or you delete them).')}
                </p>
              </div>
            </section>

            {/* Wie verwenden wir Cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('cookies.how.title', 'How Do We Use Cookies?')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                <p className="text-white/80 leading-relaxed">
                  {config.get('cookies.how.intro', 'We use cookies for various purposes:')}
                </p>
                <ul className="list-disc list-inside text-white/80 mt-3 space-y-2">
                  <li>{config.get('cookies.how.item1', 'To ensure the basic functionality of our website')}</li>
                  <li>{config.get('cookies.how.item2', 'To remember your preferences and settings')}</li>
                  <li>{config.get('cookies.how.item3', 'To analyze how visitors use our website')}</li>
                  <li>{config.get('cookies.how.item4', 'To improve the user experience')}</li>
                  <li>{config.get('cookies.how.item5', 'To provide security features')}</li>
                </ul>
              </div>
            </section>

            {/* Arten von Cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('cookies.types.title', 'Types of Cookies We Use')}
              </h2>

              <div className="space-y-6">
                {/* Cookie Type 1 - Necessary */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('cookies.type1.title', '1. Strictly Necessary Cookies')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('cookies.type1.desc', 'These cookies are essential for the operation of our website. Without these cookies, services you have requested cannot be provided. These cookies do not store personally identifiable information.')}
                    </p>
                    <div className="mt-4">
                      <p className="text-white/70 text-sm font-semibold mb-2">
                        {config.get('cookies.examples', 'Examples:')}
                      </p>
                      <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
                        <li>{config.get('cookies.type1.ex1', 'Session management cookies')}</li>
                        <li>{config.get('cookies.type1.ex2', 'Security cookies')}</li>
                        <li>{config.get('cookies.type1.ex3', 'Load balancing cookies')}</li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border border-black/10">
                      <p className="text-black/70 text-sm">
                        <span className="font-semibold text-black">
                          {config.get('cookies.legal.basis', 'Legal Basis:')}
                        </span> {config.get('cookies.type1.basis', 'Essential for website operation (Art. 6 para. 1 lit. f GDPR)')}
                      </p>
                      <p className="text-black/70 text-sm mt-2">
                        <span className="font-semibold text-black">
                          {config.get('cookies.storage.duration', 'Storage Duration:')}
                        </span> {config.get('cookies.type1.duration', 'Session (deleted when browser closes)')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cookie Type 2 - Functional */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('cookies.type2.title', '2. Functional Cookies')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('cookies.type2.desc', 'These cookies enable enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. If you do not allow these cookies, some or all of these services may not function properly.')}
                    </p>
                    <div className="mt-4">
                      <p className="text-white/70 text-sm font-semibold mb-2">
                        {config.get('cookies.examples', 'Examples:')}
                      </p>
                      <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
                        <li>{config.get('cookies.type2.ex1', 'Language preferences')}</li>
                        <li>{config.get('cookies.type2.ex2', 'User interface customization')}</li>
                        <li>{config.get('cookies.type2.ex3', 'User authentication state')}</li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border border-black/10">
                      <p className="text-black/70 text-sm">
                        <span className="font-semibold text-black">
                          {config.get('cookies.legal.basis', 'Legal Basis:')}
                        </span> {config.get('cookies.type2.basis', 'Legitimate interest / User consent (Art. 6 para. 1 lit. f / a GDPR)')}
                      </p>
                      <p className="text-black/70 text-sm mt-2">
                        <span className="font-semibold text-black">
                          {config.get('cookies.storage.duration', 'Storage Duration:')}
                        </span> {config.get('cookies.type2.duration', '30 days to 1 year')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cookie Type 3 - Analytics */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('cookies.type3.title', '3. Analytics Cookies')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('cookies.type3.desc', 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous.')}
                    </p>
                    <div className="mt-4">
                      <p className="text-white/70 text-sm font-semibold mb-2">
                        {config.get('cookies.examples', 'Examples:')}
                      </p>
                      <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
                        <li>{config.get('cookies.type3.ex1', 'Google Analytics cookies')}</li>
                        <li>{config.get('cookies.type3.ex2', 'Page view tracking')}</li>
                        <li>{config.get('cookies.type3.ex3', 'User behavior analysis')}</li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border border-black/10">
                      <p className="text-black/70 text-sm">
                        <span className="font-semibold text-black">
                          {config.get('cookies.legal.basis', 'Legal Basis:')}
                        </span> {config.get('cookies.type3.basis', 'User consent required (Art. 6 para. 1 lit. a GDPR)')}
                      </p>
                      <p className="text-black/70 text-sm mt-2">
                        <span className="font-semibold text-black">
                          {config.get('cookies.storage.duration', 'Storage Duration:')}
                        </span> {config.get('cookies.type3.duration', 'Up to 2 years')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cookie Type 4 - Marketing */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('cookies.type4.title', '4. Marketing / Advertising Cookies')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('cookies.type4.desc', 'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant ads on other sites. They do not store directly personal information but are based on uniquely identifying your browser and internet device.')}
                    </p>
                    <div className="mt-4">
                      <p className="text-white/70 text-sm font-semibold mb-2">
                        {config.get('cookies.examples', 'Examples:')}
                      </p>
                      <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
                        <li>{config.get('cookies.type4.ex1', 'Advertising network cookies')}</li>
                        <li>{config.get('cookies.type4.ex2', 'Retargeting cookies')}</li>
                        <li>{config.get('cookies.type4.ex3', 'Social media tracking cookies')}</li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border border-black/10">
                      <p className="text-black/70 text-sm">
                        <span className="font-semibold text-black">
                          {config.get('cookies.legal.basis', 'Legal Basis:')}
                        </span> {config.get('cookies.type4.basis', 'User consent required (Art. 6 para. 1 lit. a GDPR)')}
                      </p>
                      <p className="text-black/70 text-sm mt-2">
                        <span className="font-semibold text-black">
                          {config.get('cookies.storage.duration', 'Storage Duration:')}
                        </span> {config.get('cookies.type4.duration', 'Up to 1 year')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie-Übersicht Table */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('cookies.overview.title', 'Cookie Overview')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-2 font-semibold text-white">
                        {config.get('cookies.table.name', 'Cookie Name')}
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-white">
                        {config.get('cookies.table.purpose', 'Purpose')}
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-white">
                        {config.get('cookies.table.type', 'Type')}
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-white">
                        {config.get('cookies.table.duration', 'Duration')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-2 text-white/80 font-mono text-xs">
                        {config.get('cookies.table.row1.name', 'session_id')}
                      </td>
                      <td className="py-3 px-2 text-white/80">
                        {config.get('cookies.table.row1.purpose', 'Maintains user session')}
                      </td>
                      <td className="py-3 px-2 text-white/80">
                        {config.get('cookies.table.row1.type', 'Necessary')}
                      </td>
                      <td className="py-3 px-2 text-white/80">
                        {config.get('cookies.table.row1.duration', 'Session')}
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-2 text-white/80 font-mono text-xs">
                        {config.get('cookies.table.row2.name', 'cookie_consent')}
                      </td>
                      <td className="py-3 px-2 text-white/80">
                        {config.get('cookies.table.row2.purpose', 'Stores cookie preferences')}
                      </td>
                      <td className="py-3 px-2 text-white/80">
                        {config.get('cookies.table.row2.type', 'Necessary')}
                      </td>
                      <td className="py-3 px-2 text-white/80">
                        {config.get('cookies.table.row2.duration', '1 year')}
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-2 text-white/80 font-mono text-xs">
                        {config.get('cookies.table.row3.name', 'language')}
                      </td>
                      <td className="py-3 px-2 text-white/80">
                        {config.get('cookies.table.row3.purpose', 'Stores language preference')}
                      </td>
                      <td className="py-3 px-2 text-white/80">
                        {config.get('cookies.table.row3.type', 'Functional')}
                      </td>
                      <td className="py-3 px-2 text-white/80">
                        {config.get('cookies.table.row3.duration', '1 year')}
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-2 text-white/80 font-mono text-xs">
                        {config.get('cookies.table.row4.name', '_ga')}
                      </td>
                      <td className="py-3 px-2 text-white/80">
                        {config.get('cookies.table.row4.purpose', 'Google Analytics tracking')}
                      </td>
                      <td className="py-3 px-2 text-white/80">
                        {config.get('cookies.table.row4.type', 'Analytics')}
                      </td>
                      <td className="py-3 px-2 text-white/80">
                        {config.get('cookies.table.row4.duration', '2 years')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Cookie-Verwaltung */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('cookies.management.title', 'Cookie Management')}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('cookies.management.choices.title', 'Your Choices')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed mb-4">
                      {config.get('cookies.management.choices.intro', 'You have several options to manage cookies:')}
                    </p>
                    <ul className="list-disc list-inside text-white/80 space-y-3">
                      <li>
                        <span className="font-semibold text-white">
                          {config.get('cookies.management.choice1.title', 'Accept All:')}
                        </span> {config.get('cookies.management.choice1.text', 'Allow all cookies for the best user experience')}
                      </li>
                      <li>
                        <span className="font-semibold text-white">
                          {config.get('cookies.management.choice2.title', 'Necessary Only:')}
                        </span> {config.get('cookies.management.choice2.text', 'Allow only essential cookies required for website operation')}
                      </li>
                      <li>
                        <span className="font-semibold text-white">
                          {config.get('cookies.management.choice3.title', 'Custom Settings:')}
                        </span> {config.get('cookies.management.choice3.text', 'Choose which types of cookies you want to allow')}
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('cookies.management.browsers.title', 'Browser Settings')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-white mb-1">
                          {config.get('cookies.browser.chrome', 'Google Chrome')}
                        </p>
                        <p className="text-white/80 text-sm">
                          {config.get('cookies.browser.chrome.path', 'Settings > Privacy and security > Cookies and other site data')}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">
                          {config.get('cookies.browser.firefox', 'Mozilla Firefox')}
                        </p>
                        <p className="text-white/80 text-sm">
                          {config.get('cookies.browser.firefox.path', 'Options > Privacy & Security > Cookies and Site Data')}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">
                          {config.get('cookies.browser.safari', 'Safari')}
                        </p>
                        <p className="text-white/80 text-sm">
                          {config.get('cookies.browser.safari.path', 'Preferences > Privacy > Manage Website Data')}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">
                          {config.get('cookies.browser.edge', 'Microsoft Edge')}
                        </p>
                        <p className="text-white/80 text-sm">
                          {config.get('cookies.browser.edge.path', 'Settings > Cookies and site permissions > Manage and delete cookies and site data')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {config.get('cookies.management.blocking.title', 'Blocking Cookies')}
                  </h3>
                  <div className="bg-black p-6 rounded-lg border border-black/10">
                    <p className="text-white/80 leading-relaxed">
                      {config.get('cookies.management.blocking.content', 'Please note that if you block certain cookies, some features of our website may not function properly. For example, you may not be able to stay logged in or remember your language preferences.')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Weitere Informationen */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('cookies.contact.title', 'Further Information')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                <p className="text-white/80 leading-relaxed mb-3">
                  {config.get('cookies.contact.text', 'If you have questions about our use of cookies, please contact us:')}
                </p>
                <div className="mt-4 p-4 bg-white rounded border border-black/10">
                  <p className="text-black/70">
                    <span className="font-semibold text-black">
                      {config.get('footer.email', 'Email')}:
                    </span> kontakt@eckertpreisser.de
                  </p>
                  <p className="text-black/70 mt-2">
                    <span className="font-semibold text-black">
                      {config.get('footer.phone', 'Phone')}:
                    </span> 07147 960210
                  </p>
                </div>
                <p className="text-white/80 leading-relaxed mt-4">
                  {config.get('cookies.contact.link', 'For more information about data protection, please see our')}{' '}
                  <a href="/datenschutz" className="text-blue-400 hover:underline">
                    {config.get('legal.privacy', 'Privacy Policy')}
                  </a>.
                </p>
              </div>
            </section>

            {/* Aktualisierungen */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {config.get('cookies.updates.title', 'Updates to this Policy')}
              </h2>
              <div className="bg-black p-6 rounded-lg border border-black/10">
                <p className="text-white/80 leading-relaxed">
                  {config.get('cookies.updates.content', 'We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies.')}
                </p>
                <p className="text-white/80 leading-relaxed mt-3">
                  {config.get('cookies.updates.date', 'This Cookie Policy was last updated on the date indicated above.')}
                </p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CookiePolicy
