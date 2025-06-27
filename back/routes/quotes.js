import express from 'express';

const router = express.Router();

// Données simulées (à remplacer plus tard par PostgreSQL)
let quotes = [];
let nextId = 1;

// GET all quotes
router.get('/', (req, res) => {
  res.json(quotes);
});

// GET one quote
router.get('/:id', (req, res) => {
  const quote = quotes.find(q => q.id === parseInt(req.params.id));
  if (!quote) return res.status(404).json({ error: 'Quote not found' });
  res.json(quote);
});

// POST create new quote
router.post('/', (req, res) => {
  const { client, items, total } = req.body;
  const newQuote = {
    id: nextId++,
    client,
    items,
    total,
    created_at: new Date()
  };
  quotes.push(newQuote);
  res.status(201).json(newQuote);
});

// PUT update quote
router.put('/:id', (req, res) => {
  const quote = quotes.find(q => q.id === parseInt(req.params.id));
  if (!quote) return res.status(404).json({ error: 'Quote not found' });

  const { client, items, total } = req.body;
  quote.client = client ?? quote.client;
  quote.items = items ?? quote.items;
  quote.total = total ?? quote.total;
  res.json(quote);
});

// DELETE quote
router.delete('/:id', (req, res) => {
  quotes = quotes.filter(q => q.id !== parseInt(req.params.id));
  res.status(204).send();
});

export default router;
