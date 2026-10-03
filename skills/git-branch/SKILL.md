---
name: git-branch
description: >-
  Create, switch, list, rename, and manage Git branches.
  Use when the user asks to create a new branch, switch branches, checkout a branch,
  or list and clean up branches.
---

# Git Branch Management & Switching

This skill guides creating, switching, listing, and organizing Git branches using modern Git commands (`git switch` and `git branch`).

## Common Operations

### 1. Create and Switch to a New Branch
To create a new branch from current `HEAD` and switch to it immediately:
```bash
git switch -c <new-branch-name>
# Legacy equivalent: git checkout -b <new-branch-name>
```

To create a new branch based on a specific starting point (e.g., `main` or a commit):
```bash
git switch -c <new-branch-name> <start-point>
```

**Branch Naming Conventions:**
- Feature branches: `feat/<feature-name>` or `feature/<feature-name>`
- Bug fixes: `fix/<issue-name>` or `bugfix/<issue-name>`
- Refactoring: `refactor/<topic>`
- Experiments: `spike/<topic>` or `exp/<topic>`

### 2. Switch to an Existing Branch
```bash
# Switch to an existing local branch
git switch <branch-name>

# Switch back to the previous branch
git switch -

# Switch to a remote branch and create a local tracking branch
git switch <remote-branch-name>
```

> [!NOTE]
> If you have uncommitted changes that would be overwritten by switching branches, Git will prevent the switch. Use `git stash` to temporarily save changes before switching.

### 3. List Branches
```bash
# List local branches with latest commit info
git branch -v

# List all branches (including remote tracking branches)
git branch -a

# Check current branch name only
git branch --show-current
```

### 4. Rename a Branch
```bash
# Rename the current branch
git branch -m <new-name>

# Rename another local branch
git branch -m <old-name> <new-name>
```

### 5. Delete a Branch
```bash
# Delete a merged local branch safely
git branch -d <branch-name>

# Force-delete an unmerged local branch (use with caution)
git branch -D <branch-name>

# Delete a remote branch
git push origin --delete <branch-name>
```

## Verification
Confirm current active branch and working directory status:
```bash
git status
git branch --show-current
```
