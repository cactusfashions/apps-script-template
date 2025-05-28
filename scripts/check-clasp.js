const { execSync } = require('child_process');

try {
  execSync('clasp -v', { stdio: 'ignore' });
  console.log('✅ clasp is already installed globally.');
} catch (error) {
  console.log('⏳ Installing clasp globally...');
  try {
    execSync('npm install -g @google/clasp', { stdio: 'inherit' });
    console.log('✅ clasp installed globally.');
  } catch (installErr) {
    console.error('❌ Failed to install clasp globally. Please install it manually: npm install -g @google/clasp');
    process.exit(1);
  }
}
