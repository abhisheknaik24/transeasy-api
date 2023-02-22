import DeliveryPartner from '../models/deliveryPartners.js';
import State from '../models/states.js';
import Vehicle from '../models/vehicles.js';

const addDeliveryPartner = async (req, res) => {
  if (req.method === 'POST') {
    const { firstName, lastName, email, mobileNo, state, vehicle } = req.body;

    if ((firstName, lastName, email, mobileNo, state, vehicle, req.file)) {
      let s = await State.findOne({ state: state, isActive: true });

      let v = await Vehicle.findOne({ vehicle: vehicle, isActive: true });

      let dp = new DeliveryPartner({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        state: s,
        vehicle: v,
        license: req.file.originalname,
      });

      await dp.save();

      res.status(200).json({
        success: true,
        message: 'Delivery partner added successfully!',
        data: { deliveryPartner: dp },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Request body is missing!',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }
};

export default {
  addDeliveryPartner,
};
