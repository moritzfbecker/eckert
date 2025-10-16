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
                  <h3 className="text-lg font-semibold mb-2 text-black">Speicherdauer</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
                      verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
                      Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung
                      widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für
                      die Speicherung Ihrer personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche
                      Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können
                      eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
                      erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
                      Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres
                      Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht
                      unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Recht auf Datenübertragbarkeit</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines
                      Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen,
                      maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten
                      an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Auskunft, Löschung und Berichtigung</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
                      Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den
                      Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.
                      Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an
                      uns wenden.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Recht auf Einschränkung der Verarbeitung</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                      Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht
                      in folgenden Fällen:
                    </p>
                    <ul className="list-disc list-inside text-black/70 mt-3 space-y-2">
                      <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten</li>
                      <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht</li>
                      <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen</li>
                      <li>Wenn Sie Widerspruch gegen die Verarbeitung eingelegt haben</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Datenerfassung */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">4. Datenerfassung auf dieser Website</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Cookies</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed mb-4">
                      Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und richten
                      auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung
                      (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
                    </p>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                      <p className="text-blue-900 font-semibold mb-2">Cookie-Einwilligung und -Verwaltung</p>
                      <p className="text-blue-800 text-sm leading-relaxed">
                        Beim ersten Besuch unserer Website werden Sie über ein Cookie-Banner informiert und können
                        entscheiden, welche Cookie-Kategorien Sie zulassen möchten. Ihre Einwilligung wird für 12 Monate
                        gespeichert und kann jederzeit über die Cookie-Einstellungen am Ende jeder Seite widerrufen oder
                        geändert werden.
                      </p>
                    </div>

                    <p className="text-black/70 leading-relaxed mb-3 font-semibold">Wir verwenden folgende Cookie-Kategorien:</p>

                    <div className="space-y-3 mb-4">
                      <div className="bg-white p-3 rounded border-l-4 border-green-500">
                        <p className="font-semibold text-black mb-1">1. Notwendige Cookies (Immer aktiv)</p>
                        <p className="text-sm text-black/70">
                          <strong>Zweck:</strong> Diese Cookies sind für den Betrieb der Website unbedingt erforderlich.
                          Sie ermöglichen grundlegende Funktionen wie Seitennavigation und Zugriff auf sichere Bereiche.
                          <br />
                          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
                          <br />
                          <strong>Speicherdauer:</strong> Session oder bis zu 24 Stunden
                          <br />
                          <strong>Gespeicherte Cookies:</strong> session_id, cookie_consent, cookie_preferences
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                        <p className="font-semibold text-black mb-1">2. Funktionale Cookies (Optional)</p>
                        <p className="text-sm text-black/70">
                          <strong>Zweck:</strong> Ermöglichen erweiterte Funktionalität und Personalisierung
                          (z.B. Spracheinstellungen, bevorzugte Ansichten).
                          <br />
                          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
                          <br />
                          <strong>Speicherdauer:</strong> Bis zu 12 Monate
                          <br />
                          <strong>Widerruf:</strong> Jederzeit über Cookie-Einstellungen möglich
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                        <p className="font-semibold text-black mb-1">3. Analyse-Cookies (Optional)</p>
                        <p className="text-sm text-black/70">
                          <strong>Zweck:</strong> Erfassung anonymisierter Statistiken zur Website-Nutzung
                          (z.B. Google Analytics). Helfen uns, die Website zu verbessern.
                          <br />
                          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
                          <br />
                          <strong>Speicherdauer:</strong> Bis zu 24 Monate
                          <br />
                          <strong>Datenübermittlung:</strong> Keine Übermittlung an Dritte ohne Ihre Einwilligung
                          <br />
                          <strong>Widerruf:</strong> Jederzeit über Cookie-Einstellungen möglich
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded border-l-4 border-orange-500">
                        <p className="font-semibold text-black mb-1">4. Marketing-Cookies (Optional)</p>
                        <p className="text-sm text-black/70">
                          <strong>Zweck:</strong> Anzeige relevanter Werbung und Messung der Werbeeffektivität
                          (z.B. Facebook Pixel, Google Ads).
                          <br />
                          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
                          <br />
                          <strong>Speicherdauer:</strong> Bis zu 12 Monate
                          <br />
                          <strong>Datenübermittlung:</strong> Mögliche Übermittlung an Drittanbieter (nur mit Einwilligung)
                          <br />
                          <strong>Widerruf:</strong> Jederzeit über Cookie-Einstellungen möglich
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                      <p className="text-yellow-900 font-semibold mb-2">Ihre Rechte bezüglich Cookies</p>
                      <ul className="text-yellow-800 text-sm space-y-1 list-disc list-inside">
                        <li>Sie können Ihre Cookie-Einstellungen jederzeit ändern</li>
                        <li>Sie können einzelne Cookie-Kategorien aktivieren oder deaktivieren</li>
                        <li>Sie können Cookies in Ihrem Browser löschen</li>
                        <li>Die Ablehnung von Cookies kann die Funktionalität der Website einschränken</li>
                      </ul>
                    </div>

                    <p className="text-black/70 leading-relaxed mt-4">
                      Detaillierte Informationen zu den verwendeten Cookies finden Sie in unserer{' '}
                      <a href="/cookie-policy" className="text-blue-600 hover:underline font-semibold">
                        Cookie-Richtlinie
                      </a>.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Server-Log-Dateien</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed mb-3">
                      Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
                      Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                    </p>
                    <ul className="list-disc list-inside text-black/70 space-y-1">
                      <li>Browsertyp und Browserversion</li>
                      <li>verwendetes Betriebssystem</li>
                      <li>Referrer URL</li>
                      <li>Hostname des zugreifenden Rechners</li>
                      <li>Uhrzeit der Serveranfrage</li>
                      <li>IP-Adresse</li>
                    </ul>
                    <p className="text-black/70 leading-relaxed mt-4">
                      Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                    </p>
                    <p className="text-black/70 leading-relaxed mt-3">
                      Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber
                      hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner
                      Website – hierzu müssen die Server-Log-Files erfasst werden.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Kontaktformular</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
                      inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall
                      von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                    </p>
                    <p className="text-black/70 leading-relaxed mt-3">
                      Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage
                      mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
                      erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse
                      an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf
                      Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
                    </p>
                    <p className="text-black/70 leading-relaxed mt-3">
                      Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung
                      auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung
                      entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen
                      – insbesondere Aufbewahrungsfristen – bleiben unberührt.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Anfrage per E-Mail, Telefon oder Telefax</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                    <p className="text-black/70 leading-relaxed">
                      Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus
                      hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei
                      uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                    </p>
                    <p className="text-black/70 leading-relaxed mt-3">
                      Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage
                      mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
                      erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse
                      an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf
                      Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SSL/TLS */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">5. SSL- bzw. TLS-Verschlüsselung</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70 leading-relaxed">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum
                  Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw.
                  TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
                  von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
                <p className="text-black/70 leading-relaxed mt-3">
                  Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln,
                  nicht von Dritten mitgelesen werden.
                </p>
              </div>
            </section>

            {/* Änderungen */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">6. Änderungen der Datenschutzerklärung</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
                <p className="text-black/70 leading-relaxed">
                  Wir behalten uns vor, diese Datenschutzerklärung gelegentlich anzupassen, damit sie stets den aktuellen
                  rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung
                  umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue
                  Datenschutzerklärung.
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
