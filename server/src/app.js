import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './utils/logger.js';
import authRoutes from './routes/authRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import rentalRoutes from './routes/rentalRoutes.js';

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

// Log all incoming requests
app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url }, 'Incoming request');
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/rentals', rentalRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Rovo API!' });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Rovo API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
