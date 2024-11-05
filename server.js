const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const Users = require('./models/User');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/Selenia')
  .then(() => console.log("Database Connection Open!!"))
  .catch(err => {
    console.log("Database could not Connect!!!");
    console.log(err);
  });

// Middleware
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs'); 

// Routes
app.use('/api', authRoutes);
app.use('/api', profileRoutes); // Mount profile routes at '/api'

// Default route
app.use('/', (req, res) => {
  res.render('auth', {
    path: '/'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`CORS enabled web server listening on PORT ${PORT}`);
});
