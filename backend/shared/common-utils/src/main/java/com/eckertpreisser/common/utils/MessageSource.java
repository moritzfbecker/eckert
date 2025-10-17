package com.eckertpreisser.common.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * Message Source for Multi-Language Support
 *
 * Loads messages from external i18n files
 * Supports: DE (German) and EN (English)
 *
 * Usage:
 * String message = MessageSource.getMessage("user.created", "de");
 * String formatted = MessageSource.getMessage("user.welcome", "en", "John");
 */
public class MessageSource {

    private static final Logger logger = LoggerFactory.getLogger(MessageSource.class);
    private static final String I18N_DIR = "config/i18n";
    private static final String DEFAULT_LANGUAGE = "de";
    private static final Map<String, Properties> messageCache = new HashMap<>();

    static {
        initializeMessageFiles();
    }

    private MessageSource() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * Initialize message files for all supported languages
     */
    private static void initializeMessageFiles() {
        try {
            createI18nDirectory();
            createMessageFile("de");
            createMessageFile("en");
            loadAllMessages();
        } catch (Exception e) {
            LoggerUtil.error(logger, "I18N_ERR_001", "Failed to initialize i18n", e);
        }
    }

    /**
     * Create i18n directory
     */
    private static void createI18nDirectory() throws IOException {
        Path i18nPath = Paths.get(I18N_DIR);
        if (!Files.exists(i18nPath)) {
            Files.createDirectories(i18nPath);
        }
    }

    /**
     * Create message file for specific language
     * ALWAYS regenerates to ensure latest translations are included
     */
    private static void createMessageFile(String language) throws IOException {
        Path messageFile = Paths.get(I18N_DIR, "messages_" + language + ".properties");

        // ALWAYS regenerate to include new translations
        // This ensures MessageSource code changes are reflected in properties files

        Properties messages = new Properties();

        if ("de".equals(language)) {
            // German messages
            messages.setProperty("app.name", "Eckert Preisser Enterprise");
            messages.setProperty("app.welcome", "Willkommen bei Eckert Preisser");

            // Navigation
            messages.setProperty("nav.home", "Startseite");
            messages.setProperty("nav.products", "Produkte");
            messages.setProperty("nav.dashboard", "Dashboard");
            messages.setProperty("nav.account", "Konto");
            messages.setProperty("nav.login", "Anmelden");
            messages.setProperty("nav.logout", "Abmelden");
            messages.setProperty("nav.concept", "Konzept");
            messages.setProperty("nav.archive", "Archiv");
            messages.setProperty("nav.contact", "Kontakt");

            // User messages
            messages.setProperty("user.profile", "Profil");
            messages.setProperty("user.settings", "Einstellungen");
            messages.setProperty("user.created", "Benutzer erfolgreich erstellt");
            messages.setProperty("user.updated", "Benutzer erfolgreich aktualisiert");
            messages.setProperty("user.deleted", "Benutzer erfolgreich gelöscht");
            messages.setProperty("user.not.found", "Benutzer nicht gefunden");
            messages.setProperty("user.already.exists", "Benutzer existiert bereits");
            messages.setProperty("user.welcome", "Willkommen, {0}!");

            // Buttons
            messages.setProperty("button.save", "Speichern");
            messages.setProperty("button.cancel", "Abbrechen");
            messages.setProperty("button.delete", "Löschen");
            messages.setProperty("button.edit", "Bearbeiten");
            messages.setProperty("button.submit", "Absenden");
            messages.setProperty("button.back", "Zurück");
            messages.setProperty("button.next", "Weiter");
            messages.setProperty("button.get.started", "Jetzt starten");
            messages.setProperty("button.learn.more", "Mehr erfahren");

            // Forms
            messages.setProperty("form.email", "E-Mail");
            messages.setProperty("form.password", "Passwort");
            messages.setProperty("form.first.name", "Vorname");
            messages.setProperty("form.last.name", "Nachname");
            messages.setProperty("form.phone", "Telefon");
            messages.setProperty("form.address", "Adresse");

            // Validation messages
            messages.setProperty("validation.required", "Dieses Feld ist erforderlich");
            messages.setProperty("validation.email.invalid", "Ungültige E-Mail-Adresse");
            messages.setProperty("validation.password.weak", "Passwort ist zu schwach");
            messages.setProperty("validation.password.mismatch", "Passwörter stimmen nicht überein");

            // Error messages
            messages.setProperty("error.something.went.wrong", "Etwas ist schief gelaufen");
            messages.setProperty("error.try.again", "Bitte versuchen Sie es erneut");
            messages.setProperty("error.internal", "Ein interner Fehler ist aufgetreten");
            messages.setProperty("error.unauthorized", "Nicht autorisiert");
            messages.setProperty("error.forbidden", "Zugriff verweigert");
            messages.setProperty("error.not.found", "Ressource nicht gefunden");

            // Success messages
            messages.setProperty("success.saved", "Erfolgreich gespeichert");
            messages.setProperty("success.deleted", "Erfolgreich gelöscht");
            messages.setProperty("success.updated", "Erfolgreich aktualisiert");

            // Home Page
            messages.setProperty("home.hero.title", "Willkommen bei");
            messages.setProperty("home.hero.subtitle", "Enterprise-Level-Lösungen für moderne Unternehmen. Gebaut mit modernster Technologie und für Skalierbarkeit konzipiert.");
            messages.setProperty("home.features.title", "Warum");
            messages.setProperty("home.feature.fast.title", "Blitzschnell");
            messages.setProperty("home.feature.fast.desc", "Mit Blick auf Performance gebaut. Optimiert für Geschwindigkeit und Effizienz.");
            messages.setProperty("home.feature.secure.title", "Sicher");
            messages.setProperty("home.feature.secure.desc", "Enterprise-Grade-Sicherheit mit JWT-Authentifizierung und OAuth2-Unterstützung.");
            messages.setProperty("home.feature.scalable.title", "Skalierbar");
            messages.setProperty("home.feature.scalable.desc", "Microservices-Architektur entwickelt, um mit Ihrem Unternehmen zu wachsen.");

            // Legal Pages
            messages.setProperty("legal.privacy", "Datenschutz");
            messages.setProperty("legal.imprint", "Impressum");
            messages.setProperty("legal.terms", "AGB");
            messages.setProperty("legal.cookies", "Cookie-Richtlinie");

            // Footer
            messages.setProperty("footer.company", "Unternehmen");
            messages.setProperty("footer.legal", "Rechtliches");
            messages.setProperty("footer.contact", "Kontakt");
            messages.setProperty("footer.email", "E-Mail");
            messages.setProperty("footer.phone", "Telefon");
            messages.setProperty("footer.copyright", "© {0} Eckert Preisser Enterprise. Alle Rechte vorbehalten.");
            messages.setProperty("footer.tagline", "Enterprise-Level-Lösungen für moderne Unternehmen.");
            messages.setProperty("footer.status", "System-Status");

            // Status Page
            messages.setProperty("status.title", "System-Status Dashboard");
            messages.setProperty("status.subtitle", "Echtzeit-Überwachung aller Microservices und Module");
            messages.setProperty("status.backend.title", "Backend Services");
            messages.setProperty("status.frontend.title", "Frontend Module");
            messages.setProperty("status.service.healthy", "Online");
            messages.setProperty("status.service.unhealthy", "Offline");
            messages.setProperty("status.service.unknown", "Unbekannt");
            messages.setProperty("status.version", "Version");
            messages.setProperty("status.port", "Port");
            messages.setProperty("status.uptime", "Laufzeit");
            messages.setProperty("status.last.check", "Letzte Prüfung");
            messages.setProperty("status.refresh", "Aktualisieren");
            messages.setProperty("status.view.logs", "Logs ansehen");
            messages.setProperty("status.services.eureka", "Service Discovery (Eureka)");
            messages.setProperty("status.services.config", "Config Server");
            messages.setProperty("status.services.gateway", "API Gateway");
            messages.setProperty("status.services.user", "User Service");
            messages.setProperty("status.services.product", "Product Service");
            messages.setProperty("status.services.order", "Order Service");
            messages.setProperty("status.services.notification", "Notification Service");
            messages.setProperty("status.overall.title", "Gesamt-Status");
            messages.setProperty("status.overall.operational", "Alle Systeme funktionsfähig");
            messages.setProperty("status.overall.degraded", "Eingeschränkter Betrieb");
            messages.setProperty("status.overall.down", "Systemausfall");

            // Impressum Page
            messages.setProperty("impressum.title", "Impressum");
            messages.setProperty("impressum.subtitle", "Angaben gemäß § 5 TMG");
            messages.setProperty("impressum.provider.title", "Anbieter");
            messages.setProperty("impressum.provider.name", "Eckert Preisser Personalberatung");
            messages.setProperty("impressum.provider.address", "Musterstraße 123\n12345 Musterstadt\nDeutschland");
            messages.setProperty("impressum.contact.title", "Kontakt");
            messages.setProperty("impressum.contact.phone", "Telefon");
            messages.setProperty("impressum.contact.email", "E-Mail");
            messages.setProperty("impressum.contact.website", "Website");
            messages.setProperty("impressum.representative.title", "Vertretungsberechtigte");
            messages.setProperty("impressum.representative.content", "Geschäftsführung: [Name des Geschäftsführers]");
            messages.setProperty("impressum.register.title", "Registereintrag");
            messages.setProperty("impressum.register.court", "Registergericht");
            messages.setProperty("impressum.register.number", "Registernummer");
            messages.setProperty("impressum.vat.title", "Umsatzsteuer-Identifikationsnummer");
            messages.setProperty("impressum.vat.content", "Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE123456789");
            messages.setProperty("impressum.responsible.title", "Verantwortlich für den Inhalt");
            messages.setProperty("impressum.responsible.content", "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:\n[Name des Verantwortlichen]\nMusterstraße 123\n12345 Musterstadt");
            messages.setProperty("impressum.dispute.title", "Streitschlichtung");
            messages.setProperty("impressum.dispute.content1", "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:");
            messages.setProperty("impressum.dispute.content2", "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.");
            messages.setProperty("impressum.liability.title", "Haftungsausschluss");
            messages.setProperty("impressum.liability.content.title", "Haftung für Inhalte");
            messages.setProperty("impressum.liability.content.text1", "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.");
            messages.setProperty("impressum.liability.content.text2", "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.");
            messages.setProperty("impressum.liability.links.title", "Haftung für Links");
            messages.setProperty("impressum.liability.links.text1", "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.");
            messages.setProperty("impressum.liability.links.text2", "Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.");
            messages.setProperty("impressum.copyright.title", "Urheberrecht");
            messages.setProperty("impressum.copyright.text1", "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.");
            messages.setProperty("impressum.copyright.text2", "Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.");
            messages.setProperty("impressum.design.title", "Website Design & Development");
            messages.setProperty("impressum.design.content", "Konzeption, Design und technische Umsetzung:\nMoritz F. Becker\nbecker.limited");
            messages.setProperty("impressum.design.rights", "Alle Rechte an Konzeption, Design, Struktur und technischer Implementierung dieser Website liegen bei Moritz F. Becker. Jegliche Verwendung, Vervielfältigung oder Nachahmung des Website-Designs und der technischen Konzeption bedarf der ausdrücklichen schriftlichen Genehmigung.");
            messages.setProperty("impressum.images.title", "Bildnachweise");
            messages.setProperty("impressum.images.content", "Verwendete Bilder und Grafiken stammen aus lizenzfreien Quellen (Pexels, Unsplash) oder wurden speziell für diese Website erstellt. Alle verwendeten Bilder werden gemäß den jeweiligen Lizenzbedingungen genutzt.");

            // Datenschutz Page
            messages.setProperty("datenschutz.title", "Datenschutzerklärung");
            messages.setProperty("datenschutz.updated", "Zuletzt aktualisiert");
            messages.setProperty("datenschutz.section1.title", "1. Datenschutz auf einen Blick");
            messages.setProperty("datenschutz.general.title", "Allgemeine Hinweise");
            messages.setProperty("datenschutz.general.content", "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.");
            messages.setProperty("datenschutz.collection.title", "Datenerfassung auf dieser Website");
            messages.setProperty("datenschutz.collection.who", "Wer ist verantwortlich für die Datenerfassung auf dieser Website?");
            messages.setProperty("datenschutz.collection.who.answer", "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt 'Hinweis zur verantwortlichen Stelle' in dieser Datenschutzerklärung entnehmen.");
            messages.setProperty("datenschutz.collection.how", "Wie erfassen wir Ihre Daten?");
            messages.setProperty("datenschutz.collection.how.answer1", "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.");
            messages.setProperty("datenschutz.collection.how.answer2", "Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.");
            messages.setProperty("datenschutz.collection.why", "Wofür nutzen wir Ihre Daten?");
            messages.setProperty("datenschutz.collection.why.answer", "Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.");
            messages.setProperty("datenschutz.collection.rights", "Welche Rechte haben Sie bezüglich Ihrer Daten?");
            messages.setProperty("datenschutz.collection.rights.answer", "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.");
            messages.setProperty("datenschutz.section2.title", "2. Hosting und Content Delivery Networks (CDN)");
            messages.setProperty("datenschutz.hosting.subtitle", "Externes Hosting");
            messages.setProperty("datenschutz.hosting.content1", "Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.");
            messages.setProperty("datenschutz.hosting.content2", "Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).");
            messages.setProperty("datenschutz.section3.title", "3. Allgemeine Hinweise und Pflichtinformationen");
            messages.setProperty("datenschutz.privacy.title", "Datenschutz");
            messages.setProperty("datenschutz.privacy.content1", "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.");
            messages.setProperty("datenschutz.privacy.content2", "Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.");
            messages.setProperty("datenschutz.responsible.title", "Hinweis zur verantwortlichen Stelle");
            messages.setProperty("datenschutz.responsible.content1", "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:");
            messages.setProperty("datenschutz.responsible.company", "Eckert Preisser Personalberatung\nMusterstraße 123\n12345 Musterstadt\nDeutschland");
            messages.setProperty("datenschutz.responsible.contact", "Telefon: +49 (0) 123 456789\nE-Mail: info@eckertpreisser.de");
            messages.setProperty("datenschutz.responsible.content2", "Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.");
            messages.setProperty("datenschutz.storage.title", "Speicherdauer");
            messages.setProperty("datenschutz.storage.content", "Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.");
            messages.setProperty("datenschutz.revocation.title", "Widerruf Ihrer Einwilligung zur Datenverarbeitung");
            messages.setProperty("datenschutz.revocation.content", "Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.");
            messages.setProperty("datenschutz.complaint.title", "Beschwerderecht bei der zuständigen Aufsichtsbehörde");
            messages.setProperty("datenschutz.complaint.content", "Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.");
            messages.setProperty("datenschutz.portability.title", "Recht auf Datenübertragbarkeit");
            messages.setProperty("datenschutz.portability.content", "Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.");
            messages.setProperty("datenschutz.information.title", "Auskunft, Löschung und Berichtigung");
            messages.setProperty("datenschutz.information.content", "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.");
            messages.setProperty("datenschutz.restriction.title", "Recht auf Einschränkung der Verarbeitung");
            messages.setProperty("datenschutz.restriction.content", "Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:");
            messages.setProperty("datenschutz.restriction.case1", "Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten");
            messages.setProperty("datenschutz.restriction.case2", "Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht");
            messages.setProperty("datenschutz.restriction.case3", "Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen");
            messages.setProperty("datenschutz.restriction.case4", "Wenn Sie Widerspruch gegen die Verarbeitung eingelegt haben");

            // Cookie Policy Page
            messages.setProperty("cookies.title", "Cookie-Richtlinie");
            messages.setProperty("cookies.updated", "Zuletzt aktualisiert");
            messages.setProperty("cookies.what.title", "Was sind Cookies?");
            messages.setProperty("cookies.what.content1", "Cookies sind kleine Textdateien, die von Webseiten auf Ihrem Computer oder mobilen Endgerät gespeichert werden. Sie sind weit verbreitet, um Webseiten funktionsfähig zu machen oder effizienter arbeiten zu lassen, sowie um Informationen an die Eigentümer der Website zu übertragen.");
            messages.setProperty("cookies.what.content2", "Cookies ermöglichen es einer Website, Ihre Aktionen und Einstellungen (wie Login, Sprache, Schriftgröße und andere Anzeigeeinstellungen) über einen bestimmten Zeitraum zu speichern, sodass Sie diese nicht jedes Mal erneut eingeben müssen, wenn Sie zur Website zurückkehren oder zwischen verschiedenen Seiten navigieren.");
            messages.setProperty("cookies.how.title", "Wie verwenden wir Cookies?");
            messages.setProperty("cookies.how.intro", "Wir verwenden Cookies, um:");
            messages.setProperty("cookies.how.item1", "Die Funktionalität unserer Website zu gewährleisten");
            messages.setProperty("cookies.how.item2", "Ihre Präferenzen und Einstellungen zu speichern");
            messages.setProperty("cookies.how.item3", "Die Sicherheit der Website zu erhöhen");
            messages.setProperty("cookies.how.item4", "Die Nutzung unserer Website zu analysieren und zu verbessern");
            messages.setProperty("cookies.how.item5", "Ihnen relevante Inhalte anzuzeigen");
            messages.setProperty("cookies.types.title", "Arten von Cookies, die wir verwenden");
            // Cookie Type 1 - Notwendig
            messages.setProperty("cookies.type1.title", "1. Notwendige Cookies");
            messages.setProperty("cookies.type1.desc", "Diese Cookies sind für den Betrieb der Website unbedingt erforderlich. Sie ermöglichen es Ihnen, auf der Website zu navigieren und ihre Funktionen zu nutzen. Ohne diese Cookies können bestimmte Dienste nicht bereitgestellt werden.");
            messages.setProperty("cookies.examples", "Beispiele:");
            messages.setProperty("cookies.type1.ex1", "Session-Cookies zur Aufrechterhaltung Ihrer Sitzung");
            messages.setProperty("cookies.type1.ex2", "Sicherheits-Cookies zur Verhinderung von Betrug");
            messages.setProperty("cookies.type1.ex3", "Cookies zur Speicherung Ihrer Cookie-Einstellungen");
            messages.setProperty("cookies.legal.basis", "Rechtsgrundlage:");
            messages.setProperty("cookies.type1.basis", "Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)");
            messages.setProperty("cookies.storage.duration", "Speicherdauer:");
            messages.setProperty("cookies.type1.duration", "Session (werden beim Schließen des Browsers gelöscht)");
            // Cookie Type 2 - Funktional
            messages.setProperty("cookies.type2.title", "2. Funktionale Cookies");
            messages.setProperty("cookies.type2.desc", "Diese Cookies ermöglichen es der Website, Ihre getroffenen Eingaben (wie Benutzername, Sprache oder Region) zu speichern und verbesserte, personalisierte Funktionen anzubieten. Sie können auch verwendet werden, um Dienste bereitzustellen, die Sie angefordert haben, wie das Ansehen eines Videos oder das Kommentieren in einem Blog.");
            messages.setProperty("cookies.type2.ex1", "Cookies zur Speicherung Ihrer Sprachpräferenz");
            messages.setProperty("cookies.type2.ex2", "Cookies zur Speicherung Ihrer Schriftgröße");
            messages.setProperty("cookies.type2.ex3", "Cookies zur Speicherung Ihrer Region/Standort");
            messages.setProperty("cookies.type2.basis", "Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)");
            messages.setProperty("cookies.type2.duration", "12 Monate");
            // Cookie Type 3 - Analyse
            messages.setProperty("cookies.type3.title", "3. Analyse-Cookies");
            messages.setProperty("cookies.type3.desc", "Diese Cookies sammeln Informationen darüber, wie Besucher eine Website nutzen, z.B. welche Seiten Besucher am häufigsten aufrufen und ob sie Fehlermeldungen von Webseiten erhalten. Diese Cookies sammeln keine Informationen, die einen Besucher identifizieren. Alle von diesen Cookies gesammelten Informationen werden aggregiert und sind daher anonym. Sie werden nur zur Verbesserung der Funktionsweise einer Website verwendet.");
            messages.setProperty("cookies.type3.ex1", "Cookies zur Erfassung von Besucherstatistiken");
            messages.setProperty("cookies.type3.ex2", "Cookies zur Messung der Seitenleistung");
            messages.setProperty("cookies.type3.ex3", "Cookies zur Analyse des Nutzerverhaltens");
            messages.setProperty("cookies.type3.basis", "Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)");
            messages.setProperty("cookies.type3.duration", "24 Monate");
            // Cookie Type 4 - Marketing
            messages.setProperty("cookies.type4.title", "4. Marketing-Cookies");
            messages.setProperty("cookies.type4.desc", "Diese Cookies werden verwendet, um Ihnen Werbeanzeigen zu zeigen, die für Sie und Ihre Interessen relevant sind. Sie werden auch dazu verwendet, die Anzahl der Anzeige einer Werbung zu begrenzen und die Effektivität von Werbekampagnen zu messen. Sie werden in der Regel von Werbenetzwerken mit Erlaubnis des Website-Betreibers platziert.");
            messages.setProperty("cookies.type4.ex1", "Cookies zur Anzeige relevanter Werbung");
            messages.setProperty("cookies.type4.ex2", "Cookies zur Messung der Werbeeffektivität");
            messages.setProperty("cookies.type4.ex3", "Cookies zur Begrenzung der Anzeigenhäufigkeit");
            messages.setProperty("cookies.type4.basis", "Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)");
            messages.setProperty("cookies.type4.duration", "12 Monate");
            messages.setProperty("cookies.overview.title", "Cookie-Übersicht");
            messages.setProperty("cookies.management.title", "Verwaltung von Cookies");
            messages.setProperty("cookies.contact.title", "Weitere Informationen");
            messages.setProperty("cookies.contact.text", "Wenn Sie weitere Informationen über unsere Verwendung von Cookies benötigen oder Fragen zu dieser Cookie-Richtlinie haben, kontaktieren Sie uns bitte:");
            messages.setProperty("cookies.contact.link", "Weitere Informationen zum Datenschutz finden Sie in unserer");
            messages.setProperty("cookies.updates.title", "Aktualisierungen dieser Richtlinie");
            messages.setProperty("cookies.updates.content", "Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, um Änderungen in unseren Praktiken oder aus anderen betrieblichen, rechtlichen oder regulatorischen Gründen widerzuspiegeln. Bitte besuchen Sie diese Seite regelmäßig, um über unsere Verwendung von Cookies und verwandten Technologien informiert zu bleiben.");
            messages.setProperty("cookies.updates.date", "Das Datum am Anfang dieser Cookie-Richtlinie gibt an, wann sie zuletzt aktualisiert wurde.");
            // Cookie Table Headers
            messages.setProperty("cookies.table.name", "Cookie-Name");
            messages.setProperty("cookies.table.purpose", "Zweck");
            messages.setProperty("cookies.table.type", "Typ");
            messages.setProperty("cookies.table.duration", "Dauer");
            // Cookie Table Data
            messages.setProperty("cookies.table.row1.name", "session_id");
            messages.setProperty("cookies.table.row1.purpose", "Aufrechterhaltung der Benutzersitzung");
            messages.setProperty("cookies.table.row1.type", "Notwendig");
            messages.setProperty("cookies.table.row1.duration", "Session");
            messages.setProperty("cookies.table.row2.name", "cookie_consent");
            messages.setProperty("cookies.table.row2.purpose", "Speicherung Ihrer Cookie-Einstellungen");
            messages.setProperty("cookies.table.row2.type", "Notwendig");
            messages.setProperty("cookies.table.row2.duration", "12 Monate");
            messages.setProperty("cookies.table.row3.name", "language");
            messages.setProperty("cookies.table.row3.purpose", "Speicherung Ihrer Sprachpräferenz");
            messages.setProperty("cookies.table.row3.type", "Funktional");
            messages.setProperty("cookies.table.row3.duration", "12 Monate");
            messages.setProperty("cookies.table.row4.name", "_ga");
            messages.setProperty("cookies.table.row4.purpose", "Google Analytics - Besucherstatistiken");
            messages.setProperty("cookies.table.row4.type", "Analyse");
            messages.setProperty("cookies.table.row4.duration", "24 Monate");
            // Cookie Management
            messages.setProperty("cookies.management.choices.title", "Ihre Wahlmöglichkeiten");
            messages.setProperty("cookies.management.choices.intro", "Sie haben verschiedene Möglichkeiten, Cookies zu verwalten und zu kontrollieren:");
            messages.setProperty("cookies.management.choice1.title", "Cookie-Einstellungen auf dieser Website:");
            messages.setProperty("cookies.management.choice1.text", "Sie können Ihre Cookie-Präferenzen über unser Cookie-Banner oder die Cookie-Einstellungen anpassen.");
            messages.setProperty("cookies.management.choice2.title", "Browser-Einstellungen:");
            messages.setProperty("cookies.management.choice2.text", "Die meisten Browser ermöglichen es Ihnen, Cookies zu verwalten. Sie können Cookies blockieren, löschen oder vor der Speicherung gewarnt werden.");
            messages.setProperty("cookies.management.choice3.title", "Opt-Out-Tools:");
            messages.setProperty("cookies.management.choice3.text", "Für bestimmte Arten von Cookies (z.B. Werbe-Cookies) können Sie Opt-Out-Tools verwenden, um die Verwendung zu deaktivieren.");
            messages.setProperty("cookies.management.browsers.title", "Cookie-Einstellungen in gängigen Browsern");
            messages.setProperty("cookies.browser.chrome", "Google Chrome");
            messages.setProperty("cookies.browser.chrome.path", "Einstellungen → Datenschutz und Sicherheit → Cookies und andere Websitedaten");
            messages.setProperty("cookies.browser.firefox", "Mozilla Firefox");
            messages.setProperty("cookies.browser.firefox.path", "Einstellungen → Datenschutz & Sicherheit → Cookies und Website-Daten");
            messages.setProperty("cookies.browser.safari", "Safari");
            messages.setProperty("cookies.browser.safari.path", "Einstellungen → Datenschutz → Cookies und Website-Daten");
            messages.setProperty("cookies.browser.edge", "Microsoft Edge");
            messages.setProperty("cookies.browser.edge.path", "Einstellungen → Cookies und Websiteberechtigungen → Cookies und Websitedaten");
            messages.setProperty("cookies.management.blocking.title", "Auswirkungen des Blockierens von Cookies");
            messages.setProperty("cookies.management.blocking.content", "Bitte beachten Sie, dass das Blockieren bestimmter Cookies die Funktionalität unserer Website beeinträchtigen kann. Wenn Sie alle Cookies blockieren, können Sie möglicherweise nicht auf alle Funktionen unserer Website zugreifen oder diese nutzen. Notwendige Cookies können nicht deaktiviert werden, da die Website ohne diese nicht ordnungsgemäß funktionieren würde.");

            // Datenschutz Section 4 Details
            messages.setProperty("datenschutz.section4.title", "4. Datenerfassung auf dieser Website");
            messages.setProperty("datenschutz.cookies.title", "Cookies");
            messages.setProperty("datenschutz.section4.cookies.note", "Detaillierte Informationen zu den verwendeten Cookies finden Sie in unserer Cookie-Richtlinie.");
            messages.setProperty("datenschutz.serverlogs.title", "Server-Log-Dateien");
            messages.setProperty("datenschutz.serverlogs.intro", "Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:");
            messages.setProperty("datenschutz.serverlogs.items", "Browsertyp und Browserversion\nverwendetes Betriebssystem\nReferrer URL\nHostname des zugreifenden Rechners\nUhrzeit der Serveranfrage\nIP-Adresse");
            messages.setProperty("datenschutz.serverlogs.content", "Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.");
            messages.setProperty("datenschutz.contactform.title", "Kontaktformular");
            messages.setProperty("datenschutz.contactform.content", "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.\n\nDie Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.\n\nDie von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.");
            messages.setProperty("datenschutz.email.title", "Anfrage per E-Mail, Telefon oder Telefax");
            messages.setProperty("datenschutz.email.content", "Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.\n\nDie Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.");
            messages.setProperty("datenschutz.ssl.title", "5. SSL- bzw. TLS-Verschlüsselung");
            messages.setProperty("datenschutz.ssl.content", "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von 'http://' auf 'https://' wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.");
            messages.setProperty("datenschutz.changes.title", "6. Änderungen der Datenschutzerklärung");
            messages.setProperty("datenschutz.changes.content", "Wir behalten uns vor, diese Datenschutzerklärung gelegentlich anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.");

            // Solutions Page
            messages.setProperty("concept.title", "Unsere Lösungen");
            messages.setProperty("concept.subtitle", "Enterprise-Level-Lösungen für moderne Unternehmen. Gebaut mit modernster Technologie und für Skalierbarkeit konzipiert.");
            messages.setProperty("concept.card1.title", "Enterprise Solutions");
            messages.setProperty("concept.card1.description", "Maßgeschneiderte Enterprise-Lösungen für moderne Unternehmen. Skalierbar, sicher und zukunftssicher.");
            messages.setProperty("concept.card2.title", "Security First");
            messages.setProperty("concept.card2.description", "Enterprise-Grade Sicherheit mit JWT-Authentifizierung, OAuth2 und vollständiger Datenverschlüsselung.");
            messages.setProperty("concept.card3.title", "High Performance");
            messages.setProperty("concept.card3.description", "Optimiert für Geschwindigkeit mit Microservices-Architektur und modernsten Technologien.");
            messages.setProperty("concept.card4.title", "Cloud Native");
            messages.setProperty("concept.card4.description", "Containerisiert mit Docker, bereit für Kubernetes und moderne Cloud-Infrastruktur.");
            messages.setProperty("concept.card5.title", "Customizable");
            messages.setProperty("concept.card5.description", "Vollständig anpassbar an Ihre Geschäftsanforderungen mit flexibler Architektur.");
            messages.setProperty("concept.card6.title", "Skalierbar");
            messages.setProperty("concept.card6.description", "Microservices-Architektur die mit Ihrem Unternehmen wächst. Von Startup bis Enterprise.");
            messages.setProperty("concept.cta.title", "Bereit loszulegen?");
            messages.setProperty("concept.cta.subtitle", "Kontaktieren Sie uns für eine unverbindliche Beratung.");
            messages.setProperty("concept.cta.button", "Jetzt Kontakt aufnehmen");

            // Contact Page
            messages.setProperty("contact.title", "Kontakt");
            messages.setProperty("contact.subtitle", "Haben Sie Fragen? Wir helfen Ihnen gerne weiter.");
            messages.setProperty("contact.form.title", "Nachricht senden");
            messages.setProperty("contact.form.name", "Name");
            messages.setProperty("contact.form.email", "E-Mail");
            messages.setProperty("contact.form.subject", "Betreff");
            messages.setProperty("contact.form.message", "Nachricht");
            messages.setProperty("contact.form.send", "Nachricht senden");
            messages.setProperty("contact.form.name.placeholder", "Ihr Name");
            messages.setProperty("contact.form.email.placeholder", "ihre.email@beispiel.de");
            messages.setProperty("contact.form.subject.placeholder", "Worum geht es?");
            messages.setProperty("contact.form.message.placeholder", "Ihre Nachricht an uns...");

            // Concept Page - Documentation Structure
            messages.setProperty("concept.page.title", "Unser Konzept");
            messages.setProperty("concept.page.subtitle", "Eine neue Perspektive auf strategische Personalberatung");
            messages.setProperty("concept.sidebar.title", "Inhaltsverzeichnis");

            // Chapter Navigation
            messages.setProperty("concept.nav.chapter1", "Die verborgene Krise");
            messages.setProperty("concept.nav.chapter2", "Was wir anders machen");
            messages.setProperty("concept.nav.chapter3", "Wissenschaft + Unternehmertum");
            messages.setProperty("concept.nav.chapter4", "16-Jahres-Proof");
            messages.setProperty("concept.nav.chapter5", "Das 3-Säulen-Framework");
            messages.setProperty("concept.nav.chapter6", "Finnland-Erkenntnisse");
            messages.setProperty("concept.nav.chapter7", "Der Malik-Ansatz");
            messages.setProperty("concept.nav.chapter8", "Mandantenmodelle");
            messages.setProperty("concept.nav.chapter9", "Leadership-Assessment");

            // Chapter 1 - Die verborgene Krise
            messages.setProperty("concept.chapter1.title", "Die verborgene Krise, die Ihre Board-Meetings nicht adressieren");
            messages.setProperty("concept.chapter1.subtitle", "Das Pattern, das Sie vermutlich bereits kennen – aber noch nicht quantifiziert haben");

            // Chapter 1 - Intro Paragraphs
            messages.setProperty("concept.chapter1.intro.p1", "Ihre letzte Strategieberatung lieferte eine 300-Seiten-Präsentation. Brillante Analyse. Klare Empfehlungen. 18 Monate später: 30% der Empfehlungen sind umgesetzt. Die anderen 70% verschwanden in 'organizational friction'.");
            messages.setProperty("concept.chapter1.intro.p2", "Sie dachten, das sei normal. Es ist nicht normal – es ist systematisch.");
            messages.setProperty("concept.chapter1.intro.p3", "Was wenn der limitierende Faktor nicht Ihre Strategie ist, sondern etwas, das klassische Strategieberatungen systematisch übersehen? Was wenn es dokumentierte Evidenz gibt, dass Organisationen mit 1/7 Ihres Budgets Sie übertreffen können – nicht trotz, sondern wegen ihrer Ressourcen-Limitierung?");

            // Chapter 1 - Stats
            messages.setProperty("concept.chapter1.stat1.value", "34%");
            messages.setProperty("concept.chapter1.stat1.text", "des Erfolgs werden durch Budget erklärt. 66% bleiben unerklärt.");
            messages.setProperty("concept.chapter1.stat2.value", "58%");
            messages.setProperty("concept.chapter1.stat2.text", "des Erfolgs korrelieren mit einem Faktor, den Sie vermutlich nicht messen: Coaching-Leverage.");
            messages.setProperty("concept.chapter1.stat3.value", "167%");
            messages.setProperty("concept.chapter1.stat3.text", "Effizienz-Vorteil systematischer Entwickler gegenüber Talent-Akkumulierern.");

            // Chapter 1 - Assumptions Section
            messages.setProperty("concept.chapter1.assumptions.title", "Die drei Annahmen, die Ihre Resource-Allokation sabotieren");
            messages.setProperty("concept.chapter1.assumption1.title", "Annahme: Elite-Talent + Elite-Budget = Elite-Performance");
            messages.setProperty("concept.chapter1.assumption1.reality", "Realität aus 2025 EuroBasket: Finnland (78/100 Talent-Score, €6,75M Budget) erreichte Platz 4. Spanien (82/100 Talent-Score, €28M Budget) schied in Vorrunde aus – frühestes Aus seit 1989.");
            messages.setProperty("concept.chapter1.assumption2.title", "Annahme: Best Practices der Marktführer sind zu kopieren");
            messages.setProperty("concept.chapter1.assumption2.reality", "Realität: High-Talent-Organisationen unter-performen systematisch. Spanien -13 Plätze unter Erwartung. Serbien (bester Spieler der Welt) -6 Plätze. Finnland (schwächstes Talent) +10 Plätze über Erwartung.");
            messages.setProperty("concept.chapter1.assumption3.title", "Annahme: ROI muss innerhalb von 24 Monaten sichtbar sein");
            messages.setProperty("concept.chapter1.assumption3.reality", "Realität: ZOLLERN Hidden Champion: 16 Jahre systematische Begleitung, 8% dokumentierter Vorsteuerumsatzrendite-Beitrag. Break-Even Jahr 4. Volle Systematik-Verankerung ermöglichte Selbstläufer-Qualitäten.");

        } else if ("en".equals(language)) {
            // English messages
            messages.setProperty("app.name", "Eckert Preisser Enterprise");
            messages.setProperty("app.welcome", "Welcome to Eckert Preisser");

            // Navigation
            messages.setProperty("nav.home", "Home");
            messages.setProperty("nav.products", "Products");
            messages.setProperty("nav.dashboard", "Dashboard");
            messages.setProperty("nav.account", "Account");
            messages.setProperty("nav.login", "Login");
            messages.setProperty("nav.logout", "Logout");
            messages.setProperty("nav.concept", "Concept");
            messages.setProperty("nav.archive", "Archive");
            messages.setProperty("nav.contact", "Contact");

            // User messages
            messages.setProperty("user.profile", "Profile");
            messages.setProperty("user.settings", "Settings");
            messages.setProperty("user.created", "User created successfully");
            messages.setProperty("user.updated", "User updated successfully");
            messages.setProperty("user.deleted", "User deleted successfully");
            messages.setProperty("user.not.found", "User not found");
            messages.setProperty("user.already.exists", "User already exists");
            messages.setProperty("user.welcome", "Welcome, {0}!");

            // Buttons
            messages.setProperty("button.save", "Save");
            messages.setProperty("button.cancel", "Cancel");
            messages.setProperty("button.delete", "Delete");
            messages.setProperty("button.edit", "Edit");
            messages.setProperty("button.submit", "Submit");
            messages.setProperty("button.back", "Back");
            messages.setProperty("button.next", "Next");
            messages.setProperty("button.get.started", "Get Started");
            messages.setProperty("button.learn.more", "Learn More");

            // Forms
            messages.setProperty("form.email", "Email");
            messages.setProperty("form.password", "Password");
            messages.setProperty("form.first.name", "First Name");
            messages.setProperty("form.last.name", "Last Name");
            messages.setProperty("form.phone", "Phone");
            messages.setProperty("form.address", "Address");

            // Validation messages
            messages.setProperty("validation.required", "This field is required");
            messages.setProperty("validation.email.invalid", "Invalid email address");
            messages.setProperty("validation.password.weak", "Password is too weak");
            messages.setProperty("validation.password.mismatch", "Passwords do not match");

            // Error messages
            messages.setProperty("error.something.went.wrong", "Something went wrong");
            messages.setProperty("error.try.again", "Please try again");
            messages.setProperty("error.internal", "An internal error occurred");
            messages.setProperty("error.unauthorized", "Unauthorized");
            messages.setProperty("error.forbidden", "Access denied");
            messages.setProperty("error.not.found", "Resource not found");

            // Success messages
            messages.setProperty("success.saved", "Successfully saved");
            messages.setProperty("success.deleted", "Successfully deleted");
            messages.setProperty("success.updated", "Successfully updated");

            // Home Page
            messages.setProperty("home.hero.title", "Welcome to");
            messages.setProperty("home.hero.subtitle", "Enterprise-level solutions for modern businesses. Built with cutting-edge technology and designed for scale.");
            messages.setProperty("home.features.title", "Why Choose");
            messages.setProperty("home.feature.fast.title", "Lightning Fast");
            messages.setProperty("home.feature.fast.desc", "Built with performance in mind. Optimized for speed and efficiency.");
            messages.setProperty("home.feature.secure.title", "Secure");
            messages.setProperty("home.feature.secure.desc", "Enterprise-grade security with JWT authentication and OAuth2 support.");
            messages.setProperty("home.feature.scalable.title", "Scalable");
            messages.setProperty("home.feature.scalable.desc", "Microservices architecture designed to scale with your business.");

            // Legal Pages
            messages.setProperty("legal.privacy", "Privacy Policy");
            messages.setProperty("legal.imprint", "Imprint");
            messages.setProperty("legal.terms", "Terms of Service");
            messages.setProperty("legal.cookies", "Cookie Policy");

            // Footer
            messages.setProperty("footer.company", "Company");
            messages.setProperty("footer.legal", "Legal");
            messages.setProperty("footer.contact", "Contact");
            messages.setProperty("footer.email", "Email");
            messages.setProperty("footer.phone", "Phone");
            messages.setProperty("footer.copyright", "© {0} Eckert Preisser Enterprise. All rights reserved.");
            messages.setProperty("footer.tagline", "Enterprise-level solutions for modern businesses.");
            messages.setProperty("footer.status", "System Status");

            // Status Page
            messages.setProperty("status.title", "System Status Dashboard");
            messages.setProperty("status.subtitle", "Real-time monitoring of all microservices and modules");
            messages.setProperty("status.backend.title", "Backend Services");
            messages.setProperty("status.frontend.title", "Frontend Modules");
            messages.setProperty("status.service.healthy", "Online");
            messages.setProperty("status.service.unhealthy", "Offline");
            messages.setProperty("status.service.unknown", "Unknown");
            messages.setProperty("status.version", "Version");
            messages.setProperty("status.port", "Port");
            messages.setProperty("status.uptime", "Uptime");
            messages.setProperty("status.last.check", "Last Check");
            messages.setProperty("status.refresh", "Refresh");
            messages.setProperty("status.view.logs", "View Logs");
            messages.setProperty("status.services.eureka", "Service Discovery (Eureka)");
            messages.setProperty("status.services.config", "Config Server");
            messages.setProperty("status.services.gateway", "API Gateway");
            messages.setProperty("status.services.user", "User Service");
            messages.setProperty("status.services.product", "Product Service");
            messages.setProperty("status.services.order", "Order Service");
            messages.setProperty("status.services.notification", "Notification Service");
            messages.setProperty("status.overall.title", "Overall Status");
            messages.setProperty("status.overall.operational", "All Systems Operational");
            messages.setProperty("status.overall.degraded", "Degraded Performance");
            messages.setProperty("status.overall.down", "System Outage");

            // Impressum Page
            messages.setProperty("impressum.title", "Imprint");
            messages.setProperty("impressum.subtitle", "Information according to § 5 TMG (German Telemedia Act)");
            messages.setProperty("impressum.provider.title", "Provider");
            messages.setProperty("impressum.provider.name", "Eckert Preisser Personalberatung");
            messages.setProperty("impressum.provider.address", "Musterstraße 123\n12345 Musterstadt\nGermany");
            messages.setProperty("impressum.contact.title", "Contact");
            messages.setProperty("impressum.contact.phone", "Phone");
            messages.setProperty("impressum.contact.email", "Email");
            messages.setProperty("impressum.contact.website", "Website");
            messages.setProperty("impressum.representative.title", "Authorized Representatives");
            messages.setProperty("impressum.representative.content", "Management: [Name of Managing Director]");
            messages.setProperty("impressum.register.title", "Register Entry");
            messages.setProperty("impressum.register.court", "Register Court");
            messages.setProperty("impressum.register.number", "Register Number");
            messages.setProperty("impressum.vat.title", "VAT Identification Number");
            messages.setProperty("impressum.vat.content", "VAT ID according to § 27a UStG: DE123456789");
            messages.setProperty("impressum.responsible.title", "Responsible for Content");
            messages.setProperty("impressum.responsible.content", "Responsible for content according to § 55 Abs. 2 RStV:\n[Name of Responsible Person]\nMusterstraße 123\n12345 Musterstadt");
            messages.setProperty("impressum.dispute.title", "Dispute Resolution");
            messages.setProperty("impressum.dispute.content1", "The European Commission provides a platform for online dispute resolution (ODR):");
            messages.setProperty("impressum.dispute.content2", "We are not willing or obligated to participate in dispute resolution proceedings before a consumer arbitration board.");
            messages.setProperty("impressum.liability.title", "Liability Disclaimer");
            messages.setProperty("impressum.liability.content.title", "Liability for Content");
            messages.setProperty("impressum.liability.content.text1", "As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 para. 1 TMG. However, according to §§ 8 to 10 TMG, we as a service provider are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.");
            messages.setProperty("impressum.liability.content.text2", "Obligations to remove or block the use of information according to general laws remain unaffected. However, liability in this regard is only possible from the time of knowledge of a specific infringement. Upon becoming aware of such legal violations, we will remove this content immediately.");
            messages.setProperty("impressum.liability.links.title", "Liability for Links");
            messages.setProperty("impressum.liability.links.text1", "Our offer contains links to external third-party websites over whose content we have no influence. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking.");
            messages.setProperty("impressum.liability.links.text2", "However, permanent monitoring of the content of linked pages is not reasonable without concrete evidence of a legal violation. Upon becoming aware of legal violations, we will remove such links immediately.");
            messages.setProperty("impressum.copyright.title", "Copyright");
            messages.setProperty("impressum.copyright.text1", "The content and works created by the site operators on these pages are subject to German copyright law. The reproduction, editing, distribution, and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.");
            messages.setProperty("impressum.copyright.text2", "Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is marked as such. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. Upon becoming aware of legal violations, we will remove such content immediately.");
            messages.setProperty("impressum.design.title", "Website Design & Development");
            messages.setProperty("impressum.design.content", "Concept, design and technical implementation:\nMoritz F. Becker\nbecker.limited");
            messages.setProperty("impressum.design.rights", "All rights to the concept, design, structure and technical implementation of this website belong to Moritz F. Becker. Any use, reproduction or imitation of the website design and technical concept requires express written permission.");
            messages.setProperty("impressum.images.title", "Image Credits");
            messages.setProperty("impressum.images.content", "Images and graphics used are from license-free sources (Pexels, Unsplash) or were created specifically for this website. All images used are utilized in accordance with their respective license terms.");

            // Datenschutz Page
            messages.setProperty("datenschutz.title", "Privacy Policy");
            messages.setProperty("datenschutz.updated", "Last updated");
            messages.setProperty("datenschutz.section1.title", "1. Privacy at a Glance");
            messages.setProperty("datenschutz.general.title", "General Information");
            messages.setProperty("datenschutz.general.content", "The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you. For detailed information on data protection, please refer to our privacy policy listed below this text.");
            messages.setProperty("datenschutz.collection.title", "Data Collection on This Website");
            messages.setProperty("datenschutz.collection.who", "Who is responsible for data collection on this website?");
            messages.setProperty("datenschutz.collection.who.answer", "Data processing on this website is carried out by the website operator. You can find the contact details in the section 'Information about the responsible party' in this privacy policy.");
            messages.setProperty("datenschutz.collection.how", "How do we collect your data?");
            messages.setProperty("datenschutz.collection.how.answer1", "Your data is collected when you provide it to us. This could be data you enter into a contact form, for example.");
            messages.setProperty("datenschutz.collection.how.answer2", "Other data is collected automatically or with your consent when you visit the website through our IT systems. This is mainly technical data (e.g., internet browser, operating system, or time of page access). This data is collected automatically as soon as you enter this website.");
            messages.setProperty("datenschutz.collection.why", "What do we use your data for?");
            messages.setProperty("datenschutz.collection.why.answer", "Some data is collected to ensure error-free provision of the website. Other data may be used to analyze your user behavior.");
            messages.setProperty("datenschutz.collection.rights", "What rights do you have regarding your data?");
            messages.setProperty("datenschutz.collection.rights.answer", "You have the right to receive free information about the origin, recipient, and purpose of your stored personal data at any time. You also have the right to request correction or deletion of this data. If you have given consent to data processing, you can revoke this consent at any time for the future. You also have the right, under certain circumstances, to request restriction of processing your personal data. Furthermore, you have the right to lodge a complaint with the competent supervisory authority.");
            messages.setProperty("datenschutz.section2.title", "2. Hosting and Content Delivery Networks (CDN)");
            messages.setProperty("datenschutz.hosting.subtitle", "External Hosting");
            messages.setProperty("datenschutz.hosting.content1", "This website is hosted by an external service provider (hoster). The personal data collected on this website is stored on the hoster's servers. This may include IP addresses, contact requests, meta and communication data, contract data, contact details, names, website accesses, and other data generated via a website.");
            messages.setProperty("datenschutz.hosting.content2", "The use of the hoster is for the purpose of contract fulfillment towards our potential and existing customers (Art. 6 para. 1 lit. b GDPR) and in the interest of secure, fast and efficient provision of our online offering by a professional provider (Art. 6 para. 1 lit. f GDPR).");
            messages.setProperty("datenschutz.section3.title", "3. General Information and Mandatory Information");
            messages.setProperty("datenschutz.privacy.title", "Privacy");
            messages.setProperty("datenschutz.privacy.content1", "The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with legal data protection regulations and this privacy policy.");
            messages.setProperty("datenschutz.privacy.content2", "When you use this website, various personal data is collected. Personal data is data that can be used to personally identify you. This privacy policy explains what data we collect and what we use it for. It also explains how and for what purpose this happens.");
            messages.setProperty("datenschutz.responsible.title", "Information about the Responsible Party");
            messages.setProperty("datenschutz.responsible.content1", "The responsible party for data processing on this website is:");
            messages.setProperty("datenschutz.responsible.company", "Eckert Preisser Personalberatung\nMusterstraße 123\n12345 Musterstadt\nGermany");
            messages.setProperty("datenschutz.responsible.contact", "Phone: +49 (0) 123 456789\nEmail: info@eckertpreisser.de");
            messages.setProperty("datenschutz.responsible.content2", "The responsible party is the natural or legal person who alone or jointly with others determines the purposes and means of processing personal data (e.g., names, email addresses, etc.).");
            messages.setProperty("datenschutz.storage.title", "Storage Duration");
            messages.setProperty("datenschutz.storage.content", "Unless a more specific storage period has been specified within this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies. If you assert a legitimate request for deletion or revoke consent for data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data (e.g., tax or commercial retention periods); in the latter case, deletion will occur after these reasons cease to exist.");
            messages.setProperty("datenschutz.revocation.title", "Revocation of Your Consent to Data Processing");
            messages.setProperty("datenschutz.revocation.content", "Many data processing operations are only possible with your express consent. You can revoke consent you have already given at any time. The legality of data processing that occurred before revocation remains unaffected by the revocation.");
            messages.setProperty("datenschutz.complaint.title", "Right to Lodge a Complaint with the Supervisory Authority");
            messages.setProperty("datenschutz.complaint.content", "In the event of violations of the GDPR, data subjects have the right to lodge a complaint with a supervisory authority, particularly in the member state of their habitual residence, place of work, or place of the alleged violation. The right to lodge a complaint exists without prejudice to other administrative or judicial remedies.");
            messages.setProperty("datenschutz.portability.title", "Right to Data Portability");
            messages.setProperty("datenschutz.portability.content", "You have the right to have data that we process automatically based on your consent or in fulfillment of a contract handed over to you or to a third party in a common, machine-readable format. If you request the direct transfer of data to another controller, this will only be done to the extent technically feasible.");
            messages.setProperty("datenschutz.information.title", "Information, Deletion and Correction");
            messages.setProperty("datenschutz.information.content", "Within the scope of applicable legal provisions, you have the right to free information about your stored personal data, its origin and recipients, and the purpose of data processing at any time, and if applicable, a right to correction or deletion of this data. For this purpose, as well as for further questions on the subject of personal data, you can contact us at any time.");
            messages.setProperty("datenschutz.restriction.title", "Right to Restriction of Processing");
            messages.setProperty("datenschutz.restriction.content", "You have the right to request the restriction of processing of your personal data. You can contact us at any time for this purpose. The right to restriction of processing exists in the following cases:");
            messages.setProperty("datenschutz.restriction.case1", "If you dispute the accuracy of your personal data stored by us");
            messages.setProperty("datenschutz.restriction.case2", "If the processing of your personal data was/is unlawful");
            messages.setProperty("datenschutz.restriction.case3", "If we no longer need your personal data");
            messages.setProperty("datenschutz.restriction.case4", "If you have objected to processing");

            // Cookie Policy Page
            messages.setProperty("cookies.title", "Cookie Policy");
            messages.setProperty("cookies.updated", "Last updated");
            messages.setProperty("cookies.what.title", "What are Cookies?");
            messages.setProperty("cookies.what.content1", "Cookies are small text files that are stored on your computer or mobile device by websites. They are widely used to make websites work or work more efficiently, as well as to provide information to the website owners.");
            messages.setProperty("cookies.what.content2", "Cookies allow a website to store your actions and preferences (such as login, language, font size and other display preferences) over a certain period of time, so you don't have to re-enter them every time you return to the website or navigate between different pages.");
            messages.setProperty("cookies.how.title", "How do we use Cookies?");
            messages.setProperty("cookies.how.intro", "We use cookies to:");
            messages.setProperty("cookies.how.item1", "Ensure the functionality of our website");
            messages.setProperty("cookies.how.item2", "Store your preferences and settings");
            messages.setProperty("cookies.how.item3", "Increase the security of the website");
            messages.setProperty("cookies.how.item4", "Analyze and improve the usage of our website");
            messages.setProperty("cookies.how.item5", "Show you relevant content");
            messages.setProperty("cookies.types.title", "Types of Cookies We Use");
            // Cookie Type 1 - Necessary
            messages.setProperty("cookies.type1.title", "1. Necessary Cookies");
            messages.setProperty("cookies.type1.desc", "These cookies are essential for the operation of the website. They enable you to navigate the website and use its features. Without these cookies, certain services cannot be provided.");
            messages.setProperty("cookies.examples", "Examples:");
            messages.setProperty("cookies.type1.ex1", "Session cookies to maintain your session");
            messages.setProperty("cookies.type1.ex2", "Security cookies to prevent fraud");
            messages.setProperty("cookies.type1.ex3", "Cookies to store your cookie settings");
            messages.setProperty("cookies.legal.basis", "Legal basis:");
            messages.setProperty("cookies.type1.basis", "Art. 6 para. 1 lit. f GDPR (legitimate interest)");
            messages.setProperty("cookies.storage.duration", "Storage duration:");
            messages.setProperty("cookies.type1.duration", "Session (deleted when browser is closed)");
            // Cookie Type 2 - Functional
            messages.setProperty("cookies.type2.title", "2. Functional Cookies");
            messages.setProperty("cookies.type2.desc", "These cookies allow the website to remember choices you make (such as username, language, or region) and provide enhanced, personalized features. They may also be used to provide services you have requested, such as watching a video or commenting on a blog.");
            messages.setProperty("cookies.type2.ex1", "Cookies to store your language preference");
            messages.setProperty("cookies.type2.ex2", "Cookies to store your font size");
            messages.setProperty("cookies.type2.ex3", "Cookies to store your region/location");
            messages.setProperty("cookies.type2.basis", "Art. 6 para. 1 lit. a GDPR (consent)");
            messages.setProperty("cookies.type2.duration", "12 months");
            // Cookie Type 3 - Analytics
            messages.setProperty("cookies.type3.title", "3. Analytics Cookies");
            messages.setProperty("cookies.type3.desc", "These cookies collect information about how visitors use a website, such as which pages visitors go to most often and if they receive error messages from web pages. These cookies do not collect information that identifies a visitor. All information collected by these cookies is aggregated and therefore anonymous. They are only used to improve how a website works.");
            messages.setProperty("cookies.type3.ex1", "Cookies to collect visitor statistics");
            messages.setProperty("cookies.type3.ex2", "Cookies to measure page performance");
            messages.setProperty("cookies.type3.ex3", "Cookies to analyze user behavior");
            messages.setProperty("cookies.type3.basis", "Art. 6 para. 1 lit. a GDPR (consent)");
            messages.setProperty("cookies.type3.duration", "24 months");
            // Cookie Type 4 - Marketing
            messages.setProperty("cookies.type4.title", "4. Marketing Cookies");
            messages.setProperty("cookies.type4.desc", "These cookies are used to show you advertisements that are relevant to you and your interests. They are also used to limit the number of times you see an advertisement and to measure the effectiveness of advertising campaigns. They are usually placed by advertising networks with the website operator's permission.");
            messages.setProperty("cookies.type4.ex1", "Cookies to display relevant advertising");
            messages.setProperty("cookies.type4.ex2", "Cookies to measure advertising effectiveness");
            messages.setProperty("cookies.type4.ex3", "Cookies to limit ad frequency");
            messages.setProperty("cookies.type4.basis", "Art. 6 para. 1 lit. a GDPR (consent)");
            messages.setProperty("cookies.type4.duration", "12 months");
            messages.setProperty("cookies.overview.title", "Cookie Overview");
            messages.setProperty("cookies.management.title", "Cookie Management");
            messages.setProperty("cookies.contact.title", "Further Information");
            messages.setProperty("cookies.contact.text", "If you need more information about our use of cookies or have questions about this Cookie Policy, please contact us:");
            messages.setProperty("cookies.contact.link", "For more information on privacy, please see our");
            messages.setProperty("cookies.updates.title", "Updates to This Policy");
            messages.setProperty("cookies.updates.content", "We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please visit this page regularly to stay informed about our use of cookies and related technologies.");
            messages.setProperty("cookies.updates.date", "The date at the beginning of this Cookie Policy indicates when it was last updated.");
            // Cookie Table Headers
            messages.setProperty("cookies.table.name", "Cookie Name");
            messages.setProperty("cookies.table.purpose", "Purpose");
            messages.setProperty("cookies.table.type", "Type");
            messages.setProperty("cookies.table.duration", "Duration");
            // Cookie Table Data
            messages.setProperty("cookies.table.row1.name", "session_id");
            messages.setProperty("cookies.table.row1.purpose", "Maintaining user session");
            messages.setProperty("cookies.table.row1.type", "Necessary");
            messages.setProperty("cookies.table.row1.duration", "Session");
            messages.setProperty("cookies.table.row2.name", "cookie_consent");
            messages.setProperty("cookies.table.row2.purpose", "Storing your cookie preferences");
            messages.setProperty("cookies.table.row2.type", "Necessary");
            messages.setProperty("cookies.table.row2.duration", "12 months");
            messages.setProperty("cookies.table.row3.name", "language");
            messages.setProperty("cookies.table.row3.purpose", "Storing your language preference");
            messages.setProperty("cookies.table.row3.type", "Functional");
            messages.setProperty("cookies.table.row3.duration", "12 months");
            messages.setProperty("cookies.table.row4.name", "_ga");
            messages.setProperty("cookies.table.row4.purpose", "Google Analytics - Visitor statistics");
            messages.setProperty("cookies.table.row4.type", "Analytics");
            messages.setProperty("cookies.table.row4.duration", "24 months");
            // Cookie Management
            messages.setProperty("cookies.management.choices.title", "Your Choices");
            messages.setProperty("cookies.management.choices.intro", "You have various options to manage and control cookies:");
            messages.setProperty("cookies.management.choice1.title", "Cookie Settings on This Website:");
            messages.setProperty("cookies.management.choice1.text", "You can adjust your cookie preferences via our cookie banner or cookie settings.");
            messages.setProperty("cookies.management.choice2.title", "Browser Settings:");
            messages.setProperty("cookies.management.choice2.text", "Most browsers allow you to manage cookies. You can block, delete or be warned before storing cookies.");
            messages.setProperty("cookies.management.choice3.title", "Opt-Out Tools:");
            messages.setProperty("cookies.management.choice3.text", "For certain types of cookies (e.g. advertising cookies), you can use opt-out tools to disable their use.");
            messages.setProperty("cookies.management.browsers.title", "Cookie Settings in Common Browsers");
            messages.setProperty("cookies.browser.chrome", "Google Chrome");
            messages.setProperty("cookies.browser.chrome.path", "Settings → Privacy and security → Cookies and other site data");
            messages.setProperty("cookies.browser.firefox", "Mozilla Firefox");
            messages.setProperty("cookies.browser.firefox.path", "Settings → Privacy & Security → Cookies and Site Data");
            messages.setProperty("cookies.browser.safari", "Safari");
            messages.setProperty("cookies.browser.safari.path", "Settings → Privacy → Cookies and Website Data");
            messages.setProperty("cookies.browser.edge", "Microsoft Edge");
            messages.setProperty("cookies.browser.edge.path", "Settings → Cookies and site permissions → Cookies and site data");
            messages.setProperty("cookies.management.blocking.title", "Impact of Blocking Cookies");
            messages.setProperty("cookies.management.blocking.content", "Please note that blocking certain cookies may affect the functionality of our website. If you block all cookies, you may not be able to access or use all features of our website. Necessary cookies cannot be disabled as the website would not function properly without them.");

            // Datenschutz Section 4 Details
            messages.setProperty("datenschutz.serverlogs.title", "Server Log Files");
            messages.setProperty("datenschutz.serverlogs.intro", "The page provider automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:");
            messages.setProperty("datenschutz.serverlogs.items", "Browser type and version\nOperating system used\nReferrer URL\nHostname of the accessing computer\nTime of the server request\nIP address");
            messages.setProperty("datenschutz.serverlogs.content", "This data is not merged with other data sources. The collection of this data is based on Art. 6 para. 1 lit. f GDPR. The website operator has a legitimate interest in the technically error-free presentation and optimization of their website - server log files must be collected for this purpose.");
            messages.setProperty("datenschutz.contactform.title", "Contact Form");
            messages.setProperty("datenschutz.contactform.content", "If you send us inquiries via the contact form, your information from the inquiry form, including the contact data you provide there, will be stored with us for the purpose of processing the inquiry and in case of follow-up questions. We do not pass on this data without your consent.\n\nThe processing of this data is based on Art. 6 para. 1 lit. b GDPR if your inquiry is related to the fulfillment of a contract or is necessary for the implementation of pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective processing of the inquiries addressed to us (Art. 6 para. 1 lit. f GDPR) or on your consent (Art. 6 para. 1 lit. a GDPR) if this was requested.\n\nThe data you enter in the contact form will remain with us until you request deletion, revoke your consent to storage, or the purpose for data storage no longer applies (e.g., after completion of your inquiry). Mandatory legal provisions - especially retention periods - remain unaffected.");
            messages.setProperty("datenschutz.email.title", "Inquiry via Email, Phone or Fax");
            messages.setProperty("datenschutz.email.content", "If you contact us by email, phone or fax, your inquiry including all resulting personal data (name, inquiry) will be stored and processed by us for the purpose of processing your request. We do not pass on this data without your consent.\n\nThe processing of this data is based on Art. 6 para. 1 lit. b GDPR if your inquiry is related to the fulfillment of a contract or is necessary for the implementation of pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective processing of the inquiries addressed to us (Art. 6 para. 1 lit. f GDPR) or on your consent (Art. 6 para. 1 lit. a GDPR) if this was requested.");
            messages.setProperty("datenschutz.ssl.title", "5. SSL/TLS Encryption");
            messages.setProperty("datenschutz.ssl.content", "This site uses SSL/TLS encryption for security reasons and to protect the transmission of confidential content, such as orders or inquiries that you send to us as the site operator. You can recognize an encrypted connection by the fact that the address line of the browser changes from 'http://' to 'https://' and by the lock symbol in your browser line. If SSL/TLS encryption is activated, the data you transmit to us cannot be read by third parties.");
            messages.setProperty("datenschutz.changes.title", "6. Changes to the Privacy Policy");
            messages.setProperty("datenschutz.changes.content", "We reserve the right to occasionally adjust this privacy policy so that it always complies with current legal requirements or to implement changes to our services in the privacy policy, for example when introducing new services. The new privacy policy will then apply to your next visit.");

            // Solutions Page
            messages.setProperty("concept.title", "Our Solutions");
            messages.setProperty("concept.subtitle", "Enterprise-level solutions for modern businesses. Built with cutting-edge technology and designed for scale.");
            messages.setProperty("concept.card1.title", "Enterprise Solutions");
            messages.setProperty("concept.card1.description", "Tailor-made enterprise solutions for modern companies. Scalable, secure and future-proof.");
            messages.setProperty("concept.card2.title", "Security First");
            messages.setProperty("concept.card2.description", "Enterprise-grade security with JWT authentication, OAuth2 and full data encryption.");
            messages.setProperty("concept.card3.title", "High Performance");
            messages.setProperty("concept.card3.description", "Optimized for speed with microservices architecture and cutting-edge technologies.");
            messages.setProperty("concept.card4.title", "Cloud Native");
            messages.setProperty("concept.card4.description", "Containerized with Docker, ready for Kubernetes and modern cloud infrastructure.");
            messages.setProperty("concept.card5.title", "Customizable");
            messages.setProperty("concept.card5.description", "Fully customizable to your business requirements with flexible architecture.");
            messages.setProperty("concept.card6.title", "Scalable");
            messages.setProperty("concept.card6.description", "Microservices architecture that grows with your business. From startup to enterprise.");
            messages.setProperty("concept.cta.title", "Ready to get started?");
            messages.setProperty("concept.cta.subtitle", "Contact us for a non-binding consultation.");
            messages.setProperty("concept.cta.button", "Contact us now");

            // Contact Page
            messages.setProperty("contact.title", "Contact");
            messages.setProperty("contact.subtitle", "Have questions? We're happy to help.");
            messages.setProperty("contact.form.title", "Send Message");
            messages.setProperty("contact.form.name", "Name");
            messages.setProperty("contact.form.email", "Email");
            messages.setProperty("contact.form.subject", "Subject");
            messages.setProperty("contact.form.message", "Message");
            messages.setProperty("contact.form.send", "Send Message");
            messages.setProperty("contact.form.name.placeholder", "Your name");
            messages.setProperty("contact.form.email.placeholder", "your.email@example.com");
            messages.setProperty("contact.form.subject.placeholder", "What is this about?");
            messages.setProperty("contact.form.message.placeholder", "Your message to us...");

            // Concept Page - Documentation Structure
            messages.setProperty("concept.page.title", "Our Concept");
            messages.setProperty("concept.page.subtitle", "A new perspective on strategic HR consulting");
            messages.setProperty("concept.sidebar.title", "Table of Contents");

            // Chapter Navigation
            messages.setProperty("concept.nav.chapter1", "The Hidden Crisis");
            messages.setProperty("concept.nav.chapter2", "What We Do Differently");
            messages.setProperty("concept.nav.chapter3", "Science + Entrepreneurship");
            messages.setProperty("concept.nav.chapter4", "16-Year Proof");
            messages.setProperty("concept.nav.chapter5", "The 3-Pillar Framework");
            messages.setProperty("concept.nav.chapter6", "Finland Insights");
            messages.setProperty("concept.nav.chapter7", "The Malik Approach");
            messages.setProperty("concept.nav.chapter8", "Client Models");
            messages.setProperty("concept.nav.chapter9", "Leadership Assessment");

            // Chapter 1 - The Hidden Crisis
            messages.setProperty("concept.chapter1.title", "The Hidden Crisis Your Board Meetings Don't Address");
            messages.setProperty("concept.chapter1.subtitle", "The pattern you probably already know – but haven't quantified yet");

            // Chapter 1 - Intro Paragraphs
            messages.setProperty("concept.chapter1.intro.p1", "Your last strategy consultation delivered a 300-page presentation. Brilliant analysis. Clear recommendations. 18 months later: 30% of recommendations implemented. The other 70% disappeared into 'organizational friction'.");
            messages.setProperty("concept.chapter1.intro.p2", "You thought that was normal. It's not normal – it's systematic.");
            messages.setProperty("concept.chapter1.intro.p3", "What if the limiting factor isn't your strategy, but something that classical strategy consultancies systematically overlook? What if there's documented evidence that organizations with 1/7th of your budget can outperform you – not despite, but because of their resource constraints?");

            // Chapter 1 - Stats
            messages.setProperty("concept.chapter1.stat1.value", "34%");
            messages.setProperty("concept.chapter1.stat1.text", "of success is explained by budget. 66% remains unexplained.");
            messages.setProperty("concept.chapter1.stat2.value", "58%");
            messages.setProperty("concept.chapter1.stat2.text", "of success correlates with a factor you probably don't measure: Coaching-Leverage.");
            messages.setProperty("concept.chapter1.stat3.value", "167%");
            messages.setProperty("concept.chapter1.stat3.text", "efficiency advantage of systematic developers over talent accumulators.");

            // Chapter 1 - Assumptions Section
            messages.setProperty("concept.chapter1.assumptions.title", "The three assumptions sabotaging your resource allocation");
            messages.setProperty("concept.chapter1.assumption1.title", "Assumption: Elite-Talent + Elite-Budget = Elite-Performance");
            messages.setProperty("concept.chapter1.assumption1.reality", "Reality from 2025 EuroBasket: Finland (78/100 Talent-Score, €6.75M budget) reached 4th place. Spain (82/100 Talent-Score, €28M budget) eliminated in preliminary round – earliest exit since 1989.");
            messages.setProperty("concept.chapter1.assumption2.title", "Assumption: Best practices of market leaders should be copied");
            messages.setProperty("concept.chapter1.assumption2.reality", "Reality: High-talent organizations systematically underperform. Spain -13 places below expectation. Serbia (world's best player) -6 places. Finland (weakest talent) +10 places above expectation.");
            messages.setProperty("concept.chapter1.assumption3.title", "Assumption: ROI must be visible within 24 months");
            messages.setProperty("concept.chapter1.assumption3.reality", "Reality: ZOLLERN Hidden Champion: 16 years of systematic support, 8% documented pre-tax revenue margin contribution. Break-even year 4. Full systematic anchoring enabled self-sustaining qualities.");
        }

        try (var writer = Files.newBufferedWriter(messageFile, StandardCharsets.UTF_8)) {
            messages.store(writer, "Eckert Preisser i18n - " + language.toUpperCase());
        }

        LoggerUtil.info(logger, "I18N_001", "Created message file",
            Map.of("language", language, "file", messageFile.getFileName()));
    }

    /**
     * Load all message files into cache
     */
    private static void loadAllMessages() {
        loadMessages("de");
        loadMessages("en");
    }

    /**
     * Load messages for specific language
     */
    private static void loadMessages(String language) {
        try {
            Path messageFile = Paths.get(I18N_DIR, "messages_" + language + ".properties");

            if (!Files.exists(messageFile)) {
                LoggerUtil.warn(logger, "I18N_WARN_001", "Message file not found",
                    Map.of("language", language));
                return;
            }

            Properties messages = new Properties();
            try (InputStream input = Files.newInputStream(messageFile);
                 InputStreamReader reader = new InputStreamReader(input, StandardCharsets.UTF_8)) {
                messages.load(reader);
                messageCache.put(language, messages);
                LoggerUtil.info(logger, "I18N_002", "Loaded messages",
                    Map.of("language", language, "count", messages.size()));
            }
        } catch (IOException e) {
            LoggerUtil.error(logger, "I18N_ERR_002", "Failed to load messages", e,
                Map.of("language", language));
        }
    }

    /**
     * Get message by key and language
     */
    public static String getMessage(String key, String language) {
        Properties messages = messageCache.get(language);

        if (messages == null) {
            messages = messageCache.get(DEFAULT_LANGUAGE);
        }

        if (messages == null) {
            return key;
        }

        return messages.getProperty(key, key);
    }

    /**
     * Get message with default language (German)
     */
    public static String getMessage(String key) {
        return getMessage(key, DEFAULT_LANGUAGE);
    }

    /**
     * Get formatted message with parameters
     */
    public static String getMessage(String key, String language, Object... params) {
        String message = getMessage(key, language);
        return formatMessage(message, params);
    }

    /**
     * Format message with parameters
     */
    private static String formatMessage(String message, Object... params) {
        if (params == null || params.length == 0) {
            return message;
        }

        String result = message;
        for (int i = 0; i < params.length; i++) {
            result = result.replace("{" + i + "}", String.valueOf(params[i]));
        }
        return result;
    }

    /**
     * Reload all messages (useful for hot-reload)
     */
    public static void reloadMessages() {
        messageCache.clear();
        loadAllMessages();
        LoggerUtil.info(logger, "I18N_003", "Reloaded all messages");
    }

    /**
     * Get all supported languages
     */
    public static String[] getSupportedLanguages() {
        return new String[]{"de", "en"};
    }

    /**
     * Get all messages for a specific language as Map
     */
    public static Map<String, String> getAllMessages(String language) {
        Map<String, String> result = new HashMap<>();
        Properties messages = messageCache.get(language);

        if (messages == null) {
            messages = messageCache.get(DEFAULT_LANGUAGE);
        }

        if (messages != null) {
            for (String key : messages.stringPropertyNames()) {
                result.put(key, messages.getProperty(key));
            }
        }

        return result;
    }
}
