import * as express from 'express';
import CurrencyCtrl from '../../../../../controllers/currency.controller';
const router = express.Router();

const currency = new CurrencyCtrl();
const forAll = (req, res, next) => {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  console.log('on ALL Currency route');
  next();
};

// API
router.route('/')
      .all(forAll)
      .get(currency.getAll)
      .post(currency.insert);

router.route('/:id')
      .all(forAll)
      .get(currency.get)
      .put(currency.update)
      .delete(currency.remove);

export default router;

