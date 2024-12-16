const express = require('express');
const multer = require('multer');
const cloudinary = require('../cloudinary');
const Video = require('../models/video');

const router = express.Router();


// // Multer setup for file upload handling (memory storage)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage }).fields([
//   { name: 'video', maxCount: 1 },
//   { name: 'bannerImage', maxCount: 1 },
// ]);

// // Upload video and banner image to Cloudinary
// router.post('/upload', upload, async (req, res) => {
//   try {
//     // Ensure video and banner image files are present
//     if (!req.files || !req.files.video || !req.files.bannerImage) {
//       return res.status(400).json({ error: 'Please upload both video and banner image.' });
//     }

//     const videoFile = req.files.video[0];
//     const bannerImageFile = req.files.bannerImage[0];

//     // Upload the video to Cloudinary
//     const videoUploadResult = await cloudinary.uploader.upload(videoFile.buffer, {
//       resource_type: 'video', // This tells Cloudinary that it's a video
//       public_id: `videos/${Date.now()}`, // Custom public_id
//       folder: 'videos', // Cloudinary folder for videos
//       filename_override: videoFile.originalname, // Keep original file name
//     });

//     // Upload the banner image to Cloudinary
//     const bannerImageUploadResult = await cloudinary.uploader.upload(bannerImageFile.buffer, {
//       resource_type: 'image', // This tells Cloudinary that it's an image
//       public_id: `banner_images/${Date.now()}`, // Custom public_id
//       folder: 'banner_images', // Cloudinary folder for images
//       filename_override: bannerImageFile.originalname, // Keep original file name
//     });

//     // Assuming you have a Video model to save video information
//     const newVideo = new Video({
//       title: req.body.title,
//       description: req.body.description,
//       videoUrl: videoUploadResult.secure_url, // Cloudinary URL for video
//       bannerImageUrl: bannerImageUploadResult.secure_url, // Cloudinary URL for image
//     });

//     await newVideo.save();

//     // Respond with success
//     return res.status(200).json({
//       message: 'Video and Banner Image uploaded successfully!',
//       video: newVideo,
//     });

//   } catch (error) {
//     console.error('Error uploading files:', error);
//     return res.status(500).json({ error: 'Failed to upload video and banner image' });
//   }
// });


// // // Multer setup for handling video uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Route for video upload
// router.post('/upload', upload.fields([{ name: 'video' }, { name: 'bannerImage' }]), async (req, res) => {
//     console.log('Uploaded Files:', req.files);  // Debugging logs
  
//     // Check if files are present
//     if (!req.files || !req.files.video || !req.files.bannerImage) {
//       return res.status(400).json({ error: 'Missing video or banner image' });
//     }
  
//     try {
//       // Upload banner image to Cloudinary (using buffer)
//       const bannerResult = await cloudinary.uploader.upload_stream(
//         {
//           resource_type: 'image',
//           folder: 'videos/banner_images',
//           public_id: `banner_${Date.now()}`,  // Optional, make filenames unique
//         },
//         (error, result) => {
//           if (error) {
//             console.error(error);
//             return res.status(500).json({ error: 'Failed to upload banner image' });
//           }
//           console.log('Banner image uploaded:', result.secure_url);
  
//           // Upload video to Cloudinary (using buffer)
//           cloudinary.uploader.upload_stream(
//             {
//               resource_type: 'video',
//               folder: 'videos/videos',
//               public_id: `video_${Date.now()}`,  // Optional, make filenames unique
//             },
//             (error, result) => {
//               if (error) {
//                 console.error(error);
//                 return res.status(500).json({ error: 'Failed to upload video' });
//               }
  
//               // Save video metadata to MongoDB
//               const newVideo = new Video({
//                 title: req.body.title,
//                 description: req.body.description,
//                 author: req.body.author,
//                 // Store banner image URL
//                 videoUrl: result.secure_url, 
//                 bannerImage: result.secure_url,    // Store video URL
//               });
  
//               newVideo.save()
//                 .then((savedVideo) => {
//                   res.status(200).json(savedVideo);
//                 })
//                 .catch((error) => {
//                   console.error(error);
//                   res.status(500).json({ error: 'Failed to save video metadata' });
//                 });
//             }
//           ).end(req.files.video[0].buffer);  // Ensure you're passing the buffer correctly here
  
//         }
//       ).end(req.files.bannerImage[0].buffer);  // Pass banner image buffer
//     } catch (error) {
//       console.error(error);
//       if (!res.headersSent) {
//         // Ensure the response is not sent twice
//         res.status(500).json({ error: 'Failed to upload video and banner' });
//       }
//     }
//   });
  


// // Multer setup for handling video uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Route for video upload
// router.post('/upload', upload.fields([{ name: 'video' }, { name: 'bannerImage' }]), async (req, res) => {
//     console.log('Uploaded Files:', req.files);  // Debugging logs
  
//     // Check if files are present
//     if (!req.files || !req.files.video || !req.files.bannerImage) {
//       return res.status(400).json({ error: 'Missing video or banner image' });
//     }
  
//     try {
//       // Upload banner image to Cloudinary (using buffer)
//       const bannerResult = await cloudinary.uploader.upload_stream(
//         {
//           resource_type: 'image',
//           folder: 'videos/banner_images',
//           public_id: `banner_${Date.now()}`,  // Optional, make filenames unique
//         },
//         (error, result) => {
//           if (error) {
//             console.error(error);
//             return res.status(500).json({ error: 'Failed to upload banner image' });
//           }
//           console.log('Banner image uploaded:', result.secure_url);
  
//           // Upload video to Cloudinary (using buffer)
//           cloudinary.uploader.upload_stream(
//             {
//               resource_type: 'video',
//               folder: 'videos/videos',
//               public_id: `video_${Date.now()}`,  // Optional, make filenames unique
//             },
//             (error, result) => {
//               if (error) {
//                 console.error(error);
//                 return res.status(500).json({ error: 'Failed to upload video' });
//               }
  
//               // Save video metadata to MongoDB
//               const newVideo = new Video({
//                 title: req.body.title,
//                 description: req.body.description,
//                 author: req.body.author,
//                 videoUrl: result.secure_url, 
//                 bannerImage: result.secure_url,    
//               });
  
//               newVideo.save()
//                 .then((savedVideo) => {
//                   res.status(200).json(savedVideo);
//                 })
//                 .catch((error) => {
//                   console.error(error);
//                   res.status(500).json({ error: 'Failed to save video metadata' });
//                 });
//             }
//           ).end(req.files.video[0].buffer);  // Ensure you're passing the buffer correctly here
  
//         }
//       ).end(req.files.bannerImage[0].buffer);  // Pass banner image buffer
//     } catch (error) {
//       console.error(error);
//       if (!res.headersSent) {
//         // Ensure the response is not sent twice
//         res.status(500).json({ error: 'Failed to upload video and banner' });
//       }
//     }
//   });
  






const storage = multer.memoryStorage();
const upload = multer({ storage: storage,  });

// Route for video and banner image upload
router.post('/upload', upload.fields([{ name: 'video' }, { name: 'bannerImage' }]), async (req, res) => {
  console.log('Uploaded Files:', req.files);  // Debugging logs
  
  // Check if files are present
  if (!req.files || !req.files.video || !req.files.bannerImage) {
    return res.status(400).json({ error: 'Missing video or banner image' });
  }
  
  try {
    // Upload banner image to Cloudinary (using buffer)
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'videos/banner_images',
        public_id: `banner_${Date.now()}`,  // Optional, make filenames unique
      },
      (bannerError, bannerResult) => {
        if (bannerError) {
          console.error(bannerError);
          return res.status(500).json({ error: 'Failed to upload banner image' });
        }
        console.log('Banner image uploaded:', bannerResult.secure_url);

        // Upload video to Cloudinary (using buffer)
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'video',
            folder: 'videos/videos',
            public_id: `video_${Date.now()}`,  // Optional, make filenames unique
          },
          (videoError, videoResult) => {
            if (videoError) {
              console.error(videoError);
              return res.status(500).json({ error: 'Failed to upload video' });
            }

            console.log('Video uploaded:', videoResult.secure_url);

            // Save video metadata to MongoDB with correct URLs
            const newVideo = new Video({
              title: req.body.title,
              description: req.body.description,
              category:req.body.category,
              author: req.body.author,
              videoUrl: videoResult.secure_url,  // Correct video URL
              bannerImage: bannerResult.secure_url,  // Correct banner image URL
            });

            newVideo.save()
              .then((savedVideo) => {
                res.status(200).json(savedVideo);
              })
              .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Failed to save video metadata' });
              });
          }
        ).end(req.files.video[0].buffer);  // Ensure you're passing the buffer correctly here
      }
    ).end(req.files.bannerImage[0].buffer);  // Pass banner image buffer
    
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      // Ensure the response is not sent twice
      res.status(500).json({ error: 'Failed to upload video and banner' });
    }
  }
});





  // Get all videos
  router.get('/', async (req, res) => {
    try {
      const videos = await Video.find();
      res.status(200).json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve videos' });
    }
  });
  
  module.exports = router;