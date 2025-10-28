import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from './tokens.js';

export interface AuthUser {
  sub: string;
  role?: 'ADMIN' | 'PARENT';
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request { user?: AuthUser; }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const hdr = req.headers.authorization;
  if (!hdr?.startsWith('Bearer ')) {
    return res.status(401).json({ error: { code: 'UNAUTHENTICATED' } });
  }
  try {
    const payload = verifyAccessToken(hdr.slice(7)) as AuthUser | string;
    if (typeof payload === 'string') {
      return res.status(401).json({ error: { code: 'INVALID_TOKEN' }});
    }
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: { code: 'INVALID_TOKEN' } });
  }
}

export function requireAuthAdmin(req: Request, res: Response, next: NextFunction) {
  const hdr = req.headers.authorization;
  if (!hdr?.startsWith('Bearer ')) {
    return res.status(401).json({ error: { code: 'UNAUTHENTICATED' } });
  }
  try {
    const payload = verifyAccessToken(hdr.slice(7)) as AuthUser | string;
    if (typeof payload === 'string') {
      return res.status(401).json({ error: { code: 'INVALID_TOKEN' }});
    }
    if (payload.role !== 'ADMIN') {
      return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Admins only' } });
    }
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: { code: 'INVALID_TOKEN' } });
  }
}
