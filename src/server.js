require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import routes
const playerRoutes = require('./routes/playerRoutes');
const seasonRoutes = require('./routes/seasonRoutes');
const practiceRoutes = require('./routes/practiceRoutes');
const drillRoutes = require('./routes/drillRoutes');
const tempoEventRoutes = require('./routes/tempoRoutes');
const shotEventRoutes = require('./routes/shotRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

app.use(cors()); // Enable CORS

// Middleware to parse JSON
app.use(express.json());

// Determine MongoDB URI based on the environment
let mongoURI;

const env = process.env.NODE_ENV;
// Determine the URI based on NODE_ENV
//if (env.includes('_OFFCAMPUS')) {
  //mongoURI = process.env[`MONGO_URI_${env}`];
//} else {
  mongoURI = process.env[`MONGO_URI_${env}`] || process.env.MONGO_URI_DEVELOPMENT;
//}

mongoose.connect(mongoURI)
  .then(() => console.log(`Connected to MongoDB at ${mongoURI}`))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Setup routes
app.use('/api/players', playerRoutes);
app.use('/api/seasons', seasonRoutes);
app.use('/api/practices', practiceRoutes);
app.use('/api/drills', drillRoutes);
app.use('/api/tempoEvents', tempoEventRoutes);
app.use('/api/shotEvents', shotEventRoutes);
app.use('/api/games', gameRoutes);

const port = process.env.PORT || 3001; // Use environment variable or default to 3001
// Start the server on a single port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
