import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    name: { type: String, required: false, trim: true },
    level: { type: Number, required: false, trim: true }
  },
  {
    timestamps: true
  }
);

const Role = mongoose.model('Role', roleSchema);

export default Role;
