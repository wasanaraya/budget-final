import { VercelRequest, VercelResponse } from '@vercel/node';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import * as schema from '../shared/schema';

function getDB() {
  const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!dbUrl) throw new Error('Database URL not configured');
  const sql = neon(dbUrl);
  return drizzle(sql, { schema });
}

function parseBody(req: VercelRequest) {
  return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
}

function createHandler(table: any, label: string) {
  return async function handler(req: VercelRequest, res: VercelResponse) {
    try {
      const db = getDB();
      const body = parseBody(req);
      switch (req.method) {
        case 'GET': {
          const data = await db.select().from(table);
          return res.status(200).json(data);
        }
        case 'POST': {
          const inserted = await db.insert(table).values(body).returning();
          return res.status(201).json(inserted);
        }
        case 'PUT': {
          const updated = await db.update(table).set(body).where(eq(table.id, body.id)).returning();
          return res.status(200).json(updated);
        }
        case 'DELETE': {
          const deleted = await db.delete(table).where(eq(table.id, body.id)).returning();
          return res.status(200).json(deleted);
        }
        default:
          return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      }
    } catch (error: any) {
      console.error(`${label} error:`, error);
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).json({ error: 'Internal Server Error', details: error.message || error });
    }
  };
}

export const handleBudgetItems = createHandler(schema.budgetItems, 'budget-items');
export const handleEmployees = createHandler(schema.employees, 'employees');
export const handleMasterRates = createHandler(schema.masterRates, 'master-rates');
export const handleOvertimeItems = createHandler(schema.overtimeItems, 'overtime-items');
export const handleSpecialAssistItems = createHandler(schema.specialAssistItems, 'special-assist-items');
export const handleAssistanceData = createHandler(schema.assistanceData, 'assistance-data');
export const handleHolidays = createHandler(schema.holidays, 'holidays');
export const handleUsers = createHandler(schema.users, 'users');
