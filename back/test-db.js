import pool from './db.js';

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connexion réussie ! Date actuelle :', res.rows[0].now);
  } catch (err) {
    console.error('Erreur de connexion :', err);
  } finally {
    await pool.end();
  }
}

testConnection();
