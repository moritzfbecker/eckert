# Enterprise Git Workflow

**Version:** 1.0.0
**Strategy:** GitFlow (Industry Standard)
**Date:** 2025-10-21

---

## 🎯 Overview

Enterprise-level Git workflow based on **GitFlow** - used by Google, Microsoft, Netflix, and other Fortune 500 companies.

**Benefits:**
- ✅ Clear separation of production, staging, and development
- ✅ Protected branches with mandatory code reviews
- ✅ Parallel development without conflicts
- ✅ Emergency hotfix process
- ✅ Traceable release history

---

## 🌳 Branch Structure

### Permanent Branches

#### `main` (Production)
- **Purpose:** Production-ready code ONLY
- **Protection:**
  - Requires 2 approvals
  - No direct commits
  - Only from `staging` or `hotfix/*`
- **Auto-Deploy:** To production environment
- **Tags:** backend-v2.0.0, frontend-v2.0.0

#### `staging` (Pre-Production)
- **Purpose:** Pre-production testing
- **Protection:**
  - Requires 1 approval
  - No direct commits
  - Only from `develop` or `release/*`
- **Auto-Deploy:** To staging environment
- **Testing:** Full QA testing here

#### `develop` (Integration)
- **Purpose:** Integration of all features
- **Protection:**
  - Requires 1 approval
  - No direct commits
  - Only from `feature/*` or `bugfix/*`
- **Auto-Deploy:** To development environment
- **CI:** Runs tests on every commit

### Temporary Branches

#### `feature/*` (New Features)
```bash
feature/CONFIG-123-user-authentication
feature/CONFIG-124-payment-integration
feature/CONFIG-125-admin-dashboard
```

- **From:** `develop`
- **To:** `develop` (via Pull Request)
- **Naming:** `feature/TICKET-short-description`
- **Lifetime:** Until feature merged or abandoned

#### `bugfix/*` (Bug Fixes)
```bash
bugfix/BUG-456-login-timeout
bugfix/BUG-457-form-validation
```

- **From:** `develop`
- **To:** `develop` (via Pull Request)
- **Naming:** `bugfix/BUG-number-description`

#### `hotfix/*` (Production Emergencies)
```bash
hotfix/CRITICAL-security-patch
hotfix/URGENT-payment-down
```

- **From:** `main`
- **To:** `main` AND `develop` (critical!)
- **Naming:** `hotfix/CRITICAL-description`
- **Process:** Fast-track, can skip staging

#### `release/*` (Release Preparation)
```bash
release/v2.1.0
release/v3.0.0
```

- **From:** `develop`
- **To:** `staging` → `main`
- **Purpose:** Final testing, version bump, changelog
- **No new features!** Only bug fixes

---

## 🔄 Workflows

### 1. Feature Development (Standard)

```bash
# 1. Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/CONFIG-123-dark-mode

# 2. Develop feature
# ... make changes ...
git add .
git commit -m "feat: add dark mode toggle

- Added dark mode context
- Created theme switcher component
- Updated all components for dark mode

[CONFIG-123]

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# 3. Push to remote
git push origin feature/CONFIG-123-dark-mode

# 4. Create Pull Request on GitHub
gh pr create --base develop --title "feat: Dark Mode Implementation" --body "$(cat <<'EOF'
## Summary
- Implements dark mode throughout the application
- Adds theme switcher in navigation
- Updates all components to support dark/light themes

## Changes
- Added DarkModeContext (frontend/packages/shared/contexts/)
- Created ThemeSwitcher component
- Updated Button, Card, Header components
- Added dark mode Tailwind classes

## Test Plan
- [ ] Test dark mode toggle in navigation
- [ ] Verify all pages in dark mode
- [ ] Test persistence across page reloads
- [ ] Verify no visual bugs in components

## Breaking Changes
None

## Related
Closes CONFIG-123

🤖 Generated with Claude Code
EOF
)"

# 5. Wait for reviews (2 approvals required)
# 6. Merge via GitHub (Squash & Merge)
# 7. Delete feature branch
git branch -d feature/CONFIG-123-dark-mode
git push origin --delete feature/CONFIG-123-dark-mode
```

### 2. Release Process

```bash
# 1. Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v2.1.0

# 2. Bump versions
cd backend && mvn versions:set -DnewVersion=2.1.0-SNAPSHOT && mvn versions:commit
cd ../frontend && npm version minor  # 2.0.0 → 2.1.0

# 3. Update CHANGELOGs
# Edit backend/CHANGELOG.md
# Edit frontend/CHANGELOG.md
# Edit CHANGELOG.md

# 4. Final testing & bug fixes only
# ... fix any bugs found ...

# 5. Commit release prep
git add .
git commit -m "chore: prepare release v2.1.0

- Bumped backend to 2.1.0
- Bumped frontend to 2.1.0
- Updated all CHANGELOGs
- Final testing complete

🤖 Generated with Claude Code"

# 6. Push release branch
git push origin release/v2.1.0

# 7. PR to staging
gh pr create --base staging --title "Release v2.1.0"

# 8. After staging approval → PR to main
gh pr create --base main --title "Release v2.1.0"

# 9. After main merge → Tag release
git checkout main
git pull
git tag backend-v2.1.0
git tag frontend-v2.1.0
git push --tags

# 10. Merge back to develop
git checkout develop
git merge main
git push origin develop

# 11. Delete release branch
git branch -d release/v2.1.0
git push origin --delete release/v2.1.0
```

### 3. Hotfix Process (Production Emergency)

```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/CRITICAL-security-vulnerability

# 2. Fix issue
# ... make fix ...
git add .
git commit -m "fix: CRITICAL security vulnerability

- Patched SQL injection in user search
- Added input sanitization
- Updated tests

[CRITICAL]

🤖 Generated with Claude Code"

# 3. PR to main (FAST-TRACK)
gh pr create --base main --title "[URGENT] Security Vulnerability Fix"

# 4. After approval → Merge
# 5. Tag immediately
git checkout main
git pull
git tag backend-v2.0.1
git push --tags

# 6. Merge back to develop
git checkout develop
git merge main
git push origin develop

# 7. Delete hotfix branch
git branch -d hotfix/CRITICAL-security-vulnerability
```

---

## 👥 Code Review Process

### Pull Request Requirements

**Mandatory in PR Description:**
1. **Summary** - What was changed
2. **Changes** - List of modifications
3. **Test Plan** - How to verify
4. **Breaking Changes** - If any
5. **Related Issues** - Ticket numbers

**Example PR Template:**
```markdown
## Summary
Brief description of changes

## Changes
- Change 1
- Change 2
- Change 3

## Test Plan
- [ ] Test case 1
- [ ] Test case 2

## Breaking Changes
None / Describe if any

## Related
Closes #123, Related to #456
```

### Review Checklist

**Reviewers must verify:**
- [ ] Code follows style guidelines (DEVELOPMENT_GUIDELINES.md)
- [ ] All tests pass (CI must be green)
- [ ] Error codes documented (ERROR_CODES.md)
- [ ] Version bumped correctly
- [ ] CHANGELOG.md updated
- [ ] No console.log or System.out.println
- [ ] Logging with LoggerUtil / logger
- [ ] i18n uses Config API v2.0 (.get() with defaults)
- [ ] No hardcoded strings
- [ ] No .env files

### Approval Rules

| Branch | Reviews Required | Who Can Approve |
|--------|------------------|-----------------|
| develop | 1 | Any team member |
| staging | 1 | Senior developers |
| main | 2 | Tech lead + Senior |

### Merge Strategy

- **Feature → develop:** Squash & Merge (clean history)
- **develop → staging:** Merge commit (preserve history)
- **staging → main:** Merge commit (preserve history)
- **hotfix → main:** Merge commit (traceable)

---

## 🏷️ Commit Convention

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Use Case | Example |
|------|----------|---------|
| `feat` | New feature | `feat: add dark mode toggle` |
| `fix` | Bug fix | `fix: resolve login timeout` |
| `docs` | Documentation | `docs: update README.md` |
| `style` | Code style | `style: format code with prettier` |
| `refactor` | Code refactoring | `refactor: simplify user service` |
| `test` | Tests | `test: add user controller tests` |
| `chore` | Build/config | `chore: bump version to 2.1.0` |
| `perf` | Performance | `perf: optimize database queries` |

### Examples

**Feature:**
```
feat(auth): implement JWT authentication

- Added JwtUtils for token generation
- Created AuthService with login/logout
- Added AuthController endpoints
- Integrated with User Service

[CONFIG-123]

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

**Bug Fix:**
```
fix(ui): resolve button hover animation

Button hover effect was not working in Safari.
Added -webkit- prefix for compatibility.

[BUG-456]

🤖 Generated with Claude Code
```

**Breaking Change:**
```
feat(config): migrate to Config API v2.0

BREAKING CHANGE: MessageSource.getMessage() removed
Use ConfigClient.load() instead

Migration guide: CONFIG_API.md

[CONFIG-200]

🤖 Generated with Claude Code
```

---

## 🔒 Branch Protection Rules

### Setup in GitHub

**main:**
```
Settings → Branches → Add rule → main
☑ Require pull request before merging
  ☑ Require 2 approvals
  ☑ Dismiss stale reviews
☑ Require status checks (CI/CD)
☑ Require conversation resolution
☑ Do not allow bypassing
☑ Require linear history
☑ Block force pushes
```

**staging:**
```
☑ Require pull request before merging
  ☑ Require 1 approval
☑ Require status checks
☑ Block force pushes
```

**develop:**
```
☑ Require pull request before merging
  ☑ Require 1 approval
☑ Require status checks
```

---

## 🚀 Quick Reference

### Daily Development

```bash
# Start new feature
git checkout develop && git pull
git checkout -b feature/CONFIG-123-my-feature

# Work on feature
# ... make changes ...
git add . && git commit -m "feat: ..."

# Push and create PR
git push origin feature/CONFIG-123-my-feature
gh pr create --base develop

# After merge
git checkout develop && git pull
git branch -d feature/CONFIG-123-my-feature
```

### Emergency Hotfix

```bash
# Create hotfix from main
git checkout main && git pull
git checkout -b hotfix/CRITICAL-issue

# Fix and push
git add . && git commit -m "fix: CRITICAL ..."
git push origin hotfix/CRITICAL-issue

# PR to main (fast-track!)
gh pr create --base main --title "[URGENT] ..."

# After merge → tag immediately
git checkout main && git pull
git tag backend-v2.0.1 && git push --tags

# Merge back to develop
git checkout develop && git merge main && git push
```

---

## 📋 Best Practices

### DO's ✅

1. **Always create PRs** - Never push directly
2. **Write descriptive commit messages** - Follow convention
3. **Keep PRs small** - Max 400 lines changed
4. **Update CHANGELOG** - On every feature/fix
5. **Bump version** - On every merge to develop
6. **Tag releases** - On every main merge
7. **Delete merged branches** - Keep repo clean
8. **Resolve conflicts locally** - Before PR
9. **Test before PR** - CI should be green
10. **Link tickets** - In commit message

### DON'Ts ❌

1. **Don't commit to main directly** - Use PRs!
2. **Don't force push to protected branches** - Ever!
3. **Don't merge without reviews** - Wait for approvals
4. **Don't skip version bumps** - Mandatory!
5. **Don't skip CHANGELOG** - Document everything
6. **Don't commit secrets** - Use config/ (in .gitignore)
7. **Don't merge failing CI** - Fix tests first
8. **Don't create huge PRs** - Split into smaller ones
9. **Don't bypass reviews** - Even for "small" changes
10. **Don't rebase main/staging** - Only merge!

---

## 🔍 Code Review Standards

### What Reviewers Check

**Code Quality:**
- Follows DEVELOPMENT_GUIDELINES.md
- No code smells
- Proper error handling
- Logging with error codes

**Testing:**
- Tests included for new code
- Existing tests still pass
- Edge cases covered

**Documentation:**
- Error codes in ERROR_CODES.md
- CHANGELOG.md updated
- Code comments for complex logic
- README.md if API changed

**Security:**
- No hardcoded secrets
- No SQL injection risks
- Input validation present
- Authentication/Authorization correct

**Performance:**
- No N+1 queries
- Efficient algorithms
- Caching where appropriate

### Review Comments

```
✅ LGTM - Looks good to me (approve)
💭 Nice! - Positive feedback
❓ Question: Why...? - Asking for clarification
💡 Suggestion: Could we...? - Improvement idea
🔄 Request: Please change... - Change request
🚨 Blocker: Must fix... - Critical issue
```

---

## 🏷️ Version & Release Management

### Version Bumping

**On every merge to develop:**
```bash
# Backend
cd backend
mvn versions:set -DnewVersion=2.1.0-SNAPSHOT
mvn versions:commit

# Frontend
cd frontend
npm version minor  # or patch/major
```

### Tagging Releases

**On every merge to main:**
```bash
git checkout main
git pull
git tag backend-v2.1.0
git tag frontend-v2.1.0
git push --tags
```

### Changelog Format

**Every PR must update CHANGELOG.md:**
```markdown
## [2.1.0] - 2025-10-21

### Added
- Dark mode support [FRONTEND_FEATURE_001]
- User profile page [FRONTEND_PAGE_008]

### Fixed
- Login timeout issue [AUTH_FIX_001]

**Author**: Moritz F. Becker
**Type**: Feature Release
```

---

## 🚨 Emergency Procedures

### Critical Production Bug

1. **Create hotfix immediately:**
   ```bash
   git checkout main
   git checkout -b hotfix/CRITICAL-description
   ```

2. **Fix and test locally**

3. **Fast-track PR to main:**
   ```bash
   gh pr create --base main --title "[URGENT] Critical fix"
   ```

4. **Notify team** - Slack/Email immediately

5. **Get fast approval** - 1 senior reviewer

6. **Merge and tag:**
   ```bash
   git checkout main && git pull
   git tag backend-v2.0.1
   git push --tags
   ```

7. **Deploy to production** - Immediately

8. **Backport to develop:**
   ```bash
   git checkout develop
   git merge main
   git push
   ```

---

## 📊 Workflow Diagram

```
┌─────────────────────────────────────────────────────────┐
│  DEVELOPER                                              │
│  ↓                                                      │
│  feature/CONFIG-123  (local development)                │
│  ↓ (commit frequently)                                  │
│  Push to origin/feature/CONFIG-123                      │
│  ↓                                                      │
│  CREATE PULL REQUEST → develop                          │
│  ↓                                                      │
│  CODE REVIEW (1 approval)                               │
│  ↓                                                      │
│  ✅ MERGE to develop (Squash & Merge)                   │
│  ↓                                                      │
│  CI/CD → Auto-deploy to DEV environment                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  RELEASE MANAGER                                        │
│  ↓                                                      │
│  release/v2.1.0 from develop                            │
│  ↓ (version bump, changelog, final fixes)               │
│  PR → staging                                           │
│  ↓                                                      │
│  QA TESTING on staging                                  │
│  ↓                                                      │
│  PR → main (2 approvals)                                │
│  ↓                                                      │
│  ✅ MERGE to main                                       │
│  ↓                                                      │
│  TAG: backend-v2.1.0, frontend-v2.1.0                   │
│  ↓                                                      │
│  CI/CD → Auto-deploy to PRODUCTION                      │
│  ↓                                                      │
│  Merge back to develop                                  │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 GitHub Settings

### Required Setup

1. **Create branches:**
   ```bash
   git checkout -b develop
   git push origin develop

   git checkout -b staging
   git push origin staging
   ```

2. **Configure branch protection** (Settings → Branches)

3. **Add team members** (Settings → Collaborators)

4. **Setup CI/CD** (GitHub Actions)

5. **Configure required reviewers** (CODEOWNERS file)

### CODEOWNERS File

Create `.github/CODEOWNERS`:
```
# Global owners
* @tech-lead

# Backend
/backend/ @backend-team @tech-lead

# Frontend
/frontend/ @frontend-team @tech-lead

# Docs
/*.md @tech-lead

# Critical files
/backend/config-server/ @tech-lead @devops
/backend/shared/ @tech-lead
```

---

## 📚 Additional Resources

- **DEVELOPMENT_GUIDELINES.md** - Coding standards
- **VERSION_MANAGEMENT.md** - Versioning rules
- **ERROR_CODES.md** - Error code reference
- **CHANGELOG.md** - Version history

---

**Built with ❤️ for Enterprise-Level Git Management**

**Author:** Moritz F. Becker - Helped by Claude AI
**Version:** 1.0.0
**Date:** 2025-10-21
