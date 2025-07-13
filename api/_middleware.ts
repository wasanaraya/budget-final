import { VercelRequest, VercelResponse } from '@vercel/node';

const AUTH_TOKEN = process.env.API_SECRET_TOKEN;

export function requireAuth(handler: (req: VercelRequest, res: VercelResponse) => any) {
  return async (req: VercelRequest, res: VercelResponse) => {
    const token = req.headers.authorization?.replace('Bearer ', '') ?? '';
    if (!AUTH_TOKEN || token !== AUTH_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return handler(req, res);
  };
}
