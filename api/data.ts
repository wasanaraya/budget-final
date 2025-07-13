
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clientConnect } from './handlers';
import { authMiddleware } from './_middleware';

const allowedTables = [
  'budget_items', 'employees', 'master_rates', 'overtime_items', 
  'assistance_data', 'holidays', 'special_assist_items', 'users'
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authError = authMiddleware(req);
  if (authError) return res.status(401).json({ error: authError });

  const { table, id } = req.query;
  if (!table || typeof table !== 'string' || !allowedTables.includes(table)) {
    return res.status(400).json({ error: 'Invalid table' });
  }

  const client = clientConnect();
  await client.connect();

  try {
    if (req.method === 'GET') {
      const result = await client.query(`SELECT * FROM ${table}`);
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      const keys = Object.keys(req.body);
      const values = Object.values(req.body);
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
      const query = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *`;
      const result = await client.query(query, values);
      return res.status(201).json(result.rows[0]);
    }

    if (req.method === 'PUT') {
      if (!id) return res.status(400).json({ error: 'Missing ID for update' });
      const keys = Object.keys(req.body);
      const values = Object.values(req.body);
      const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
      const query = `UPDATE ${table} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
      const result = await client.query(query, [...values, id]);
      return res.status(200).json(result.rows[0]);
    }

    if (req.method === 'DELETE') {
      if (!id) return res.status(400).json({ error: 'Missing ID for delete' });
      const query = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
      const result = await client.query(query, [id]);
      return res.status(200).json(result.rows[0]);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });

  } catch (error) {
    return res.status(500).json({ error: 'Server Error', detail: error instanceof Error ? error.message : String(error) });
  } finally {
    await client.end();
  }
}
