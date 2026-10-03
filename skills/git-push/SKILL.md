---
name: git-push
description: >-
  Push local commits, branches, and tags to remote repositories safely.
  Use when the user asks to push changes, publish a branch, set upstream tracking, or update remote.
---

# Git Push Workflow

This skill guides pushing commits and branches to a remote repository safely, verifying upstream status and avoiding destructive force pushes.

## Workflow Steps

### 1. Pre-Push Check
Verify local commits that have not been pushed to the remote yet:
```bash
# Check branch status and ahead/behind counts
git status -sb

# Inspect commits that will be pushed
git log @{u}..HEAD --oneline 2>/dev/null || git log -n 5 --oneline
```

Ensure tests and builds pass before pushing code to a shared repository:
```bash
cargo test --quiet
```

### 2. Push Changes

#### A. First Push of a New Branch
Set upstream tracking so future `git pull` and `git push` commands know the target remote:
```bash
git push -u origin $(git branch --show-current)
```

#### B. Pushing to an Existing Tracked Branch
```bash
git push
```

#### C. Pushing Tags
```bash
# Push a specific tag
git push origin <tag-name>

# Push all local tags
git push origin --tags
```

### 3. Handling Rejected Pushes

If the remote has newer commits, git will reject the push with `[rejected - non-fast-forward]`:
1. Pull and rebase remote updates first:
   ```bash
   git pull --rebase
   ```
2. Verify all tests still pass after rebase.
3. Push again:
   ```bash
   git push
   ```

### 4. Safe Force Pushing (When Necessary)
> [!CAUTION]
> Never use `git push --force` on shared or protected branches (`main`, `master`, `release`).
> If a feature branch was rebased and force-push is required, ALWAYS use `--force-with-lease` so you don't accidentally overwrite teammates' work:

```bash
git push --force-with-lease origin $(git branch --show-current)
```

### 5. Verify Remote Status
```bash
git status -sb
```
Confirm that local and remote branches are in sync (`Your branch is up to date with 'origin/<branch>'`).
