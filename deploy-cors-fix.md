# Deploy CORS Fix to Server

## Schritt 1: SSH zum Server
```bash
ssh your-user@becker.limited
```

## Schritt 2: Zum Projekt
```bash
cd /opt/eckert/eckert
```

## Schritt 3: Git Pull
```bash
git pull origin main
```

## Schritt 4: Email-Service neu bauen
```bash
cd backend
docker compose build email-service
```

## Schritt 5: Services neu starten
```bash
docker compose restart email-service api-gateway
```

## Schritt 6: Logs checken
```bash
docker compose logs -f email-service api-gateway
```

## Schritt 7: Testen
Gehe zu https://becker.limited/development/contact und fülle das Formular aus.

In den Logs solltest du sehen:
```
email-service-1 | [EMAIL_001] Sending email
email-service-1 | [EMAIL_002] Email sent successfully
```

## Wenn immer noch 403:
Cache im Browser leeren: Strg + Shift + Delete → Cached Images and Files

## Homepage Übersetzungen:
Falls die Homepage-Übersetzungen fehlen, prüfe ob die Config-Requests ankommen:
```bash
docker compose logs config-server | grep "homepage"
```

Sollte zeigen:
```
[CONFIG_API_001] I18n config requested | Context: {language=de, category=homepage}
```
