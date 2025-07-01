import express from 'express';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const { Pool } = pg;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // utile pour Cloud SQL sur GCP
});

const SECRET = process.env.JWT_SECRET || 'dev-secret';

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT id, email FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });

    return res.json({ token });
  } catch (err) {
    console.error('Erreur de login :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 API lancée sur le port ${PORT}`);
});
