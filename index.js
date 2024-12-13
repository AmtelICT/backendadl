const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');
const videoRoutes = require('./routes/videos2'); // Import routes
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());


app.use('/api', videoRoutes);



// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// server.timeout = 0;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.timeout = 0; // Disable timeout
