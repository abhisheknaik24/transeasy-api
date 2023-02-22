import express from 'express';
import statesController from '../controllers/statesController.js';

const router = express.Router();

router.get('/getStates', statesController.getStates);

router.post('/addStates', statesController.addStates);

export default router;
