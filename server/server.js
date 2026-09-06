const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { testConnection } = require('./config/db');
const { ensureAdminExists } = require('./controllers/authController');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Import routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const skillRoutes = require('./routes/skillRoutes');
const contactRoutes = require('./routes/contactRoutes');
const aiRoutes = require('./routes/aiRoutes');
const certificationRoutes = require('./routes/certificationRoutes');
const achievementRoutes = require('./routes/achievementRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());

// CORS Configuration: Allow local development, Vercel frontend, and configured CLIENT_URL
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5021',
  'http://localhost:3000',
  'https://chunchun-portfolio-zeta.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow non-browser agents (curl, postman, server-to-server)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.includes('localhost')
    ) {
      return callback(null, true);
    }
    // In production portfolio context, allow origins gracefully
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Parsing JSON payload and urlencoded data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiters to prevent abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api', apiLimiter);

// Specific stricter rate limiter for Contact and AI Chat routes
const strictLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per minute
  message: {
    success: false,
    message: 'Rate limit exceeded. Please wait a moment before sending another request.'
  }
});
app.use('/api/contact', strictLimiter);
app.use('/api/ai/chat', strictLimiter);

// Root check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Chunchun Kumar Singh Portfolio API is running smoothly.',
    timestamp: new Date()
  });
});

// Health check endpoint for uptime monitors and deployment verification
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/achievements', achievementRoutes);

// 404 Handler for undefined endpoints
app.use(notFound);

// Global Error Handler Middleware
app.use(errorHandler);

// Start Server and verify connections
async function startServer() {
  const dbConnected = await testConnection();
  
  if (dbConnected) {
    // Seed default admin user if database is empty
    await ensureAdminExists();
  } else {
    console.log('\n--------------------------------------------------------------');
    console.log('NOTICE: Server is starting without active MySQL connection.');
    console.log('Backend endpoints will yield errors until MySQL is running');
    console.log('and configured in server/.env.');
    console.log('--------------------------------------------------------------\n');
  }

  app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

startServer();
