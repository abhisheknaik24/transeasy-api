import { Schema, model } from 'mongoose';

const deliveryPartnerSchema = new Schema(
  {
    firstName: { type: String, maxLength: 255, required: true },
    lastName: { type: String, maxLength: 255, required: true },
    email: { type: String, maxLength: 255, required: true, unique: true },
    mobileNo: { type: Number, min: 10, max: 10, required: true },
    state: { type: Schema.Types.ObjectId, ref: 'States', required: true },
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicles', required: true },
    license: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model('DeliveryPartners', deliveryPartnerSchema);
