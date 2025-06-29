import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useEffect, useState } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch('https://<ton-backend-url>/api/quotes')
      .then(res => res.json())
      .then(data => setQuotes(data));
  }, []);

  return (
    <div className="App">
      <h1>QuickQuote Quotes</h1>
      <ul>
        {quotes.map(q => (
          <li key={q.id}>
            <b>{q.client}</b> - {q.items} - {q.total}€
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
