import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // à définir dans Cloud Run / local
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
