

const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
 
  date: {
    type: String,
    required: true,
  },


});


const Students = mongoose.model('Students', studentsSchema);

module.exports = Students;