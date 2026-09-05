import express from 'express';
import * as rentalController from '../controllers/rentalController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { createRequestSchema } from '../validators/rentalValidator.js';

const router = express.Router();

router.post('/requests', verifyToken, validate(createRequestSchema), rentalController.createRequest);
router.patch('/requests/:requestId/approve', verifyToken, rentalController.approve);

export default router;
