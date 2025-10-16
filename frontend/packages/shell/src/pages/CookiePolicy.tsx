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
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">1. Notwendige Cookies</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      Diese Cookies sind für den Betrieb der Website unbedingt erforderlich. Sie ermöglichen es Ihnen,
                      auf der Website zu navigieren und ihre Funktionen zu nutzen. Ohne diese Cookies können bestimmte
                      Dienste nicht bereitgestellt werden.
                    </p>
                    <div className="mt-4">
                      <p className="text-black/60 text-sm font-semibold mb-2">Beispiele:</p>
                      <ul className="list-disc list-inside text-black/60 text-sm space-y-1">
                        <li>Session-Cookies zur Aufrechterhaltung Ihrer Sitzung</li>
                        <li>Sicherheits-Cookies zur Verhinderung von Betrug</li>
                        <li>Cookies zur Speicherung Ihrer Cookie-Einstellungen</li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border border-black/10">
                      <p className="text-black/70 text-sm">
                        <span className="font-semibold text-black">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
                      </p>
                      <p className="text-black/70 text-sm mt-2">
                        <span className="font-semibold text-black">Speicherdauer:</span> Session (werden beim Schließen des Browsers gelöscht)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">2. Funktionale Cookies</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      Diese Cookies ermöglichen es der Website, Ihre getroffenen Eingaben (wie Benutzername, Sprache oder
                      Region) zu speichern und verbesserte, personalisierte Funktionen anzubieten. Sie können auch verwendet
                      werden, um Dienste bereitzustellen, die Sie angefordert haben, wie das Ansehen eines Videos oder das
                      Kommentieren in einem Blog.
                    </p>
                    <div className="mt-4">
                      <p className="text-black/60 text-sm font-semibold mb-2">Beispiele:</p>
                      <ul className="list-disc list-inside text-black/60 text-sm space-y-1">
                        <li>Cookies zur Speicherung Ihrer Sprachpräferenz</li>
                        <li>Cookies zur Speicherung Ihrer Schriftgröße</li>
                        <li>Cookies zur Speicherung Ihrer Region/Standort</li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border border-black/10">
                      <p className="text-black/70 text-sm">
                        <span className="font-semibold text-black">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
                      </p>
                      <p className="text-black/70 text-sm mt-2">
                        <span className="font-semibold text-black">Speicherdauer:</span> 12 Monate
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">3. Analyse-Cookies</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      Diese Cookies sammeln Informationen darüber, wie Besucher eine Website nutzen, z.B. welche Seiten
                      Besucher am häufigsten aufrufen und ob sie Fehlermeldungen von Webseiten erhalten. Diese Cookies
                      sammeln keine Informationen, die einen Besucher identifizieren. Alle von diesen Cookies gesammelten
                      Informationen werden aggregiert und sind daher anonym. Sie werden nur zur Verbesserung der
                      Funktionsweise einer Website verwendet.
                    </p>
                    <div className="mt-4">
                      <p className="text-black/60 text-sm font-semibold mb-2">Beispiele:</p>
                      <ul className="list-disc list-inside text-black/60 text-sm space-y-1">
                        <li>Cookies zur Erfassung von Besucherstatistiken</li>
                        <li>Cookies zur Messung der Seitenleistung</li>
                        <li>Cookies zur Analyse des Nutzerverhaltens</li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border border-black/10">
                      <p className="text-black/70 text-sm">
                        <span className="font-semibold text-black">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
                      </p>
                      <p className="text-black/70 text-sm mt-2">
                        <span className="font-semibold text-black">Speicherdauer:</span> 24 Monate
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">4. Marketing-Cookies</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      Diese Cookies werden verwendet, um Ihnen Werbeanzeigen zu zeigen, die für Sie und Ihre Interessen
                      relevant sind. Sie werden auch dazu verwendet, die Anzahl der Anzeige einer Werbung zu begrenzen
                      und die Effektivität von Werbekampagnen zu messen. Sie werden in der Regel von Werbenetzwerken mit
                      Erlaubnis des Website-Betreibers platziert.
                    </p>
                    <div className="mt-4">
                      <p className="text-black/60 text-sm font-semibold mb-2">Beispiele:</p>
                      <ul className="list-disc list-inside text-black/60 text-sm space-y-1">
                        <li>Cookies zur Anzeige relevanter Werbung</li>
                        <li>Cookies zur Messung der Werbeeffektivität</li>
                        <li>Cookies zur Begrenzung der Anzeigenhäufigkeit</li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border border-black/10">
                      <p className="text-black/70 text-sm">
                        <span className="font-semibold text-black">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
                      </p>
                      <p className="text-black/70 text-sm mt-2">
                        <span className="font-semibold text-black">Speicherdauer:</span> 12 Monate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie-Übersicht */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">Cookie-Übersicht</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/20">
                      <th className="text-left py-3 px-2 font-semibold text-black">Cookie-Name</th>
                      <th className="text-left py-3 px-2 font-semibold text-black">Zweck</th>
                      <th className="text-left py-3 px-2 font-semibold text-black">Typ</th>
                      <th className="text-left py-3 px-2 font-semibold text-black">Dauer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-2 text-black/70 font-mono text-xs">session_id</td>
                      <td className="py-3 px-2 text-black/70">Aufrechterhaltung der Benutzersitzung</td>
                      <td className="py-3 px-2 text-black/70">Notwendig</td>
                      <td className="py-3 px-2 text-black/70">Session</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-2 text-black/70 font-mono text-xs">cookie_consent</td>
                      <td className="py-3 px-2 text-black/70">Speicherung Ihrer Cookie-Einstellungen</td>
                      <td className="py-3 px-2 text-black/70">Notwendig</td>
                      <td className="py-3 px-2 text-black/70">12 Monate</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-2 text-black/70 font-mono text-xs">language</td>
                      <td className="py-3 px-2 text-black/70">Speicherung Ihrer Sprachpräferenz</td>
                      <td className="py-3 px-2 text-black/70">Funktional</td>
                      <td className="py-3 px-2 text-black/70">12 Monate</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-2 text-black/70 font-mono text-xs">_ga</td>
                      <td className="py-3 px-2 text-black/70">Google Analytics - Besucherstatistiken</td>
                      <td className="py-3 px-2 text-black/70">Analyse</td>
                      <td className="py-3 px-2 text-black/70">24 Monate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Cookie-Verwaltung */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">Verwaltung von Cookies</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Ihre Wahlmöglichkeiten</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed mb-4">
                      Sie haben verschiedene Möglichkeiten, Cookies zu verwalten und zu kontrollieren:
                    </p>
                    <ul className="list-disc list-inside text-black/70 space-y-3">
                      <li>
                        <span className="font-semibold text-black">Cookie-Einstellungen auf dieser Website:</span> Sie können Ihre
                        Cookie-Präferenzen über unser Cookie-Banner oder die Cookie-Einstellungen anpassen.
                      </li>
                      <li>
                        <span className="font-semibold text-black">Browser-Einstellungen:</span> Die meisten Browser ermöglichen es
                        Ihnen, Cookies zu verwalten. Sie können Cookies blockieren, löschen oder vor der Speicherung
                        gewarnt werden.
                      </li>
                      <li>
                        <span className="font-semibold text-black">Opt-Out-Tools:</span> Für bestimmte Arten von Cookies (z.B.
                        Werbe-Cookies) können Sie Opt-Out-Tools verwenden, um die Verwendung zu deaktivieren.
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Cookie-Einstellungen in gängigen Browsern</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-black mb-1">Google Chrome</p>
                        <p className="text-black/70 text-sm">
                          Einstellungen → Datenschutz und Sicherheit → Cookies und andere Websitedaten
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-black mb-1">Mozilla Firefox</p>
                        <p className="text-black/70 text-sm">
                          Einstellungen → Datenschutz & Sicherheit → Cookies und Website-Daten
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-black mb-1">Safari</p>
                        <p className="text-black/70 text-sm">
                          Einstellungen → Datenschutz → Cookies und Website-Daten
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-black mb-1">Microsoft Edge</p>
                        <p className="text-black/70 text-sm">
                          Einstellungen → Cookies und Websiteberechtigungen → Cookies und Websitedaten
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Auswirkungen des Blockierens von Cookies</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      Bitte beachten Sie, dass das Blockieren bestimmter Cookies die Funktionalität unserer Website
                      beeinträchtigen kann. Wenn Sie alle Cookies blockieren, können Sie möglicherweise nicht auf alle
                      Funktionen unserer Website zugreifen oder diese nutzen. Notwendige Cookies können nicht deaktiviert
                      werden, da die Website ohne diese nicht ordnungsgemäß funktionieren würde.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Weitere Informationen */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">Weitere Informationen</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70 leading-relaxed mb-3">
                  Wenn Sie weitere Informationen über unsere Verwendung von Cookies benötigen oder Fragen zu dieser
                  Cookie-Richtlinie haben, kontaktieren Sie uns bitte:
                </p>
                <div className="mt-4 p-4 bg-white rounded border border-black/10">
                  <p className="text-black/70">
                    <span className="font-semibold text-black">E-Mail:</span> info@eckertpreisser.de
                  </p>
                  <p className="text-black/70 mt-2">
                    <span className="font-semibold text-black">Telefon:</span> +49 (0) 123 456789
                  </p>
                </div>
                <p className="text-black/70 leading-relaxed mt-4">
                  Weitere Informationen zum Datenschutz finden Sie in unserer{' '}
                  <a href="/datenschutz" className="text-blue-600 hover:underline">
                    Datenschutzerklärung
                  </a>.
                </p>
              </div>
            </section>

            {/* Aktualisierungen */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">Aktualisierungen dieser Richtlinie</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70 leading-relaxed">
                  Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, um Änderungen in unseren Praktiken
                  oder aus anderen betrieblichen, rechtlichen oder regulatorischen Gründen widerzuspiegeln. Bitte besuchen
                  Sie diese Seite regelmäßig, um über unsere Verwendung von Cookies und verwandten Technologien informiert
                  zu bleiben.
                </p>
                <p className="text-black/70 leading-relaxed mt-3">
                  Das Datum am Anfang dieser Cookie-Richtlinie gibt an, wann sie zuletzt aktualisiert wurde.
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
