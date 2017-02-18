const express = require('express');
const router = express.Router();
const Segment = require('../../../models/segment');
const Currency = require('../../../models/currency');
const Exchange = require('../../../models/exchange');
const {ensureAuthenticated} = require("../authenticationMiddleware");

router.get('/', ensureAuthenticated, (req, res) => {
  Segment.find((err, segments) => {
    if (err) { return next(err); }
    return res.render('admin/exchange/index', {segments});
  });
});

router.get('/:segment_id/add', ensureAuthenticated, (req, res) => {
  const _id = req.params.segment_id;

  const lists = [];
  Segment.findById(_id).then(segment => {
    segment.currencies.map(id => {
      Currency.findById(id, (err, curr) => {
        lists.push(curr);
      });
    });
  });
  res.render('admin/exchange/add', {currencies: lists});

});

router.post('/:segment_id/add', ensureAuthenticated, (req, res, next) => {

  const _id = req.params.segment_id;
  const currencyList = req.body;

  const newSegment = new Exchange({
    segment: _id,
    currencyList
  });

  newSegment.save(next).then(() => {
    res.redirect('/admin/exchange');
  });

});

router.get('/:segment_id', ensureAuthenticated, (req, res, next) => {
  const exchanges = [];
  Exchange.find({segment: req.params.segment_id}).then(res => {
    res.map(list => {
      exchanges.push(list);
    });
  });
  res.render('admin/exchange/list', {exchanges});
});

router.get('/single/:exchange_id', ensureAuthenticated, (req, res, next) => {
  Exchange.find({_id: req.params.exchange_id}).then(exchangesList => {
    res.render('admin/exchange/single', {exchangesList});
  });
});

module.exports = router;

//REST API READY !!!
//router.route('/:segment_id')
//    .get(function (req, res) {
//
//      res.send(req.params.segment_id);
//
//    })
//    .put(function (req, res) {
//
//      res.send(req.params.segment_id + 'EDIT')
//
//    })
//    .delete(function (req, res, next) {
//
//      Segment.findByIdAndRemove({
//        _id: req.params.segment_id
//      }, function (err, segment) {
//        if (err) { return next(err); }
//        req.flash("info", "Segment was removed");
//        res.redirect('/admin/segment', {messages: req.flash('info')});
//      });
//
//    });