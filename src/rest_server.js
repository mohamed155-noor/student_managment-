const express = require('express');
const app = express();
const PORT = 3000;

// Data source
const genres = [
  { id: 1, name: 'Gospel' },
  { id: 2, name: 'Hip-hop' },
  { id: 3, name: 'RnB' },
  { id: 4, name: 'Reggae' },
  { id: 5, name: 'Techno' },
  { id: 6, name: 'House' }
];

app.use(express.json());

// Endpoint: Retrieve all genres
app.get('/api/genres', (req, res) => {
  res.status(200).json({
    success: true,
    data: genres
  });
});

// Endpoint: Retrieve a specific genre by ID
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).json({ success: false, message: 'Genre not found' });
  }
  res.status(200).json({ success: true, data: genre });
});

app.listen(PORT, () => {
  console.log(`REST API running at http://localhost:${PORT}/api/genres`);
});