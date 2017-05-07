import * as express from 'express';
import MediaCtrl from '../../../../../controllers/media.controller';
const router = express.Router();

const media = new MediaCtrl();

// API
router.route('/')
      .get(media.getAll)
      .post(media.mediaUpload);

router.route('/:id')
      .get(media.get)
      .put(media.update)
      .delete(media.remove);

export default router;
