import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import listingRouter from './routes/listingRoute.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import connectDB from './config/db.js';
import cors from 'cors';

dotenv.config();

/*  DB Connection   */
await connectDB();

const __dirname = path.resolve();

/*  Server Setup    */
const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'https://devtt-real-estate.netlify.app',
}));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}!`);
});


/*  Routes   */
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

/*  Error Middleware    */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
