import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import { security } from './middleware/security.js';
import { errorHandler } from './middleware/errors.js';
import authRoutes from './auth/routes.js';
import userRoutes from './modules/users/routes.js';
import adminRoutes from './modules/admin/routes.js';
import parentRoutes from './modules/parents/routes.js';
import adminNotifications from './modules/admin/notifications.js';
import adminUsers from './modules/admin/users.js';
import adminActivity from './modules/admin/activity.js';
import adminIntegrations from './routes/adminIntegrationsStub.js'
import { requireAuth, requireAuthAdmin } from './auth/middleware.js';
import authResetRouter from "./routes/auth/reset.routes.js";
import newsRouter from "./modules/admin/news.js";
import adminChild from "./modules/admin/children.js";
import userNotifications from "./modules/notifications/user-notifications.js";
import parentAppointments from "./modules/parents/appointments.js";
import adminSubscriptions from "./modules/admin/subscriptions.js";
import parentSubscriptions from "./modules/parents/subscriptions.js";

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(...security({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));

app.get('/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.use(authRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use(parentRoutes);
app.use(adminNotifications);
app.use(adminUsers);
app.use(adminActivity);
app.use("/api/admin/integrations", requireAuthAdmin, adminIntegrations)
app.use(authResetRouter);
app.use(newsRouter);
app.use(adminChild);
app.use(userNotifications);
app.use(parentAppointments);
app.use(adminSubscriptions);
app.use(parentSubscriptions);

app.use(errorHandler);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
