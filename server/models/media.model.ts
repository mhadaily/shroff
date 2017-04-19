import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mediaSchema = new Schema(
  {
    fileName: { type: String, required: false, trim: true },
    originalFileName: { type: String, required: false, trim: true },
    mimeType: { type: String, required: false, trim: true },
    encoding: { type: String, required: false, trim: true },
    fileSize: { type: Number, required: false, trim: true },
    mediaExtension: { type: String, required: false, trim: true },
    destination: { type: Number, required: false, trim: true },
    lastModifiedDate: { type: String, required: false, trim: true },
    path: { type: Number, required: false, trim: true }
  },
  {
    timestamps: true
  }
);

const Media = mongoose.model('Media', mediaSchema);

export default Media;
