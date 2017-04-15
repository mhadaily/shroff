import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const exchangeSchema = new Schema(
  {
    user: { type: String, required: false, trim: true },
    exchanges: { type: Array, required: true },
  },
  {
    timestamps: true,
  },
);

const Exchange = mongoose.model('Exchange', exchangeSchema);

export default Exchange;
