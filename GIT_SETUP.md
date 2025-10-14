# Git Setup Anleitung

## Problem: "refusing to merge unrelated histories"

Das passiert, wenn das Remote-Repository bereits Dateien hat (z.B. README.md), die nicht mit deinem lokalen Repository zusammenhängen.

## Lösung:

### Option 1: Pull mit --allow-unrelated-histories (EMPFOHLEN)

```bash
# 1. Pull mit erlaubten unrelated histories
git pull origin main --allow-unrelated-histories

# 2. Bei Merge-Konflikten: Konflikte lösen
# (normalerweise keine, wenn Remote nur README hat)

# 3. Push
git push origin main
```

### Option 2: Force Push (NUR beim ersten Setup!)

**WARNUNG**: Nur verwenden wenn du sicher bist, dass nichts Wichtiges im Remote ist!

```bash
git push origin main --force
```

### Option 3: Remote README löschen und neu pushen

1. Auf GitHub: Gehe zu deinem Repository
2. Lösche die README.md (oder andere Dateien)
3. Dann normal pushen:
```bash
git push origin main
```

## Für dieses Projekt: Option 1

```bash
cd "C:\Users\morit\IdeaProjects\Eckert Enterprise"

git pull origin main --allow-unrelated-histories

# Wenn es einen Merge-Konflikt gibt:
# - Öffne die konfliktierenden Dateien
# - Löse die Konflikte
# - git add .
# - git commit -m "Merge remote and local"

git push origin main
```

## Nach dem erfolgreichen Push

Lösche diese Datei:
```bash
rm GIT_SETUP.md
git add .
git commit -m "chore: remove git setup guide"
git push origin main
```

---

## Für zukünftige Pushes

Normal workflow:
```bash
git add .
git commit -m "feat: your message"
git push origin main
```

**WICHTIG**: Denk an das Version Bump Workflow!
- Version bumpen
- CHANGELOG.md aktualisieren
- Tag erstellen
- Pushen mit --tags

Siehe VERSION_MANAGEMENT.md für Details.
