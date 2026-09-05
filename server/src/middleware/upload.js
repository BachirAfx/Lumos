import multer from 'multer';

// Use memoryStorage to buffer the file before uploading to Cloudinary
const storage = multer.memoryStorage();
export const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per image
});
