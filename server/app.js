import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import config from './config/index.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// Body parsing
app.use(express.json({ limit: '10kb' }));

// Rate limiting for contact endpoint
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Routes
app.use('/api/contact', contactLimiter, contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

export default app;
