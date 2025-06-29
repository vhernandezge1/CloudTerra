import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all quotes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM quotes ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET one quote
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM quotes WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Quote not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST create new quote
router.post('/', async (req, res) => {
  const { client, items, total } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO quotes (client, items, total, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [client, items, total]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT update quote
router.put('/:id', async (req, res) => {
  const { client, items, total } = req.body;
  try {
    const result = await pool.query(
      `UPDATE quotes SET 
        client = COALESCE($1, client), 
        items = COALESCE($2, items), 
        total = COALESCE($3, total)
       WHERE id = $4 RETURNING *`,
      [client, items, total, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Quote not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE quote
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM quotes WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Quote not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
