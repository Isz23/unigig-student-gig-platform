import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// 1. Gig Routes Import කිරීම
import gigRoutes from './routes/gigRoutes.js';

dotenv.config();

// Connect Database
connectDB();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Default Test Route
app.get('/', (req, res) => {
  res.send('🚀 UniGig Backend Running...');
});

// 2. Gig Module Routes Mount කිරීම
app.use('/api/gigs', gigRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});