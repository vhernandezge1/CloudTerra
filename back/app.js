import express from 'express';
import quotesRouter from './routes/quotes.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ QuickQuote API is running');
});

app.use('/api/quotes', quotesRouter); 

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
