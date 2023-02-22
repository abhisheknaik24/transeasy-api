import { Schema, model } from 'mongoose';

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    state: { type: Schema.Types.ObjectId, ref: 'States', required: true },
    pickUpAddress: { type: String, maxLength: 255, required: true },
    dropOffAddress: { type: String, maxLength: 255, required: true },
    mobileNo: { type: Number, min: 10, max: 10, required: true },
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicles', required: true },
    amount: { type: Schema.Types.Decimal128, required: true },
    deliveryPartner: { type: Schema.Types.ObjectId, ref: 'DeliveryPartners' },
    deliveryDate: {
      type: Date,
      default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
    },
    status: { type: String, maxLength: 255, default: 'pending' },
    isPayment: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    isReturn: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model('Bookings', bookingSchema);
