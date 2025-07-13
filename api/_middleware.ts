
import type { VercelRequest } from '@vercel/node';

export function authMiddleware(req: VercelRequest): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return "Missing or invalid Authorization header";
  }

  const token = authHeader.split(" ")[1];
  const expectedToken = process.env.API_SECRET_TOKEN;

  if (!expectedToken || token !== expectedToken) {
    return "Unauthorized";
  }

  return null;
}
