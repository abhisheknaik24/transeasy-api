import Booking from '../models/bookings.js';
import User from '../models/users.js';
import Vehicle from '../models/vehicles.js';

const getEstimate = async (req, res) => {
  if (req.method === 'GET') {
    const { vehicle } = req.query;

    if (vehicle) {
      let v = await Vehicle.findOne({ vehicle: vehicle, isActive: true });

      let cost = parseFloat(
        Number(v.charge) + (Number(v.charge) / 100) * 25
      ).toFixed(2);

      res.status(200).json({
        success: true,
        message: 'Estimate fetched successfully!',
        data: { cost: cost },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Request query is missing!',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }
};

const addBooking = async (req, res) => {
  if (req.method === 'POST') {
    const {
      email,
      city,
      pickUpAddress,
      dropOffAddress,
      mobileNo,
      vehicle,
      amount,
      isPayment,
    } = req.body;

    if (
      (email,
      city,
      pickUpAddress,
      dropOffAddress,
      mobileNo,
      vehicle,
      amount,
      isPayment)
    ) {
      let user = await User.findOne({ email: email, isActive: true });

      let v = await Vehicle.findOne({ vehicle: vehicle, isActive: true });

      let b = new Booking({
        user: user,
        city: city,
        pickUpAddress: pickUpAddress,
        dropOffAddress: dropOffAddress,
        mobileNo: mobileNo,
        vehicle: v,
        amount: amount,
        isPayment: isPayment,
      });

      await b.save();

      res.status(200).json({
        success: true,
        message: 'Booking added successfully!',
        data: { booking: b },
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
  getEstimate,
  addBooking,
};
