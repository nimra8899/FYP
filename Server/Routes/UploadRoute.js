import express from 'express';
import multer from 'multer';
const router = express.Router();

// Configure multer for storing files in public/images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name); // Name sent from frontend
    },
});

const upload = multer({ storage: storage });

// POST /upload route
router.post('/', upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).json("File upload failed");
    }
});

export default router;
