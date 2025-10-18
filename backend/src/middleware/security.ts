import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

export function security({ origin }: { origin: string }) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
  });

  const speed = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 100,
    delayMs: 250
  });

  return [
    helmet({
      contentSecurityPolicy: false
    }),
    cors({ origin, credentials: true }),
    limiter,
    speed
  ];
}
