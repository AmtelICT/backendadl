const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const videoRoutes = require('./routes/videos');
const studentsRoutes= require ('./routes/students')
const cors = require('cors');



 
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use('/api/videos', videoRoutes);
app.use('/api/students', studentsRoutes);

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
