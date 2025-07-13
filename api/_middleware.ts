import type { VercelRequest } from '@vercel/node';

export function authMiddleware(req: VercelRequest): string | null {
  const auth = req.headers.authorization;
  const token = auth?.split(' ')[1];
  if (!token || token !== process.env.API_SECRET_TOKEN) {
    return 'Unauthorized';
  }
  return null;
}