import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';

// * Load env vars
dotenv.config({ path: './config/.env' });

import connectDB from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import categoriesRoutes from './routes/categories.js';
import carsRoutes from './routes/cars.js';
import authRoutes from './routes/auth.js';

const app = express();

// Wiring up middlewares
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  })
);
app.use(helmet()); // adds many powerful response headers that makes our app more secure.
app.use(mongoSanitize()); // specifically prevent us from MongoDB Operator Injection.
app.use(cookieParser()); // available cookies on req.cookies

connectDB();

// Mounting routes
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/cars', carsRoutes);
app.use('/api/v1/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});
