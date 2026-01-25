const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth.router.js');
const userRoutes = require('./routes/user.router.js');

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
  res.send('Backend Running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

//Set env file based on environment
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Start Local Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
