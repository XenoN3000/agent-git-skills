#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SOURCE_SKILLS_DIR = path.resolve(__dirname, '..', 'skills');

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Antigravity Git Skills Installer
================================

Installs standard Git workflow skills for Google Antigravity (AGY).

Usage:
  npx antigravity-git-skills [options]
  # Or directly from GitHub:
  npx github:<username>/antigravity-git-skills [options]

Options:
  --global, -g    Install skills globally for all projects (Default: ~/.gemini/config/skills/)
  --project, -p   Install skills into current project directory (.agents/skills/)
  --list, -l      List all bundled Git skills
  --help, -h      Show this help message
`);
  process.exit(0);
}

const skills = fs.readdirSync(SOURCE_SKILLS_DIR).filter(item => {
  const stat = fs.statSync(path.join(SOURCE_SKILLS_DIR, item));
  return stat.isDirectory() && fs.existsSync(path.join(SOURCE_SKILLS_DIR, item, 'SKILL.md'));
});

if (args.includes('--list') || args.includes('-l')) {
  console.log(`\nBundled Git Skills (${skills.length}):\n`);
  for (const skill of skills) {
    console.log(`  - ${skill}`);
  }
  console.log('');
  process.exit(0);
}

const isProject = args.includes('--project') || args.includes('-p');
const homedir = os.homedir();

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('\n🚀 Installing Antigravity Git Skills...\n');

if (isProject) {
  const targetDir = path.resolve(process.cwd(), '.agents', 'skills');
  console.log(`Mode: Project-Local -> ${targetDir}`);
  for (const skill of skills) {
    const src = path.join(SOURCE_SKILLS_DIR, skill);
    const dest = path.join(targetDir, skill);
    copyDir(src, dest);
    console.log(`  ✓ ${skill}`);
  }
  console.log('\n✨ Installed project-local Git skills in .agents/skills/\n');
} else {
  const globalDest = path.join(homedir, '.gemini', 'config', 'skills');
  console.log(`Mode: Global -> ${globalDest}`);
  
  // 1. Copy to ~/.gemini/config/skills/
  for (const skill of skills) {
    const src = path.join(SOURCE_SKILLS_DIR, skill);
    const dest = path.join(globalDest, skill);
    copyDir(src, dest);
    console.log(`  ✓ ${skill}`);
  }

  // 2. Ensure ~/.gemini/config/skills.json registers the path
  const configJsonPath = path.join(homedir, '.gemini', 'config', 'skills.json');
  try {
    let configData = { entries: [{ path: '~/.gemini/config/skills' }] };
    if (fs.existsSync(configJsonPath)) {
      try {
        const raw = fs.readFileSync(configJsonPath, 'utf8');
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.entries)) {
          const exists = parsed.entries.some(e => e.path && e.path.includes('.gemini/config/skills'));
          if (!exists) {
            parsed.entries.push({ path: '~/.gemini/config/skills' });
          }
          configData = parsed;
        }
      } catch (_) {}
    }
    fs.mkdirSync(path.dirname(configJsonPath), { recursive: true });
    fs.writeFileSync(configJsonPath, JSON.stringify(configData, null, 2) + '\n');
    console.log(`  ✓ Configured ~/.gemini/config/skills.json`);
  } catch (err) {
    console.warn(`  ⚠ Note: Could not update skills.json: ${err.message}`);
  }

  // 3. Also sync to antigravity builtin skills dirs if they exist
  const builtinTargets = [
    path.join(homedir, '.gemini', 'antigravity', 'builtin', 'skills'),
    path.join(homedir, '.gemini', 'antigravity-cli', 'builtin', 'skills'),
    path.join(homedir, '.gemini', 'antigravity-ide', 'builtin', 'skills'),
  ];

  for (const bTarget of builtinTargets) {
    if (fs.existsSync(bTarget)) {
      for (const skill of skills) {
        copyDir(path.join(SOURCE_SKILLS_DIR, skill), path.join(bTarget, skill));
      }
    }
  }

  console.log('\n✨ Global Git skills installed successfully!');
  console.log('Antigravity will automatically use them across all projects on this machine.\n');
}
