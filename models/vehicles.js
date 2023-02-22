import { Schema, model } from 'mongoose';

const vehicleSchema = new Schema(
  {
    vehicle: { type: String, maxLength: 255, required: true },
    capacity: { type: String, maxLength: 255, required: true },
    charge: { type: Number, min: 100, max: 100000, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model('Vehicles', vehicleSchema);
