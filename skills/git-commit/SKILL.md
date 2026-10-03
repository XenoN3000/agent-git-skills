---
name: git-commit
description: >-
  Guide and automate Git staging and committing workflows.
  Use when the user asks to commit changes, stage files, write commit messages,
  or manage git commit history.
---

# Git Commit Workflow

This skill guides staging and committing changes safely and cleanly using Conventional Commits.

## Workflow Steps

### 1. Inspect Status and Diff
Before staging anything, check what changed to avoid committing unintended files:
```bash
git status --short
git diff --stat
```

For detailed inspection of changes:
```bash
# Review unstaged modifications
git diff

# Review untracked files
git status -u
```

### 2. Stage Changes
Stage only the relevant files for the logical unit of work.

```bash
# Stage specific files (recommended)
git add <path/to/file1> <path/to/file2>

# Stage all tracked modifications (excluding untracked)
git add -u

# Stage all changes in current directory
git add .
```

> [!WARNING]
> Never stage files containing sensitive data (`.env`, private keys, passwords, credentials, tokens) or build artifacts (`target/`, `node_modules/`, `dist/`). Verify with `git status` after staging.

### 3. Review Staged Diff
Verify exactly what is going into the commit:
```bash
git diff --cached --stat
```

### 4. Create Commit with Conventional Message
Write a clear, concise commit message following Conventional Commits format:

```text
<type>(<optional-scope>): <imperative description>

[optional body explaining why and what changed]

[optional footer, e.g. Closes #123]
```

**Common Types:**
- `feat`: A new user-facing feature or capability
- `fix`: A bug fix
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding or correcting tests
- `docs`: Documentation updates only
- `chore`: Build scripts, dependencies, or tool configuration
- `style`: Formatting, semicolons, whitespace (no logic change)

**Examples:**
```bash
# Single-line commit
git commit -m "feat(ui): add real-time log event streaming to dashboard"

# Multi-line commit
git commit -m "fix(connection): preserve log receiver across connection lifecycle" \
           -m "Prevent the mpsc receiver from being dropped when execute_connect returns."
```

### 5. Verify the Result
Ensure the commit was created cleanly:
```bash
git log -1 --stat
git status
```
