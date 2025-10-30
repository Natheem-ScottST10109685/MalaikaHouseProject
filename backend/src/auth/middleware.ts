import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from './tokens.js';

export interface AuthUser {
  id: string;
  email?: string;
  role?: 'ADMIN' | 'PARENT' | 'PARTNER' | 'STAFF';
  sub?: string;
  uid?: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request { user?: AuthUser; }
  }
}

function normalizePayload(payload: any): AuthUser {
  const id = payload.id ?? payload.sub ?? payload.uid;
  return {
    id,
    email: payload.email,
    role: payload.role as AuthUser['role'],
    sub: payload.sub,
    uid: payload.uid,
    iat: payload.iat,
    exp: payload.exp,
  };
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const hdr = req.headers.authorization;
  if (!hdr?.startsWith('Bearer ')) {
    return res.status(401).json({ error: { code: 'UNAUTHENTICATED' } });
  }
  try {
    const payload = verifyAccessToken(hdr.slice(7)) as any;
    if (!payload || typeof payload !== 'object') {
      return res.status(401).json({ error: { code: 'INVALID_TOKEN' } });
    }
    const u = normalizePayload(payload);
    if (!u.id) {
      return res.status(401).json({ error: { code: 'INVALID_TOKEN', message: 'Missing subject' } });
    }
    req.user = u;
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
    const payload = verifyAccessToken(hdr.slice(7)) as any;
    if (!payload || typeof payload !== 'object') {
      return res.status(401).json({ error: { code: 'INVALID_TOKEN' } });
    }
    const u = normalizePayload(payload);
    if (!u.id) {
      return res.status(401).json({ error: { code: 'INVALID_TOKEN', message: 'Missing subject' } });
    }
    if (u.role !== 'ADMIN') {
      return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Admins only' } });
    }
    req.user = u;
    next();
  } catch {
    return res.status(401).json({ error: { code: 'INVALID_TOKEN' } });
  }
}
