---
name: git-reset
description: >-
  Undo commits, unstage files, discard local edits, and recover lost commits.
  Use when the user asks to reset commits, unstage changes, undo commits,
  discard modifications, or restore files.
---

# Git Reset & Undo Workflow

This skill guides safely undoing commits, unstaging files, discarding edits, and recovering commits via `git reflog`.

## Reset Modes Cheat Sheet

| Mode | Moves `HEAD`? | Updates Index (Staging)? | Modifies Working Directory? | Use Case |
| :--- | :---: | :---: | :---: | :--- |
| **`--soft`** | Yes | No | No | Undo commit(s) to re-word message or group edits; changes remain staged. |
| **`--mixed`** (default) | Yes | Yes | No | Undo commit(s) and unstage; changes remain intact in working tree files. |
| **`--hard`** | Yes | Yes | **Yes (DESTRUCTIVE)** | Discard commits AND discard all uncommitted changes. Cannot be undone via standard undo. |

---

## Common Scenarios & Procedures

### 1. Unstage Files Without Modifying Working Tree
If files were accidentally added via `git add`:
```bash
# Unstage a specific file
git restore --staged <file>

# Unstage all staged files
git restore --staged .
# Legacy alternative: git reset HEAD
```

### 2. Discard Uncommitted Working Tree Changes
To revert a modified file back to `HEAD`:
```bash
# Discard changes in a specific file
git restore <file>

# Discard all unstaged changes across repository
git restore .

# Clean untracked files and directories (dry-run first)
git clean -nd
git clean -fd
```

### 3. Undo Last Commit(s) Safely

#### Keep changes staged to re-commit immediately:
```bash
git reset --soft HEAD~1
```

#### Keep changes in working tree to edit further:
```bash
git reset HEAD~1
```

### 4. Hard Reset (Discard Everything)
> [!CAUTION]
> `git reset --hard` destroys uncommitted changes in your working tree! Confirm working tree state with `git status` first.

```bash
# Reset current branch and working tree to previous commit
git reset --hard HEAD~1

# Reset current branch and working tree to match origin
git reset --hard origin/$(git branch --show-current)
```

### 5. Emergency Recovery via `reflog`
If commits or branch states were lost through an accidental hard reset or branch deletion, Git preserves a journal of all `HEAD` movements in the reflog:

1. Inspect the reflog:
   ```bash
   git reflog -n 10
   ```
2. Identify the commit hash before the destructive operation (e.g. `HEAD@{1}`).
3. Restore the state:
   ```bash
   # Reset current branch back to the lost state
   git reset --hard HEAD@{1}

   # Or create a recovery branch at that commit
   git branch recovery-branch HEAD@{1}
   ```
