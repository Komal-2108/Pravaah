import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import traineeRoutes from './routes/traineeRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import syncRoutes from './routes/syncRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Security & Parsing Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logger (Development)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (config.nodeEnv !== 'test') {
      console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Root & Health Endpoints
app.get('/', (req, res) => {
  res.json({
    project: 'PRAVAAH',
    tagline: 'From Learning to Livelihood.',
    description: 'Offline-First Skill Intelligence & Verification Platform',
    status: 'online',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    database: 'connected',
    offline_sync_engine: 'active',
    ai_skill_engine: 'operational',
    timestamp: new Date().toISOString()
  });
});

// API Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/trainee', traineeRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/admin', adminRoutes);

// Public Certificate Verification Shortcut
app.get('/verify/:id', (req, res) => {
  res.redirect(`/api/certificates/verify/${req.params.id}`);
});

// Centralized Error Handling
app.use(errorHandler);

// Server Listening
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`
  ======================================================
  🌊 PRAVAAH API Server is Running
  ------------------------------------------------------
  📡 Port:           ${PORT}
  🌍 Environment:    ${config.nodeEnv}
  ⚡ Client URL:     ${config.clientUrl}
  🧠 Skill AI Layer: Active (/api/ai)
  📴 Offline Sync:   Active (/api/sync)
  ======================================================
  `);
});
