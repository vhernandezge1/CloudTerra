import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ QuickQuote API is running');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
