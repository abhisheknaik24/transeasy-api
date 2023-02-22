import express from 'express';
import bookingsController from '../controllers/bookingsController.js';

const router = express.Router();

router.get('/getEstimate', bookingsController.getEstimate);

router.post('/addBooking', bookingsController.addBooking);

export default router;
