# Agent Git Skills 🚀
 
A complete suite of modular Git workflow skills for **AI coding agents** and **Google Antigravity (AGY)**, complete with an instant `npx` installer.
 
---
 
## ⚡ Instant Installation
 
### 1. Install Globally (Recommended)
Installs all Git skills into `~/.gemini/config/skills/` so they are automatically available across **all repositories and projects** on your machine:
 
```bash
# If published to npm:
npx agent-git-skills

# Or directly from your GitHub repository (zero setup required!):
npx github:XenoN3000/agent-git-skills
```
 
### 2. Install Project-Locally
Installs skills into the current repository (`.agents/skills/`) to share with teammates via version control:
 
```bash
npx agent-git-skills --project
# or
npx github:XenoN3000/agent-git-skills --project
```
 
### 3. List Bundled Skills
```bash
npx agent-git-skills --list
```

---

## 📦 What's Included

| Skill | Description | Triggers / Use Cases |
| :--- | :--- | :--- |
| **`git-branch`** | Branch creation & switching | `git switch -c <branch>`, switching, tracking, renaming, and branch cleanup. |
| **`git-commit`** | Staging & Conventional Commits | Staging specific files, drafting semantic commit messages (`feat:`, `fix:`), secret prevention. |
| **`git-pull`** | Fetch & Integrate updates | Remote pruning, fast-forward pulls, rebase pulls, stashing uncommitted work. |
| **`git-push`** | Safe remote pushes | Upstream tracking (`-u origin`), tag pushing, handling rejected non-fast-forward pushes, safe `--force-with-lease`. |
| **`git-merge`** | Branch merges & conflicts | Fast-forward merges, `--no-ff` merge commits, `--squash`, conflict marker resolution. |
| **`git-reset`** | Undo & Commit recovery | Unstaging (`git restore --staged`), discarding edits, soft/mixed/hard resets, `git reflog` emergency recovery. |
| **`git-workflow`** | Master lifecycle runbook | Integrated end-to-end standard development cycle and safety rules. |

---

## 🛠️ Publishing to GitHub & NPM

### Push to your GitHub Account:
```bash
# Initialize and commit
git init
git add .
git commit -m "feat: initial commit for agent-git-skills"

# Create repo on GitHub (or use GitHub Web UI)
# Using GitHub CLI:
gh repo create agent-git-skills --public --source=. --push

# Or manually add remote and push:
git remote add origin git@github.com:XenoN3000/agent-git-skills.git
git branch -M main
git push -u origin main
```

Once pushed to GitHub, anyone can run:
```bash
npx github:XenoN3000/agent-git-skills
```

### Publish to NPM (Optional):
```bash
npm login
npm publish --access public
```

Once published to npm, anyone can run:
```bash
npx agent-git-skills
```

---

## 📄 License
MIT © [Hosein Nahari](https://github.com/XenoN3000)
