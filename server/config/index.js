import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',

  // Email config (for future integration)
  email: {
    service: process.env.EMAIL_SERVICE || null,
    host: process.env.EMAIL_HOST || null,
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    user: process.env.EMAIL_USER || null,
    pass: process.env.EMAIL_PASS || null,
    from: process.env.EMAIL_FROM || null,
    to: process.env.EMAIL_TO || null,
  },
};

export default config;
