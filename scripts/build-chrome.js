const fs = require('fs-extra');
const path = require('path');

async function buildChrome() {
  const distDir = path.join(__dirname, '..', 'dist', 'chrome');
  const sourceDir = path.join(__dirname, '..');
  
  console.log('Building Chrome extension...');
  
  // Clean and create dist directory
  await fs.ensureDir(distDir);
  await fs.emptyDir(distDir);
  
  // Files to copy
  const filesToCopy = [
    'manifest.json',
    'background.js',
    'popup.html',
    'accounts.js',
    'rules.js',
    'utils.js',
    'styles.css',
    'images'
  ];
  
  // Copy files
  for (const file of filesToCopy) {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(distDir, file);
    
    if (await fs.pathExists(sourcePath)) {
      await fs.copy(sourcePath, destPath);
      console.log(`✓ Copied ${file}`);
    } else {
      console.warn(`⚠ ${file} not found, skipping`);
    }
  }
  
  console.log('✅ Chrome extension built successfully!');
  console.log(`📦 Output: ${distDir}`);
}

buildChrome().catch(console.error);