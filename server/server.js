import app from './app.js';
import config from './config/index.js';

const { port, nodeEnv } = config;

app.listen(port, () => {
  console.log(`\n  🚀 Portfolio API server running`);
  console.log(`     Environment: ${nodeEnv}`);
  console.log(`     Port:        ${port}`);
  console.log(`     URL:         http://localhost:${port}\n`);
});
