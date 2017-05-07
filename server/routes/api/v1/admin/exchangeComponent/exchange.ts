import * as express from 'express';
import ExchangeCtrl from '../../../../../controllers/exchange.controller';
const router = express.Router();

const exchange = new ExchangeCtrl();
const forAll = (req, res, next) => {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  console.log('on ALL exchange route');
  next();
};

// API
router.route('/')
      .all(forAll)
      .get(exchange.getAll)
      .post(exchange.insert);
router.route('/count')
      .all(forAll)
      .get(exchange.count);
router.route('/:id')
      .all(forAll)
      .get(exchange.get)
      .put(exchange.update)
      .delete(exchange.remove);

export default router;

