const express = require('express');
const router = express.Router();
const Exchange = require('../../../models/exchange');
const Segment = require('../../../models/segment');

/* GET lastest exchange. */
router.get('/', function (req, res, next) {
  res.send('Welcome to Shroff API Endpoints')
});

router.get('/segment', function (req, res, next) {

  Segment
      .find()
      .sort({createdAt: -1})
      .exec((err, segment) => {
        const all = [];
        segment.map(seg => all.push(seg));
        res.json(all);
      });

});

router.get('/segment/:id', function (req, res, next) {

  const segment = req.params.id;

  Exchange.find({segment})
      .sort({createdAt: -1})
      .limit(1)
      .exec((err, exchange) => res.json(exchange));

});

module.exports = router;