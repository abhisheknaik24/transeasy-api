import express from 'express';
import vehiclesController from '../controllers/vehiclesController.js';

const router = express.Router();

router.get('/getVehicles', vehiclesController.getVehicles);

router.post('/addVehicles', vehiclesController.addVehicles);

export default router;
