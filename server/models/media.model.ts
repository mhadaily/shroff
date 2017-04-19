import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mediaSchema = new Schema(
  {
    filename: { type: String, required: false, trim: true },
    fieldname: { type: String, required: false, trim: true },
    originalname: { type: String, required: false, trim: true },
    mimetype: { type: String, required: false, trim: true },
    encoding: { type: String, required: false, trim: true },
    size: { type: Number, required: false, trim: true },
    mediaExtension: { type: String, required: false, trim: true },
    destination: { type: String, required: false, trim: true },
    lastModifiedDate: { type: String, required: false, trim: true },
    path: { type: String, required: false, trim: true }
  },
  {
    timestamps: true
  }
);

const Media = mongoose.model('Media', mediaSchema);

export default Media;
