# Version Management Guide

## Overview

This project uses **Semantic Versioning** separately for backend and frontend.

### Version Format
```
MAJOR.MINOR.PATCH
```

- **MAJOR**: Breaking changes (incompatible API changes)
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes (backwards compatible)

---

## Current Versions

| Component | Version | Last Updated |
|-----------|---------|--------------|
| Backend   | 1.0.0   | 2024-10-14   |
| Frontend  | 1.0.0   | 2024-10-14   |

---

## When to Bump Versions

### EVERY change requires a version bump!

### PATCH Version (x.x.1)
Increment when you make backwards compatible bug fixes:
- Bug fixes
- Performance improvements
- Code refactoring (no API changes)
- Documentation updates
- Dependency updates (patch versions)
- Style/formatting changes

**Examples:**
- Fixed login button not responding
- Improved query performance by 20%
- Updated README
- Fixed typo in error message

### MINOR Version (x.1.0)
Increment when you add functionality in a backwards compatible manner:
- New features
- New API endpoints
- New UI components
- New microservices
- Dependency updates (minor versions)
- Database schema additions (non-breaking)

**Examples:**
- Added user profile page
- New GET /api/users/{id}/orders endpoint
- Added dark mode support
- New email notification feature

### MAJOR Version (1.x.x)
Increment when you make incompatible API changes:
- Breaking API changes
- Removed endpoints
- Changed request/response formats
- Database schema changes (breaking)
- Removed features
- Framework upgrades (breaking)

**Examples:**
- Changed user authentication from session to JWT
- Removed deprecated API endpoints
- Migrated from REST to GraphQL
- Changed database from MySQL to PostgreSQL

---

## Version Bump Process

### Backend (Maven)

#### 1. Update Version in POM
```bash
cd backend

# For PATCH
mvn versions:set -DnewVersion=1.0.1

# For MINOR
mvn versions:set -DnewVersion=1.1.0

# For MAJOR
mvn versions:set -DnewVersion=2.0.0

# Commit the change
mvn versions:commit
```

#### 2. Update Changelog
Edit `backend/CHANGELOG.md`:
```markdown
## [1.0.1] - 2024-10-15

### Fixed
- Fixed user not found error message [USER_ERR_404_001]

**Author**: Your Name
```

#### 3. Update Root Changelog
Edit root `CHANGELOG.md` with the same information.

#### 4. Commit & Tag
```bash
git add .
git commit -m "chore: bump backend version to 1.0.1"
git tag backend-v1.0.1
git push origin main --tags
```

---

### Frontend (NPM)

#### 1. Update Version in package.json
```bash
cd frontend

# For PATCH
npm version patch

# For MINOR
npm version minor

# For MAJOR
npm version major
```

This will:
- Update `package.json` version
- Create a git commit
- Create a git tag

#### 2. Update All Package Versions
```bash
# Update each package manually
cd packages/shell
npm version 1.0.1

cd ../shared
npm version 1.0.1

# Repeat for all packages
```

#### 3. Update Changelog
Edit `frontend/CHANGELOG.md`:
```markdown
## [1.0.1] - 2024-10-15

### Fixed
- Fixed button hover animation glitch [FRONTEND_ERR_001]

**Author**: Your Name
```

#### 4. Update Root Changelog
Edit root `CHANGELOG.md` with the same information.

#### 5. Push Changes
```bash
git push origin main --tags
```

---

## Automated Version Bumping (Optional)

### Backend Script

Create `backend/bump-version.sh`:
```bash
#!/bin/bash

TYPE=$1 # patch, minor, or major

if [ -z "$TYPE" ]; then
  echo "Usage: ./bump-version.sh [patch|minor|major]"
  exit 1
fi

# Get current version
CURRENT=$(mvn help:evaluate -Dexpression=project.version -q -DforceStdout)

# Calculate new version
IFS='.' read -r -a VERSION <<< "$CURRENT"
MAJOR=${VERSION[0]}
MINOR=${VERSION[1]}
PATCH=${VERSION[2]}

if [ "$TYPE" == "major" ]; then
  MAJOR=$((MAJOR + 1))
  MINOR=0
  PATCH=0
elif [ "$TYPE" == "minor" ]; then
  MINOR=$((MINOR + 1))
  PATCH=0
elif [ "$TYPE" == "patch" ]; then
  PATCH=$((PATCH + 1))
fi

NEW_VERSION="$MAJOR.$MINOR.$PATCH"

echo "Bumping version from $CURRENT to $NEW_VERSION"

# Update version
mvn versions:set -DnewVersion=$NEW_VERSION
mvn versions:commit

# Update changelog reminder
echo "Don't forget to update CHANGELOG.md!"
echo "Current date: $(date +%Y-%m-%d)"
```

**Usage:**
```bash
chmod +x bump-version.sh
./bump-version.sh patch
```

---

### Frontend Script

Create `frontend/bump-version.sh`:
```bash
#!/bin/bash

TYPE=$1 # patch, minor, or major

if [ -z "$TYPE" ]; then
  echo "Usage: ./bump-version.sh [patch|minor|major]"
  exit 1
fi

# Bump root version
npm version $TYPE --no-git-tag-version

NEW_VERSION=$(node -p "require('./package.json').version")

# Bump all package versions
for dir in packages/*/; do
  if [ -f "$dir/package.json" ]; then
    echo "Updating $dir to $NEW_VERSION"
    cd "$dir"
    npm version $NEW_VERSION --no-git-tag-version
    cd ../..
  fi
done

echo "All packages updated to $NEW_VERSION"
echo "Don't forget to update CHANGELOG.md!"
echo "Current date: $(date +%Y-%m-%d)"
```

**Usage:**
```bash
chmod +x bump-version.sh
./bump-version.sh patch
```

---

## Version Tracking

### Git Tags

Every version should be tagged in git:

```bash
# Backend version
git tag backend-v1.0.1

# Frontend version
git tag frontend-v1.0.1

# Push all tags
git push --tags
```

### Tag Naming Convention
- Backend: `backend-v{MAJOR}.{MINOR}.{PATCH}`
- Frontend: `frontend-v{MAJOR}.{MINOR}.{PATCH}`

### List All Versions
```bash
# List backend versions
git tag -l "backend-v*"

# List frontend versions
git tag -l "frontend-v*"
```

---

## Pre-Commit Checklist

Before every commit, ensure:

- [ ] Version number updated in pom.xml/package.json
- [ ] Changelog updated with changes
- [ ] Error codes documented (if new errors added)
- [ ] Tests pass
- [ ] Build succeeds
- [ ] Git tag created
- [ ] Documentation updated

---

## Version Matrix

Keep track of compatible versions:

| Backend | Frontend | Compatible | Notes |
|---------|----------|------------|-------|
| 1.0.0   | 1.0.0    | ✅         | Initial release |
| 1.0.1   | 1.0.0    | ✅         | Backend bugfix |
| 1.1.0   | 1.0.0    | ⚠️         | New backend features |
| 1.1.0   | 1.1.0    | ✅         | Frontend updated |
| 2.0.0   | 1.1.0    | ❌         | Breaking changes |

---

## Deployment Versioning

### Development
- Version: `{MAJOR}.{MINOR}.{PATCH}-dev`
- Example: `1.0.1-dev`

### Staging
- Version: `{MAJOR}.{MINOR}.{PATCH}-staging`
- Example: `1.0.1-staging`

### Production
- Version: `{MAJOR}.{MINOR}.{PATCH}`
- Example: `1.0.1`

---

## Example Workflow

### Developer Makes a Bug Fix

1. **Make code changes**
```bash
# Fix the bug in code
```

2. **Bump version**
```bash
cd backend
mvn versions:set -DnewVersion=1.0.1
mvn versions:commit
```

3. **Update changelog**
```markdown
## [1.0.1] - 2024-10-15
### Fixed
- Fixed user validation error [USER_ERR_400_001]
```

4. **Commit and tag**
```bash
git add .
git commit -m "fix: user validation error"
git tag backend-v1.0.1
git push --tags
```

5. **Done!** Version tracked and documented.

---

## Questions?

### What if I forget to bump version?
- Bump it as soon as you remember
- Add a note in the changelog about the late update

### Can I skip patch versions?
- No, always increment by 1

### What about pre-releases?
- Use `-alpha`, `-beta`, `-rc` suffixes
- Example: `1.1.0-beta.1`

### How do I rollback a version?
- Revert the commit
- Tag the previous version again
- Update changelog

---

**Last Updated**: 2024-10-14
**Version**: 1.0.0
