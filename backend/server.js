const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Finance Accumulator</h1>');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
