const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const UserModel = require('./models/User');

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) throw err;
});
jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

app.get('/test', (req, res) => {
  res.json('Hello World!');
});

app.get('/profile', (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, payload) => {
      if (err) throw err;
      res.json(payload);
    });
  } else {
    res.status(401).json('Unauthorized');
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const createdUser = await User.create({ username, password });
    jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
        _id: createdUser._id,
        username,
      });
    });
  } catch (err) {
    if (err) throw err;
    res.status(500).json('error');
  }
});

app.listen(4040);

