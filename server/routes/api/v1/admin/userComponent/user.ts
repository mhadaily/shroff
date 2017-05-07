import * as express from 'express';
import UserCtrl from '../../../../../controllers/user.controller';
const router = express.Router();

const user = new UserCtrl();

// API
router.route('/')
      .get(user.getAll)
      .post(user.insert);

router.route('/:id')
      .get(user.get)
      .put(user.update)
      .delete(user.remove);

export default router;

