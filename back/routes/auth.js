import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db.js'; // ta connexion PostgreSQL

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, 'votre_cle_secrete', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
