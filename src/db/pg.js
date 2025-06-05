import pg from 'pg';
import 'dotenv/config';
export const db = new pg.Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
      ca: process.env.PG_SSL_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
});

export const connectPg = async () => {
  try {
    await db.query('SELECT 1');
    console.log('✅ PostgreSQL connected');
  } catch (err) {
    console.error('❌ PostgreSQL connection error:', err);
    process.exit(1);
  }
};
