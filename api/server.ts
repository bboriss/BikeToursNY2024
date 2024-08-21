import express from 'express';
import authRoutes from './routes/authRoutes';
import tourRoutes from './routes/tourRoutes';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);

mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})
.catch((error) => {
  console.error('Database connection error:', error);
});
