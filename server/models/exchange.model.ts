import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const exchangeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    user: { type: String, required: false, trim: true },
    list: { type: Array, required: true },
  },
  {
    timestamps: true,
  },
);

const Exchange = mongoose.model('Exchange', exchangeSchema);

export default Exchange;
