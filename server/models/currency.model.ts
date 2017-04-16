import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const currencySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true },
    image: { type: String, required: false, trim: true },
    base: { type: Number, required: false, trim: true },
    country: { type: String, required: false, trim: true }
  },
  {
    timestamps: true
  }
);

const Currency = mongoose.model('Currency', currencySchema);

export default Currency;
