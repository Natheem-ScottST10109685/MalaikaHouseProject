import { Request, Response, NextFunction } from 'express';
export function requireRole(...roles: Array<'ADMIN' | 'PARENT'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) {
      return res.status(403).json({ error: { code: 'FORBIDDEN' } });
    }
    next();
  };
}