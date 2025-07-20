import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import authRoutes from './routes/auth';
import documentRoutes from './routes/document';
import auditRoutes from './routes/audit';
import dashboardRoutes from './routes/dashboard';

// Load .env.local if it exists, otherwise .env
const envPath = fs.existsSync(path.join(__dirname, '../.env.local'))
  ? path.join(__dirname, '../.env.local')
  : path.join(__dirname, '../.env');
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Connect to MongoDB
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch((err: unknown) => console.error('MongoDB connection error:', err));
} else {
  console.log('MongoDB URI not provided, running without database');
}

// Auth routes
app.use('/api/auth', authRoutes);
// Document routes
app.use('/api/documents', documentRoutes);
// Audit log routes
app.use('/api/audit', auditRoutes);
// Dashboard routes
app.use('/api/dashboards', dashboardRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Deep Engineering Backend API' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app; 