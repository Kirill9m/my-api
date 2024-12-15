const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const movies = [
  { id: 1, title: "Movie 1", date: "2024-12-20", price: 10, seatsAvailable: 20 },
  { id: 2, title: "Movie 2", date: "2024-12-21", price: 12, seatsAvailable: 15 }
];

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});