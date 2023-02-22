import { Schema, model } from 'mongoose';

const stateSchema = new Schema(
  {
    state: { type: String, maxLength: 255, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model('States', stateSchema);
