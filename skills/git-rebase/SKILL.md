---
name: git-rebase
description: >-
  Rebase feature branches, perform interactive rebases, resolve rebase conflicts,
  and clean up commit history. Use when the user asks to rebase, squash commits,
  interactively edit history, or update branches cleanly.
---

# Git Rebase Workflow

This skill guides updating branch history cleanly, squashing/editing commits with interactive rebase, and resolving rebase conflicts.

---

## Common Scenarios & Commands

### 1. Update Feature Branch with Upstream Changes
Replay your branch commits on top of the latest `main` branch to keep a linear history:

```bash
# Fetch latest remote changes
git fetch origin

# Rebase current branch onto main
git rebase origin/main
```

> [!IMPORTANT]
> **The Golden Rule of Rebase:** Never rebase commits that have already been pushed to a public/shared branch that other team members are actively collaborating on.

---

### 2. Interactive Rebase (History Cleanup / Squashing)
Clean up local WIP commits before opening a pull request:

```bash
# Rebase the last N commits
git rebase -i HEAD~3

# Or rebase against the branch point
git rebase -i origin/main
```

In the editor that opens, choose an action for each commit:
- `pick` (`p`): Keep commit as-is
- `reword` (`r`): Keep commit content but rewrite the commit message
- `edit` (`e`): Pause rebase at this commit to amend files or messages
- `squash` (`s`): Melt commit into the previous commit and concatenate messages
- `fixup` (`f`): Melt commit into the previous commit and discard this commit's message
- `drop` (`d`): Completely remove this commit

---

### 3. Handling Rebase Conflicts

When Git encounters conflicting changes during a rebase:

1. **Check status:**
   ```bash
   git status
   ```
2. **Resolve conflicting files:**
   Open the files marked as conflicting, resolve the `<<<<<<<`, `=======`, `>>>>>>>` markers, and stage them:
   ```bash
   git add <resolved-file>
   ```
3. **Continue rebase:**
   ```bash
   git rebase --continue
   ```
   *(Do NOT run `git commit` during a rebase conflict!)*

4. **Abort if needed:**
   If something goes wrong and you want to restore the exact pre-rebase state:
   ```bash
   git rebase --abort
   ```

---

### 4. Pushing After Rebase
Because rebase rewrites commit hashes, pushing to an existing remote branch requires force-with-lease:

```bash
# Safely push rewritten history
git push --force-with-lease origin <branch-name>
```

> [!WARNING]
> Always use `--force-with-lease` rather than raw `--force` to avoid accidentally overwriting commits pushed by others.
