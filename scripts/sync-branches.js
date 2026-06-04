#!/usr/bin/env node
/**
 * Sync shared content between main and restyling/solar-white branches
 * Excludes theme-only files: hitech.css, hitech.js
 * 
 * Usage:
 *   npm run sync:from-main      # Copy content from main to restyling/solar-white
 *   npm run sync:to-main        # Copy content from restyling/solar-white to main
 */

const { execSync } = require('child_process');
const path = require('path');

// Files that differ by design and should NOT be synced
const SKIP_FILES = new Set(['hitech.css', 'hitech.js']);

// Files/folders that SHOULD be synced (whitelist approach)
// Only these will be copied from source to target
const SYNC_PATHS = [
  'src/',
  'CLAUDE.md',
  'README.md',
  'package.json'
];

// Get arguments
const from = process.argv[2] || 'main';
const to = process.argv[3] || 'restyling/solar-white';

console.log(`\n📋 Syncing from "${from}" to "${to}"\n`);
console.log(`✅ Files/folders to sync:\n   ${SYNC_PATHS.join('\n   ')}\n`);
console.log(`🚫 Skipping (theme-only): ${Array.from(SKIP_FILES).join(', ')}\n`);

function run(cmd, description) {
  console.log(`  → ${description}...`);
  try {
    execSync(cmd, { stdio: 'inherit', shell: true });
  } catch (e) {
    console.error(`  ❌ Failed: ${description}`);
    process.exit(1);
  }
}

try {
  // 1. Save current state
  console.log('💾 Saving local changes...');
  try {
    execSync('git status --porcelain', { encoding: 'utf-8' });
    run('git stash', 'Stashing local changes');
  } catch (e) {
    // No changes to stash
  }

  // 2. Fetch latest from origin
  run('git fetch origin', 'Fetching latest from remote');

  // 3. Get list of files in source branch that match SYNC_PATHS
  console.log(`\n📂 Reading files from ${from}...`);
  let fileList = [];
  SYNC_PATHS.forEach(pathPattern => {
    try {
      const files = execSync(`git ls-tree -r --name-only origin/${from} -- ${pathPattern}`, { 
        encoding: 'utf-8' 
      }).trim().split('\n').filter(f => f);
      fileList.push(...files);
    } catch (e) {
      // Path might not exist in source branch
    }
  });
  
  // Remove duplicates and skip theme-only files
  fileList = [...new Set(fileList)].filter(f => !SKIP_FILES.has(f));

  console.log(`   Found ${fileList.length} files to sync\n`);

  // 4. Checkout target branch
  run(`git checkout origin/${to}`, `Checking out ${to}`);

  // 5. For each file, copy from source
  console.log(`📦 Copying files...\n`);
  fileList.forEach((file, idx) => {
    try {
      const content = execSync(`git show origin/${from}:${file}`, { encoding: 'utf-8' });
      const filePath = path.join(process.cwd(), file);
      const dir = path.dirname(filePath);
      
      // Create directories if needed
      require('fs').mkdirSync(dir, { recursive: true });
      
      // Write file
      require('fs').writeFileSync(filePath, content);
      
      if ((idx + 1) % 5 === 0 || idx === fileList.length - 1) {
        console.log(`   ✓ Copied ${idx + 1}/${fileList.length} files`);
      }
    } catch (e) {
      console.warn(`   ⚠️  Skipped ${file}: ${e.message}`);
    }
  });

  // 6. Stage all changes
  console.log(`\n📝 Staging changes...`);
  run('git add -A', 'Staging all changes');

  // 7. Check if there are changes to commit
  const status = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();
  
  if (!status) {
    console.log('\n✅ No changes to commit - branches are already in sync!\n');
    process.exit(0);
  }

  // 8. Commit
  const commitMsg = `sync: content from ${from}`;
  run(`git commit -m "${commitMsg}"`, 'Committing changes');

  // 9. Push to target branch
  run(`git push origin HEAD:${to}`, `Pushing to ${to}`);

  console.log(`\n✅ Sync complete! ${from} → ${to}\n`);

} catch (error) {
  console.error('\n❌ Sync failed:', error.message);
  process.exit(1);
}
