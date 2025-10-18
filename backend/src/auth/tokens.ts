import jwt, { Secret, JwtPayload, SignOptions } from 'jsonwebtoken';

const ACCESS_SECRET: Secret  = (process.env.ACCESS_TOKEN_SECRET  ?? 'dev_access_secret')  as Secret;
const REFRESH_SECRET: Secret = (process.env.REFRESH_TOKEN_SECRET ?? 'dev_refresh_secret') as Secret;

function toSeconds(envVal: string | undefined, fallbackSeconds: number): number {
  if (!envVal || envVal.trim() === '') return fallbackSeconds;

  const asNum = Number(envVal);
  if (Number.isFinite(asNum) && asNum > 0) return Math.floor(asNum);

  const m = envVal.trim().match(/^(\d+)\s*([smhd])$/i);
  if (!m) return fallbackSeconds;

  const value = parseInt(m[1], 10);
  const unit  = m[2].toLowerCase();
  const mult: Record<string, number> = { s: 1, m: 60, h: 3600, d: 86400 };

  return value > 0 ? value * mult[unit] : fallbackSeconds;
}

const ACCESS_TTL_S  = toSeconds(process.env.ACCESS_TOKEN_TTL,  15 * 60);
const REFRESH_TTL_S = toSeconds(process.env.REFRESH_TOKEN_TTL, 30 * 24 * 3600);

export function signAccessToken(payload: object): string {
  const opts: SignOptions = { expiresIn: ACCESS_TTL_S };
  return jwt.sign(payload, ACCESS_SECRET, opts);
}

export function signRefreshToken(payload: object): string {
  const opts: SignOptions = { expiresIn: REFRESH_TTL_S };
  return jwt.sign(payload, REFRESH_SECRET, opts);
}

export function verifyAccessToken(token: string): string | JwtPayload {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token: string): string | JwtPayload {
  return jwt.verify(token, REFRESH_SECRET);
}

export const accessMs  = () => ACCESS_TTL_S  * 1000;
export const refreshMs = () => REFRESH_TTL_S * 1000;
