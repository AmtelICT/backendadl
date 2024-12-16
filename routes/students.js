const express = require('express');
const Students = require('../models/students');

const router = express.Router();

router.post('/create', async (req, res,) => {
    const { name, email, phone,category,date } = req.body;
  
    const newContact = new Students({
      name,
      email,
      phone,
      category,
      date
    });
  
    try {
      await newContact.save();
      res.status(200).json({ message: 'Request submitted successfully!' });
      console.log("student requested")
    } catch (err) {
      res.status(500).json({ message: 'Error submitting form', error: err });
    }
 
  });


  router.get('/', async (req, res) => {
    try {
      const videos = await Students.find();
      res.status(200).json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve Students' });
    }
  });

  module.exports = router;