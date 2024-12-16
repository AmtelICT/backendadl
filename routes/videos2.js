const express = require('express');
const multer = require('multer');
const Video = require('../models/video'); // Import your Video schema
const router = express.Router();
const path = require('path');
const Students = require('../models/students');

//edited
// const upload = multer({ dest: 'uploads/' }); // Store files in `uploads/` folder

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the `uploads/` folder
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using the original name and timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const originalName = file.originalname.replace(/\s+/g, '-'); // Remove spaces from the original filename
        const ext = path.extname(file.originalname); // Extract the file extension
        cb(null, `${uniqueSuffix}-${originalName}`);
    },
});

// Initialize Multer
const upload = multer({ storage });

router.post('/upload', upload.fields([{ name: 'video' }, { name: 'bannerImage' }]), async (req, res) => {
    try {
        const { title, author, description } = req.body;

        // Normalize file paths and save them
        const bannerImage = req.files.bannerImage[0].path.replace(/\\/g, '/');
        const videoUrl = req.files.video[0].path.replace(/\\/g, '/');

        const video = new Video({ title, author, description, bannerImage, videoUrl });
        await video.save();

        res.status(201).json({ message: 'Video uploaded successfully', video });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Fetch all videos
router.get('/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    // res.json([{id:1,title:"fala",title:"jihh", description:"ffggg", bannerImage:"test.png"}]);
    
});




// router.get('/videos/:id', async (req, res) => {
//     try {
//         const video = await Video.findById(req.params.id);
//         if (!video) {
//             return res.status(404).json({ message: 'Video not found' });
//         }
//         res.json(video);
//     } catch (error) {
//         console.error('Error fetching video:', error);
//         res.status(500).json({ message: 'Error fetching video' });
//     }
// });


const fs = require('fs');
// const path = require('path');

// router.get('/videos/:id', async (req, res) => { 
//     try {
//         const video = await Video.findById(req.params.id);
//         if (!video) {
//             return res.status(404).json({ message: 'Video not found' });
//         }

//         // Assuming the video file is stored in the 'uploads' folder
//         const videoPath = path.join(__dirname, 'uploads', video.filename); // Adjust the 'filename' property as needed
//         const videoStat = fs.statSync(videoPath);

//         // Get the range of bytes requested by the client
//         const range = req.headers.range;
//         if (!range) {
//             return res.status(400).send("Requires Range header");
//         }

//         const start = parseInt(range.replace(/\D/g, ''), 10); // Parse the start byte
//         const end = Math.min(start + 1000000, videoStat.size - 1); // Set the end byte to 1MB or the video size

//         const contentLength = end - start + 1;

//         res.writeHead(206, { // 206 is for partial content
//             'Content-Range': `bytes ${start}-${end}/${videoStat.size}`,
//             'Accept-Ranges': 'bytes',
//             'Content-Length': contentLength,
//             'Content-Type': 'video/mp4', // Or the correct video format
//         });

//         // Stream the video chunk
//         const videoStream = fs.createReadStream(videoPath, { start, end });
//         videoStream.pipe(res);

//     } catch (error) {
//         console.error('Error fetching video:', error);
//         res.status(500).json({ message: 'Error fetching video' });
//     }
// });

// const fs = require('fs');
// const path = require('path');

// router.get('/videos/:id', async (req, res) => {
//     try {
//         const video = await Video.findById(req.params.id);
//         if (!video) {
//             return res.status(404).json({ message: 'Video not found' });
//         }

//         const videoPath = path.join(__dirname, 'uploads', video.filename); // Adjust this if needed
//         const videoStat = fs.statSync(videoPath);

//         // Handle Range Requests for video streaming
//         const range = req.headers.range;
//         if (!range) {
//             return res.status(400).send("Requires Range header");
//         }

//         const start = parseInt(range.replace(/\D/g, ''), 10); // Get the start byte
//         const end = Math.min(start + 1000000, videoStat.size - 1); // Set the end byte for chunk (1MB per chunk)
//         const contentLength = end - start + 1;

//         res.writeHead(206, { // 206 for Partial Content
//             'Content-Range': `bytes ${start}-${end}/${videoStat.size}`,
//             'Accept-Ranges': 'bytes',
//             'Content-Length': contentLength,
//             'Content-Type': 'video/mp4', // Set correct content type
//         });

//         // Stream the video in chunks
//         const videoStream = fs.createReadStream(videoPath, { start, end });
//         videoStream.pipe(res);
//     } catch (error) {
//         console.error('Error fetching video:', error);
//         res.status(500).json({ message: 'Error fetching video' });
//     }
// });



// const express = require('express');
// const fs = require('fs');
// const path = require('path');

// const router = express.Router();

// router.get('/videos/:id', async (req, res) => {
//     try {
//         const video = await Video.findById(req.params.id); // MongoDB lookup
//         if (!video) {
//             return res.status(404).json({ message: 'Video not found' });
//         }

//         const videoPath = path.join(__dirname, 'uploads', video.filename);
//         const stat = fs.statSync(videoPath);

//         const range = req.headers.range;
//         if (!range) {
//             return res.status(400).send('Requires Range header');
//         }

//         const videoSize = stat.size;
//         const CHUNK_SIZE = 10 ** 6; // 1MB
//         const start = Number(range.replace(/\D/g, ''));
//         const end = Math.min(start + CHUNK_SIZE - 1, videoSize - 1);

//         const contentLength = end - start + 1;
//         const headers = {
//             'Content-Range': `bytes ${start}-${end}/${videoSize}`,
//             'Accept-Ranges': 'bytes',
//             'Content-Length': contentLength,
//             'Content-Type': 'video/mp4',
//         };

//         res.writeHead(206, headers);

//         const videoStream = fs.createReadStream(videoPath, { start, end });
//         videoStream.pipe(res);
//     } catch (err) {
//         console.error('Error fetching video:', err);
//         res.status(500).json({ message: 'Error fetching video' });
//     }
// });


router.get('/videos/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id); // Find the video in the database
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const videoPath = path.join(__dirname, 'uploads', video.filename);

        // Check if range is provided
        const range = req.headers.range;
        if (!range) {
            return res.status(400).send('Requires Range header');
        }

        const videoSize = fs.statSync(videoPath).size;
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ''));
        const end = Math.min(start + CHUNK_SIZE - 1, videoSize - 1);

        const contentLength = end - start + 1;

        // Set caching headers to disable cache
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Content-Range', `bytes ${start}-${end}/${videoSize}`);
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Length', contentLength);
        res.setHeader('Content-Type', 'video/mp4');

        res.status(206); // Partial Content
        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
    } catch (error) {
        console.error('Error streaming video:', error);
        res.status(500).json({ message: 'Error streaming video' });
    }
});









// router.get('/videos/:id', async (req, res) => {
//     try {
//         const video = await Video.findById(req.params.id);
//         if (!video) {
//             return res.status(404).json({ message: 'Video not found' });
//         }
//         // Ensure you are sending all the required fields
//         res.json({
//             _id: video._id,
//             title: video.title,
//             description: video.description,
//             videoUrl: video.videoUrl,  // Ensure this is correct and accessible
//             bannerImage: video.bannerImage  // Ensure this is correct
//         });
//     } catch (error) {
//         console.error('Error fetching video:', error);
//         res.status(500).json({ message: 'Error fetching video' });
//     }
// });



module.exports = router;
