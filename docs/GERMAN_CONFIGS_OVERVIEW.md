# Deutsche Config-Dateien Übersicht

Erstellt am: 2025-12-05

## Speicherort aller deutschen Config-Dateien

Alle deutschen i18n Config-Dateien befinden sich in:
`config/i18n/de/`

## Vorhandene deutsche Config-Dateien

| Datei | Beschreibung | Status |
|-------|-------------|--------|
| `homepage.properties` | Homepage-Texte | NEU ERSTELLT |
| `about.properties` | Über uns / Peter Eckert | Vorhanden |
| `concept.properties` | Konzept-Seite (9 Kapitel) | Vorhanden |
| `medicallix.properties` | Medicallix Produktseite | Vorhanden |
| `science.properties` | Wissenschaftliche Fundierung | KORRIGIERT (20->6 Jahre Fraunhofer) |
| `finland.properties` | Finnland-Quellen | Vorhanden |
| `contact.properties` | Kontaktseite | Vorhanden |
| `auth.properties` | Authentifizierung | Vorhanden |
| `cookies.properties` | Cookie-Banner | Vorhanden |
| `impressum.properties` | Impressum | Vorhanden |
| `privacypolicy.properties` | Datenschutz | Vorhanden |
| `medicallixApp.properties` | Medicallix App-Demo | Vorhanden |
| `raketen.properties` | Raketen-Seite | Vorhanden |
| `common.properties` | Gemeinsame Texte | Vorhanden |

## Änderungen in dieser Session

### 1. science.properties - KORRIGIERT
**Fehler gefunden:** "20 Jahre Forschung am Fraunhofer"
**Korrigiert zu:** "6 Jahre Forschung am Fraunhofer IPA zu Technology-Implementation-Patterns (1981-1986)."

### 2. homepage.properties - NEU ERSTELLT
Deutsche Übersetzung der kompletten Homepage erstellt.

## Status-Check der Änderungsliste

### ERLEDIGT:
- [x] Homepage Top Video = Video 6 (Home.tsx:69)
- [x] About Entrepreneurial 1989-2019 (About.tsx:89)
- [x] About Company 5 mit Medicallix Link (About.tsx:203-209)
- [x] Viktor Frankl Layout: Text -> Video -> "Die philosophische Basis" Box
- [x] Medicallix Video 6 hinzugefügt (Medicallix.tsx:183)
- [x] Fraunhofer 6 Jahre korrigiert (science.properties:57)

### NOCH OFFEN / ZU KLÄREN:

1. **Homepage 3-Säulen-Text ändern**
   - Aktuell: "3-Pillar Method" mit "Pillar 1/2/3"
   - Chef wollte: "drei Spalten" mit Text "Performance" etc.
   - Status: Benötigt weitere Klärung des gewünschten Textes

2. **"Meine Überzeugung" Text**
   - Nicht gefunden im Code
   - Status: Benötigt Klärung wo dieser Text erscheinen soll

3. **Concept Video Screensaver entfernen**
   - Kein poster-Attribut vorhanden
   - Status: Sollte bereits OK sein (kein Vorschaubild)

4. **Chapter 5 Foto**
   - Aktuell: Kein Foto in Chapter 5
   - Status: Benötigt Klärung welches Foto

5. **Video 2 richtig hochladen**
   - Viktor Frankl Video: /videos/viktor-frankl.mp4
   - Status: Muss manuell hochgeladen werden

## Config-Datei Upload-Anleitung

Alle deutschen Config-Dateien können Sie auf den Config-Server hochladen:

1. Config-Dateien befinden sich in: `config/i18n/de/`
2. Server-Pfad: Entsprechend Ihrer Config-Server-Konfiguration
3. Nach Upload: Config-Server Cache leeren oder neustarten

## Dateipfade zum Kopieren

```
config/i18n/de/homepage.properties
config/i18n/de/about.properties
config/i18n/de/concept.properties
config/i18n/de/medicallix.properties
config/i18n/de/science.properties
config/i18n/de/finland.properties
config/i18n/de/contact.properties
config/i18n/de/auth.properties
config/i18n/de/cookies.properties
config/i18n/de/impressum.properties
config/i18n/de/privacypolicy.properties
config/i18n/de/medicallixApp.properties
config/i18n/de/raketen.properties
config/i18n/de/common.properties
```
