const express = require('express');
require('dotenv').config();
const app = express();

app.get('/test', (req, res) => {
  res.json('Hello World!');
});

app.post('/register', (req, res) => {

})

app.listen(4040);

