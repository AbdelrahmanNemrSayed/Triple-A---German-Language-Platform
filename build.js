import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'public', '.system_generated'].includes(entry.name)) continue;
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Target dist directory
console.log('📦 Building static artifacts for Vercel & PWA...');
fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(__dirname, 'dist', 'index.html'));
if (fs.existsSync(path.join(__dirname, 'manifest.webmanifest'))) {
  fs.copyFileSync(path.join(__dirname, 'manifest.webmanifest'), path.join(__dirname, 'dist', 'manifest.webmanifest'));
}
if (fs.existsSync(path.join(__dirname, 'sw.js'))) {
  fs.copyFileSync(path.join(__dirname, 'sw.js'), path.join(__dirname, 'dist', 'sw.js'));
}
copyRecursive(path.join(__dirname, 'assets'), path.join(__dirname, 'dist', 'assets'));
copyRecursive(path.join(__dirname, 'data'), path.join(__dirname, 'dist', 'data'));

// 2. Also populate public directory just in case
fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(__dirname, 'public', 'index.html'));
if (fs.existsSync(path.join(__dirname, 'manifest.webmanifest'))) {
  fs.copyFileSync(path.join(__dirname, 'manifest.webmanifest'), path.join(__dirname, 'public', 'manifest.webmanifest'));
}
if (fs.existsSync(path.join(__dirname, 'sw.js'))) {
  fs.copyFileSync(path.join(__dirname, 'sw.js'), path.join(__dirname, 'public', 'sw.js'));
}
copyRecursive(path.join(__dirname, 'assets'), path.join(__dirname, 'public', 'assets'));
copyRecursive(path.join(__dirname, 'data'), path.join(__dirname, 'public', 'data'));

console.log('✅ Static build complete! Both dist/ and public/ are populated with PWA files.');
