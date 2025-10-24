import argon2 from 'argon2';

const PEPPER = process.env.PASSWORD_PEPPER ?? '';

const HASH_OPTS = {
  type: argon2.argon2id,
  timeCost: 3,
  memoryCost: 64 * 1024,
  parallelism: 1,
  hashLength: 32
} as const;

export async function hashPassword(plain: string): Promise<string> {
  return argon2.hash(plain + PEPPER, HASH_OPTS);
}

export async function verifyPassword(hash: string, plain: string): Promise<boolean> {
  return argon2.verify(hash, plain + PEPPER);
}

export async function needsRehash(_hash: string): Promise<boolean> {
  return false;
}