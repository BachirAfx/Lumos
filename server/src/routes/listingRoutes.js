import express from 'express';
import * as listingController from '../controllers/listingController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Allow listing creation with images
router.post('/', verifyToken, upload.array('images', 5), listingController.create);
router.get('/', listingController.list);

export default router;
