import express from 'express';
import deliveryPartnersController from '../controllers/deliveryPartnersController.js';
import uploadLicense from '../middlewares/uploadLicense.js';

const router = express.Router();

router.post(
  '/addDeliveryPartner',
  uploadLicense.single('license'),
  deliveryPartnersController.addDeliveryPartner
);

export default router;
