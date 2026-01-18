const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//Server Hosting
const app = express();

//Cors error fix
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('DB not connected!!!', err));

// Router's
app.get('/', (req, res) => {
  res.send('MEAN Backend Running');
});

// Start Local Server
app.listen(5000, () => {
  console.log('Server running on port http://localhost:5000');
});
