import * as express from 'express';
import RoleCtrl from '../../../../../controllers/role.controller';
const router = express.Router();

const role = new RoleCtrl();

// API
router.route('/')
      .get(role.getAll)
      .post(role.insert);

router.route('/:id')
      .get(role.get)
      .put(role.update)
      .delete(role.remove);

export default router;

