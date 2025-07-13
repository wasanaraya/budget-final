import { Client } from 'pg';

export function clientConnect() {
  const connectionString = process.env.DATABASE_URL;
  return new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });
}