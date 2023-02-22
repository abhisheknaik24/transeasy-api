import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String, maxLength: 255, required: true },
    lastName: { type: String, maxLength: 255, required: true },
    email: { type: String, maxLength: 255, required: true, unique: true },
    picture: { type: String, maxLength: 255 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model('Users', userSchema);
