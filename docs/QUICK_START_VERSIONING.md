# Quick Start: Version Management

## 5-Minute Guide

### Rule #1: EVERY CHANGE = NEW VERSION

No exceptions!

---

## How to Bump Version

### Backend

```bash
cd backend

# Bug fix (1.0.0 → 1.0.1)
mvn versions:set -DnewVersion=1.0.1
mvn versions:commit

# New feature (1.0.0 → 1.1.0)
mvn versions:set -DnewVersion=1.1.0
mvn versions:commit

# Breaking change (1.0.0 → 2.0.0)
mvn versions:set -DnewVersion=2.0.0
mvn versions:commit
```

### Frontend

```bash
cd frontend

# Bug fix
npm version patch

# New feature
npm version minor

# Breaking change
npm version major
```

---

## Update Changelog

### 1. Edit CHANGELOG.md

```markdown
## [1.0.1] - 2025-10-15

### Fixed
- Fixed user login issue [USER_ERR_401_001]

### Added
- Added email verification [USER_004]

**Author**: Your Name
```

### 2. Update Root CHANGELOG.md

Same format, but in root CHANGELOG.md.

---

## Commit & Tag

```bash
# Add changes
git add .

# Commit
git commit -m "chore: bump version to 1.0.1"

# Tag
git tag backend-v1.0.1  # or frontend-v1.0.1

# Push
git push --tags
```

---

## Complete Workflow

```bash
# 1. Make your changes
# ... edit code ...

# 2. Bump version
cd backend
mvn versions:set -DnewVersion=1.0.1
mvn versions:commit

# 3. Update changelog
vim backend/CHANGELOG.md
# Add your changes

# 4. Commit everything
git add .
git commit -m "fix: fixed user validation"

# 5. Tag
git tag backend-v1.0.1

# 6. Push
git push --tags
```

---

## Quick Reference

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Bug fix | PATCH | 1.0.0 → 1.0.1 |
| New feature | MINOR | 1.0.0 → 1.1.0 |
| Breaking change | MAJOR | 1.0.0 → 2.0.0 |

---

## Changelog Template

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New feature [CODE_001]

### Changed
- Updated something [CODE_002]

### Fixed
- Fixed bug [CODE_ERR_003]

**Author**: Your Name
```

---

## Common Mistakes

### ❌ DON'T
```bash
# Don't skip version bump
git commit -m "fix: some bug"
git push

# Don't forget changelog
mvn versions:set -DnewVersion=1.0.1
git commit -m "bump version"

# Don't use wrong version type
# Bug fix with MINOR bump
npm version minor  # Should be patch!
```

### ✅ DO
```bash
# Complete workflow
1. Make changes
2. Bump version
3. Update changelog
4. Commit
5. Tag
6. Push with tags
```

---

## Need More Help?

- Full Guide: VERSION_MANAGEMENT.md
- Changelog Format: CHANGELOG.md
- Development Guidelines: DEVELOPMENT_GUIDELINES.md
