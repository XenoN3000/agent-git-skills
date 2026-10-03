---
name: git-merge
description: >-
  Merge branches, handle fast-forward and merge commits, perform squash merges,
  and resolve merge conflicts. Use when the user asks to merge a branch, integrate
  features into main, or resolve merge conflicts.
---

# Git Merge Workflow

This skill guides integrating branch changes safely, choosing the right merge strategy, and resolving merge conflicts systematically.

## Workflow Steps

### 1. Preparation
Ensure the working tree is clean on the target branch before merging:
```bash
# Switch to the target branch (e.g., main or dev)
git switch <target-branch>

# Update target branch to latest remote state
git pull --ff-only

# Check status
git status
```

### 2. Choose Merge Strategy

#### Option A: Fast-Forward Merge (Default when possible)
Linear history without an extra merge commit:
```bash
git merge <feature-branch>
```

#### Option B: Explicit Merge Commit (`--no-ff`)
Preserves the feature branch grouping in the Git history graph:
```bash
git merge --no-ff -m "merge: integrate <feature-branch> into <target-branch>" <feature-branch>
```

#### Option C: Squash Merge (`--squash`)
Condenses all commits from the feature branch into a single staged change on the target branch:
```bash
# 1. Merge and squash all commits into the working tree
git merge --squash <feature-branch>

# 2. Review staged changes
git diff --cached --stat

# 3. Commit the squashed changes with a concise message
git commit -m "feat(<scope>): <summary of integrated feature>"
```

### 3. Handling Conflicts

If Git encounters overlapping edits, it pauses with `CONFLICT (content): Merge conflict in <file>`:

1. **List conflicted files**:
   ```bash
   git status --short
   # Conflicted files show as 'UU' (both modified)
   ```

2. **Inspect and resolve conflict markers**:
   Open each conflicted file and locate markers:
   ```text
   <<<<<<< HEAD (current branch)
   Current branch code
   =======
   Incoming branch code
   >>>>>>> <feature-branch>
   ```
   Choose the correct combined logic, delete the marker lines (`<<<<<<<`, `=======`, `>>>>>>>`), and save the file.

3. **Stage resolved files**:
   ```bash
   git add <resolved-file>
   ```

4. **Complete the merge**:
   ```bash
   git commit -m "merge: resolve conflicts and integrate <feature-branch>"
   ```

   *To cancel and return to pre-merge state at any point*:
   ```bash
   git merge --abort
   ```

### 4. Verification
Run test suites and linters to verify the integrated codebase:
```bash
cargo test
git log -3 --graph --oneline
```
