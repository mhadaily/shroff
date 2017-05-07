import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    emailUsername: { type: String, required: true, trim: true, unique: true },
    fistName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    roleLevel: { type: Number, required: false, trim: true, default: 100 },
    password: { type: String, required: true, trim: true }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

export default User;
