import express from 'express';
import * as listingController from '../controllers/listingController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { createListingSchema } from '../validators/listingValidator.js';

const router = express.Router();

router.post('/', verifyToken, validate(createListingSchema), listingController.create);
router.get('/', listingController.list);

export default router;
