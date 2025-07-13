import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clientConnect } from './handlers';
import { authMiddleware } from './_middleware';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authError = authMiddleware(req);
  if (authError) return res.status(401).json({ error: authError });

  const client = clientConnect();
  await client.connect();

  try {
    if (req.method === 'GET') {
      const result = await client.query('SELECT * FROM special_assist_items');
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      const body = req.body;
      const keys = Object.keys(body);
      const values = Object.values(body);
      const query = `INSERT INTO special_assist_items (${keys.join(',')}) VALUES (${keys.map((_,i)=>'$'+(i+1)).join(',')}) RETURNING *`;
      const result = await client.query(query, values);
      return res.status(201).json(result.rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, ...fields } = req.body;
      const keys = Object.keys(fields);
      const values = Object.values(fields);
      const setQuery = keys.map((k, i) => `${k} = ${i + 1}`).join(', ');
      const query = `UPDATE special_assist_items SET ${setQuery} WHERE id = ${keys.length + 1} RETURNING *`;
      const result = await client.query(query, [...values, id]);
      return res.status(200).json(result.rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      const result = await client.query('DELETE FROM special_assist_items WHERE id = $1 RETURNING *', [id]);
      return res.status(200).json(result.rows[0]);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    return res.status(500).json({ error: 'Server Error', detail: err instanceof Error ? err.message : String(err) });
  } finally {
    await client.end();
  }
}