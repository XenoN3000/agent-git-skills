---
name: git-workflow
description: >-
  Comprehensive guide and runbook for standard Git workflows including
  branch creation, switching, committing, pulling, pushing, merging, and resetting.
  Use when the user asks for git assistance or needs an end-to-end version control procedure.
---

# Complete Git Workflow Guide

This skill provides an integrated reference and standard operating procedures for the complete Git development cycle.

```
       [ git switch -c feat/xyz ]
                   |
                   v
         [ Edit & Test Code ]
                   |
                   v
           [ git status / diff ]
                   |
                   v
            [ git add <files> ]
                   |
                   v
    [ git commit -m "feat(...): ..." ]
                   |
                   v
          [ git pull --rebase ]
                   |
                   v
         [ git push -u origin ]
```

---

## Operations Directory

| Operation | Command | Dedicated Skill |
| :--- | :--- | :--- |
| **Create Branch** | `git switch -c <branch-name>` | [git-branch](../git-branch/SKILL.md) |
| **Switch Branch** | `git switch <branch-name>` | [git-branch](../git-branch/SKILL.md) |
| **Stage & Commit** | `git add <files> && git commit -m "..."` | [git-commit](../git-commit/SKILL.md) |
| **Pull Updates** | `git pull --rebase origin <branch>` | [git-pull](../git-pull/SKILL.md) |
| **Push Upstream** | `git push -u origin <branch>` | [git-push](../git-push/SKILL.md) |
| **Merge Branch** | `git merge <feature-branch>` | [git-merge](../git-merge/SKILL.md) |
| **Undo / Reset** | `git reset --soft HEAD~1` / `git restore` | [git-reset](../git-reset/SKILL.md) |
| **Stash Changes** | `git stash push -m "..."` / `git stash pop` | [git-stash](../git-stash/SKILL.md) |
| **Rebase & Cleanup** | `git rebase -i <base>` / `git rebase <upstream>` | [git-rebase](../git-rebase/SKILL.md) |

---

## Standard Feature Lifecycle

### 1. Start from Main
```bash
git switch main
git pull --ff-only
```

### 2. Create Feature Branch
```bash
git switch -c feat/feature-name
```

### 3. Work and Commit Cleanly
```bash
# Verify changes
git status
git diff

# Stage and commit
git add <files>
git commit -m "feat(scope): concise description"
```

### 4. Keep Branch Up to Date
```bash
git fetch origin
git rebase origin/main
```

### 5. Publish Branch
```bash
git push -u origin feat/feature-name
```

### 6. Merge & Clean Up
```bash
git switch main
git pull --ff-only
git merge --no-ff feat/feature-name
git push origin main
git branch -d feat/feature-name
```

---

## Safety Golden Rules
1. **Never commit secrets**: Check `git status` before adding files.
2. **Never force push to shared branches**: Only use `--force-with-lease` on personal feature branches.
3. **Check diff before reset**: Know whether you want `--soft`, `--mixed`, or `--hard` before running `git reset`.
4. **Use reflog for emergencies**: Almost any commit or state can be recovered via `git reflog`.
