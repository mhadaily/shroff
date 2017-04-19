// import * as cors from 'cors';
// import * as fs from 'fs';
// import * as path from 'path';
// import { imageFilter, loadCollection, cleanFolder } from './utils';
import * as multer from 'multer';

import Media from '../models/media.model';
import BaseCtrl from './base';
import * as fs from 'fs';

export default class MediaCtrl extends BaseCtrl {
  model: any;
  private COLLECTION_NAME: string = 'images';
  private UPLOAD_PATH: string = 'uploads';
  private storage: any;
  private upload;
  
  constructor() {
    super();
    this.model = Media;
    // this.upload = multer({ dest: `${this.UPLOAD_PATH}/`/*, fileFilter: imageFilter*/ });
  }
  
  mediaUpload(req, res) {
   const UPLOAD_PATH: string = 'uploads';;
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, `${UPLOAD_PATH}`);
      },
      filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
      }
    });
    if (!fs.existsSync(UPLOAD_PATH)) fs.mkdirSync(UPLOAD_PATH);
  
    const upload = multer({ storage }).single('currencyImage');
    // const upload = multer({ dest: `${this.UPLOAD_PATH}/`}).single('avatar');
    console.log(req.body);
    console.log(req.file);
    
    upload(req, res, function(err) {
      if (err) {
        res.json({ error_code: 1, err_desc: err });
        return;
      }
      const obj = new Media(req.body);
      obj.save((err, item) => {
        if (err) { return console.error(err); }
        res.status(200).json(item);
      });
    });
    
    // mediaUpload(req, res) {
    //   const obj = new this.model(req.body);
    //   obj.save((err, item) => {
    //     if (err) { return console.error(err); }
    //     res.status(200).json(item);
    //   });
    // }
    
    // optional: clean all data before start
    // cleanFolder(UPLOAD_PATH);
    
    // async singleImage(req, res) {
    //   try {
    //     const col = await loadCollection(COLLECTION_NAME, db);
    //     const data = col.insert(req.file);
    //
    //     db.saveDatabase();
    //     res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
    //   } catch (err) {
    //     res.sendStatus(400);
    //   }
    // }
    
    // app.post('/photos/upload', upload.array('photos', 12), async (req, res) => {
    //   try {
    //     const col = await loadCollection(COLLECTION_NAME, db)
    //     let data = [].concat(col.insert(req.files));
    //
    //     db.saveDatabase();
    //     res.send(data.map(x => ({ id: x.$loki, fileName: x.filename, originalName: x.originalname })));
    //   } catch (err) {
    //     res.sendStatus(400);
    //   }
    // })
    //
    // app.get('/images', async (req, res) => {
    //   try {
    //     const col = await loadCollection(COLLECTION_NAME, db);
    //     res.send(col.data);
    //   } catch (err) {
    //     res.sendStatus(400);
    //   }
    // })
    //
    // app.get('/images/:id', async (req, res) => {
    //   try {
    //     const col = await loadCollection(COLLECTION_NAME, db);
    //     const result = col.get(req.params.id);
    //
    //     if (!result) {
    //       res.sendStatus(404);
    //       return;
    //     };
    //
    //     res.setHeader('Content-Type', result.mimetype);
    //     fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res);
    //   } catch (err) {
    //     res.sendStatus(400);
    //   }
    // })
    
  }
