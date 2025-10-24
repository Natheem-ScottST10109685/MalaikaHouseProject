import crypto from 'crypto';

export function sha256base64url(input: string): string {
  const digest = crypto.createHash('sha256').update(input, 'utf8').digest();
  return digest.toString('base64url');
}