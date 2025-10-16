/**
 * Cookie Policy Page
 *
 * Information about cookie usage
 * Content from old EckertPreisser project
 * CRITICAL: Main sections use i18n system (DE/EN)
 */

import { Container } from '../../../shared/ui-components/Container'
import { useTranslation } from '@eckert-preisser/shared/hooks'

const CookiePolicy = () => {
  const { t } = useTranslation()

  return (
    <div className="pt-32 pb-20 bg-eckert-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-4 text-black">{t('cookies.title')}</h1>
          <p className="text-black/60 mb-12">
            {t('cookies.updated')}: {new Date().toLocaleDateString('de-DE')}
          </p>

          <div className="space-y-10">
            {/* Was sind Cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('cookies.what.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70 leading-relaxed">
                  {t('cookies.what.content1')}
                </p>
                <p className="text-black/70 leading-relaxed mt-3">
                  {t('cookies.what.content2')}
                </p>
              </div>
            </section>

            {/* Wie verwenden wir Cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('cookies.how.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70 leading-relaxed">
                  {t('cookies.how.intro')}
                </p>
                <ul className="list-disc list-inside text-black/70 mt-3 space-y-2">
                  <li>{t('cookies.how.item1')}</li>
                  <li>{t('cookies.how.item2')}</li>
                  <li>{t('cookies.how.item3')}</li>
                  <li>{t('cookies.how.item4')}</li>
                  <li>{t('cookies.how.item5')}</li>
                </ul>
              </div>
            </section>

            {/* Arten von Cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('cookies.types.title')}</h2>

              <div className="space-y-6">
                {/* Cookie Type 1 */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('cookies.type1.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('cookies.type1.desc')}
                    </p>
                    <div className="mt-4">
                      <p className="text-black/60 text-sm font-semibold mb-2">{t('cookies.examples')}</p>
                      <ul className="list-disc list-inside text-black/60 text-sm space-y-1">
                        <li>{t('cookies.type1.ex1')}</li>
                        <li>{t('cookies.type1.ex2')}</li>
                        <li>{t('cookies.type1.ex3')}</li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border border-black/10">
                      <p className="text-black/70 text-sm">
                        <span className="font-semibold text-black">{t('cookies.legal.basis')}</span> {t('cookies.type1.basis')}
                      </p>
                      <p className="text-black/70 text-sm mt-2">
                        <span className="font-semibold text-black">{t('cookies.storage.duration')}</span> {t('cookies.type1.duration')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cookie Type 2 */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('cookies.type2.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('cookies.type2.desc')}
                    </p>
                    <div className="mt-4">
                      <p className="text-black/60 text-sm font-semibold mb-2">{t('cookies.examples')}</p>
                      <ul className="list-disc list-inside text-black/60 text-sm space-y-1">
                        <li>{t('cookies.type2.ex1')}</li>
                        <li>{t('cookies.type2.ex2')}</li>
                        <li>{t('cookies.type2.ex3')}</li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border border-black/10">
                      <p className="text-black/70 text-sm">
                        <span className="font-semibold text-black">{t('cookies.legal.basis')}</span> {t('cookies.type2.basis')}
                      </p>
                      <p className="text-black/70 text-sm mt-2">
                        <span className="font-semibold text-black">{t('cookies.storage.duration')}</span> {t('cookies.type2.duration')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cookie Type 3 */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('cookies.type3.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('cookies.type3.desc')}
                    </p>
                    <div className="mt-4">
                      <p className="text-black/60 text-sm font-semibold mb-2">{t('cookies.examples')}</p>
                      <ul className="list-disc list-inside text-black/60 text-sm space-y-1">
                        <li>{t('cookies.type3.ex1')}</li>
                        <li>{t('cookies.type3.ex2')}</li>
                        <li>{t('cookies.type3.ex3')}</li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border border-black/10">
                      <p className="text-black/70 text-sm">
                        <span className="font-semibold text-black">{t('cookies.legal.basis')}</span> {t('cookies.type3.basis')}
                      </p>
                      <p className="text-black/70 text-sm mt-2">
                        <span className="font-semibold text-black">{t('cookies.storage.duration')}</span> {t('cookies.type3.duration')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cookie Type 4 */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('cookies.type4.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('cookies.type4.desc')}
                    </p>
                    <div className="mt-4">
                      <p className="text-black/60 text-sm font-semibold mb-2">{t('cookies.examples')}</p>
                      <ul className="list-disc list-inside text-black/60 text-sm space-y-1">
                        <li>{t('cookies.type4.ex1')}</li>
                        <li>{t('cookies.type4.ex2')}</li>
                        <li>{t('cookies.type4.ex3')}</li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border border-black/10">
                      <p className="text-black/70 text-sm">
                        <span className="font-semibold text-black">{t('cookies.legal.basis')}</span> {t('cookies.type4.basis')}
                      </p>
                      <p className="text-black/70 text-sm mt-2">
                        <span className="font-semibold text-black">{t('cookies.storage.duration')}</span> {t('cookies.type4.duration')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie-Übersicht */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('cookies.overview.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/20">
                      <th className="text-left py-3 px-2 font-semibold text-black">{t('cookies.table.name')}</th>
                      <th className="text-left py-3 px-2 font-semibold text-black">{t('cookies.table.purpose')}</th>
                      <th className="text-left py-3 px-2 font-semibold text-black">{t('cookies.table.type')}</th>
                      <th className="text-left py-3 px-2 font-semibold text-black">{t('cookies.table.duration')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-2 text-black/70 font-mono text-xs">{t('cookies.table.row1.name')}</td>
                      <td className="py-3 px-2 text-black/70">{t('cookies.table.row1.purpose')}</td>
                      <td className="py-3 px-2 text-black/70">{t('cookies.table.row1.type')}</td>
                      <td className="py-3 px-2 text-black/70">{t('cookies.table.row1.duration')}</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-2 text-black/70 font-mono text-xs">{t('cookies.table.row2.name')}</td>
                      <td className="py-3 px-2 text-black/70">{t('cookies.table.row2.purpose')}</td>
                      <td className="py-3 px-2 text-black/70">{t('cookies.table.row2.type')}</td>
                      <td className="py-3 px-2 text-black/70">{t('cookies.table.row2.duration')}</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-2 text-black/70 font-mono text-xs">{t('cookies.table.row3.name')}</td>
                      <td className="py-3 px-2 text-black/70">{t('cookies.table.row3.purpose')}</td>
                      <td className="py-3 px-2 text-black/70">{t('cookies.table.row3.type')}</td>
                      <td className="py-3 px-2 text-black/70">{t('cookies.table.row3.duration')}</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-2 text-black/70 font-mono text-xs">{t('cookies.table.row4.name')}</td>
                      <td className="py-3 px-2 text-black/70">{t('cookies.table.row4.purpose')}</td>
                      <td className="py-3 px-2 text-black/70">{t('cookies.table.row4.type')}</td>
                      <td className="py-3 px-2 text-black/70">{t('cookies.table.row4.duration')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Cookie-Verwaltung */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('cookies.management.title')}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('cookies.management.choices.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed mb-4">
                      {t('cookies.management.choices.intro')}
                    </p>
                    <ul className="list-disc list-inside text-black/70 space-y-3">
                      <li>
                        <span className="font-semibold text-black">{t('cookies.management.choice1.title')}</span> {t('cookies.management.choice1.text')}
                      </li>
                      <li>
                        <span className="font-semibold text-black">{t('cookies.management.choice2.title')}</span> {t('cookies.management.choice2.text')}
                      </li>
                      <li>
                        <span className="font-semibold text-black">{t('cookies.management.choice3.title')}</span> {t('cookies.management.choice3.text')}
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('cookies.management.browsers.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-black mb-1">{t('cookies.browser.chrome')}</p>
                        <p className="text-black/70 text-sm">
                          {t('cookies.browser.chrome.path')}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-black mb-1">{t('cookies.browser.firefox')}</p>
                        <p className="text-black/70 text-sm">
                          {t('cookies.browser.firefox.path')}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-black mb-1">{t('cookies.browser.safari')}</p>
                        <p className="text-black/70 text-sm">
                          {t('cookies.browser.safari.path')}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-black mb-1">{t('cookies.browser.edge')}</p>
                        <p className="text-black/70 text-sm">
                          {t('cookies.browser.edge.path')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{t('cookies.management.blocking.title')}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      {t('cookies.management.blocking.content')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Weitere Informationen */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('cookies.contact.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70 leading-relaxed mb-3">
                  {t('cookies.contact.text')}
                </p>
                <div className="mt-4 p-4 bg-white rounded border border-black/10">
                  <p className="text-black/70">
                    <span className="font-semibold text-black">{t('footer.email')}:</span> info@eckertpreisser.de
                  </p>
                  <p className="text-black/70 mt-2">
                    <span className="font-semibold text-black">{t('footer.phone')}:</span> +49 (0) 123 456789
                  </p>
                </div>
                <p className="text-black/70 leading-relaxed mt-4">
                  {t('cookies.contact.link')}{' '}
                  <a href="/datenschutz" className="text-blue-600 hover:underline">
                    {t('legal.privacy')}
                  </a>.
                </p>
              </div>
            </section>

            {/* Aktualisierungen */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">{t('cookies.updates.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70 leading-relaxed">
                  {t('cookies.updates.content')}
                </p>
                <p className="text-black/70 leading-relaxed mt-3">
                  {t('cookies.updates.date')}
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
