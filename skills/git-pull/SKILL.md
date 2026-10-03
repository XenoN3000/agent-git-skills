---
name: git-pull
description: >-
  Fetch and integrate changes from a remote repository into the current branch.
  Use when the user asks to pull changes, sync with remote, update branches, or handle pull conflicts.
---

# Git Pull Workflow

This skill guides fetching and integrating changes from a remote repository while handling local modifications and conflicts safely.

## Workflow Steps

### 1. Check Working Tree Status
Ensure the working tree is clean or changes are safely stashed before pulling:
```bash
git status
```

If you have uncommitted changes:
```bash
# Save uncommitted work to stash
git stash push -m "WIP before pull $(date +%Y-%m-%d_%H:%M)"
```

### 2. Fetch Remote Updates
Fetch remote branches and prune deleted references to inspect incoming commits before merging:
```bash
git fetch --prune origin

# Inspect incoming commits that are on origin but not in local branch
git log HEAD..origin/$(git branch --show-current) --oneline
```

### 3. Pull Changes
Choose the appropriate strategy:

#### Option A: Fast-Forward Only (Safest Default)
Fails cleanly if the branches have diverged, preventing unexpected merge commits:
```bash
git pull --ff-only
```

#### Option B: Rebase (Maintains Clean Linear History)
Replays local commits on top of the fetched remote commits:
```bash
git pull --rebase origin $(git branch --show-current)
```

#### Option C: Standard Merge
Merges remote branch and creates a merge commit if branches have diverged:
```bash
git pull origin $(git branch --show-current)
```

### 4. Restore Stashed Work (If Applicable)
If changes were stashed in Step 1:
```bash
git stash pop
```

### 5. Conflict Resolution (If Conflicts Occur)
If conflicts are reported during rebase or merge:

1. Identify conflicted files:
   ```bash
   git status
   ```
2. Open each conflicted file, look for conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), and resolve the conflict.
3. Mark resolved files:
   ```bash
   git add <resolved-file>
   ```
4. Continue or abort:
   - For rebase: `git rebase --continue` (or abort with `git rebase --abort`)
   - For merge: `git commit -m "Merge remote-tracking branch 'origin/...'"` (or abort with `git merge --abort`)

### 6. Verify
```bash
git status
git log -3 --oneline
```
