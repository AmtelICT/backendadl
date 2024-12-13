const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const videoRoutes = require('./routes/videos');
const cors = require('cors');



 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/videos', videoRoutes);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error(err);
  });

app.listen(5000, () => {
  console.log('Server running on port 5000');
});