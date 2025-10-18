import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import { security } from './middleware/security.js';
import { errorHandler } from './middleware/errors.js';
import authRoutes from './auth/routes.js';
import userRoutes from './modules/users/routes.js';

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(...security({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));

app.get('/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.use(authRoutes);
app.use(userRoutes);

app.use(errorHandler);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
