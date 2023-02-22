import Vehicle from '../models/vehicles.js';

const getVehicles = async (req, res) => {
  if (req.method === 'GET') {
    let vehicles = await Vehicle.find({ isActive: true });

    res.status(200).json({
      success: true,
      message: 'Vehicles fetched successfully!',
      data: { vehicles: vehicles },
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }
};

const addVehicles = async (req, res) => {
  if (req.method === 'POST') {
    if (req.body) {
      for (let i of req.body) {
        if ((i.vehicle, i.capacity, i.charge)) {
          let vehicle = await Vehicle.exists({ vehicle: i.vehicle });

          if (!vehicle) {
            let v = new Vehicle({
              vehicle: i.vehicle,
              capacity: i.capacity,
              charge: i.charge,
            });

            await v.save();
          }
        }
      }

      let vehicles = await Vehicle.find({ isActive: true });

      res.status(200).json({
        success: true,
        message: 'Vehicles added successfully!',
        data: { vehicles: vehicles },
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
  getVehicles,
  addVehicles,
};
