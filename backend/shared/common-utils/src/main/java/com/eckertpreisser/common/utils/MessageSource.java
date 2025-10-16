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
            messages.setProperty("nav.solutions", "Lösungen");
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
            messages.setProperty("datenschutz.collection.who.answer", "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.");
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
            messages.setProperty("cookies.contact.text", "Wenn Sie weitere Informationen über unsere Verwendung von Cookies benötigen oder Fragen zu dieser Cookie-Richtlinie haben, kontaktieren Sie uns bitte:");
            messages.setProperty("cookies.contact.link", "Weitere Informationen zum Datenschutz finden Sie in unserer Datenschutzerklärung.");

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
            messages.setProperty("nav.solutions", "Solutions");
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
            messages.setProperty("datenschutz.collection.who.answer", "Data processing on this website is carried out by the website operator. You can find the contact details in the section "Information about the responsible party" in this privacy policy.");
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
            messages.setProperty("cookies.contact.text", "If you need more information about our use of cookies or have questions about this Cookie Policy, please contact us:");
            messages.setProperty("cookies.contact.link", "For more information on privacy, please see our Privacy Policy.");
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
