// const mongoose = require('mongoose');

// const videoSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     author: { type: String, required: true },
//     description: { type: String, required: true },
//     bannerImage: { type: String, required: true },
//     videoUrl: { type: String, required: true },
// });

// const Video = mongoose.model('Videos', videoSchema);

// module.exports = Video;




const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
 
  videoUrl: {
    type: String,
    required: true,
  },

  bannerImage: {
    type: String,
    required: true,
  },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
