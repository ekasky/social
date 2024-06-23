import dotenv from 'dotenv';
import express from 'express';
import { logger } from './utils/loggers';
import authRouter from './routes/authRoutes';
import connectDb from './utils/connectDb';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 4000;

connectDb();

app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(PORT, () => {

    logger('INFO', `Listening on port ${PORT}`, true);

});