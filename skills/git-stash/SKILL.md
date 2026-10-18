---
name: git-stash
description: >-
  Save, list, inspect, pop, apply, and manage stashed working directory changes.
  Use when the user asks to stash changes, switch tasks temporarily, inspect stashes,
  or restore stashed work.
---

# Git Stash Workflow

This skill guides safely stashing uncommitted modifications, switching contexts, and reapplying or managing saved stashes.

---

## Common Scenarios & Commands

### 1. Stash Uncommitted Changes

```bash
# Stash tracked working tree changes with a descriptive message
git stash push -m "work-in-progress: description of current task"

# Stash including untracked files
git stash push -u -m "work-in-progress with new files"

# Stash all files (including ignored files)
git stash push --all -m "complete workspace snapshot"
```

> [!TIP]
> Always provide a descriptive message with `-m` so you can identify the stash later.

---

### 2. View and Inspect Stashes

```bash
# List all stashed changes
git stash list

# View summary diff of the latest stash (stash@{0})
git stash show

# View full line-by-line diff of the latest stash
git stash show -p

# View diff of a specific stash
git stash show -p stash@{1}
```

---

### 3. Restore Stashed Changes

#### Option A: Apply and Remove from Stash List (`pop`)
```bash
# Pop the most recent stash
git stash pop

# Pop a specific stash index
git stash pop stash@{1}
```

#### Option B: Apply and Keep in Stash List (`apply`)
Useful if you want to test the stashed changes or apply them to multiple branches:
```bash
# Apply the most recent stash without deleting it
git stash apply

# Apply a specific stash
git stash apply stash@{1}
```

---

### 4. Create a Branch from a Stash
If applying a stash causes conflicts due to branch drift, create a new branch starting from the commit where the stash was created:
```bash
git stash branch <new-branch-name> stash@{0}
```

---

### 5. Cleaning Up Stashes

```bash
# Drop a specific stash
git stash drop stash@{0}

# Clear all stashes (CAUTION: cannot be undone!)
git stash clear
```

---

## Best Practices
1. **Name your stashes**: Avoid anonymous `git stash`; use `git stash push -m "context"`.
2. **Clean up old stashes**: Run `git stash list` periodically and drop obsolete stashes to prevent clutter.
3. **Handle conflicts gracefully**: If `git stash pop` conflicts, Git leaves the stash intact in the list. Resolve the conflict, commit, then run `git stash drop` manually.
