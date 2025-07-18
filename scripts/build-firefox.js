const fs = require('fs-extra');
const path = require('path');

async function buildFirefox() {
  const distDir = path.join(__dirname, '..', 'dist', 'firefox');
  const sourceDir = path.join(__dirname, '..');
  
  console.log('Building Firefox extension...');
  
  // Clean and create dist directory
  await fs.ensureDir(distDir);
  await fs.emptyDir(distDir);
  
  // Files to copy
  const filesToCopy = [
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
  
  // Copy Firefox-specific manifest
  const firefoxManifestPath = path.join(sourceDir, 'manifest_firefox.json');
  const manifestDestPath = path.join(distDir, 'manifest.json');
  
  if (await fs.pathExists(firefoxManifestPath)) {
    await fs.copy(firefoxManifestPath, manifestDestPath);
    console.log('✓ Copied Firefox manifest');
  } else {
    console.error('❌ Firefox manifest not found!');
    process.exit(1);
  }
  
  console.log('✅ Firefox extension built successfully!');
  console.log(`📦 Output: ${distDir}`);
}

buildFirefox().catch(console.error);