const express = require('express');
const router = express.Router();
const Segment = require('../../../models/segment');
const Currency = require('../../../models/currency');
const Category = require('../../../models/category');
const Exchange = require('../../../models/exchange');

router.get('/', function (req, res) {
  Segment.find((err, segments) => {
    if (err) { return next(err); }
    return res.render('admin/exchange/index', {segments});
  });
});

router.get('/:segment_id/add', function (req, res) {
  const _id = req.params.segment_id;

  let lists = [];
  Segment.findById(_id).then(segment => {
    segment.currencies.map(id => {
      Currency.findById(id, (err, curr) => {
        lists = [...lists, curr];
        res.render('admin/exchange/add', {currencies: lists});
      });
    });
  });


});

router.post('/add', function (req, res, next) {

  const name = req.body.name;
  const category = req.body.category;
  const currencies = req.body.currencies;



  //Segment.findOne({name: name}, function (err, segment) {
  //
  //  if (err) { return next(err); }
  //  if (segment) {
  //    req.flash("error", "Segment already exists");
  //    return res.render("admin/segment/add", {messages: req.flash('error')});
  //  }
  //
  //  const newSegment = new Segment({
  //    name,
  //    category,
  //    currencies
  //  });
  //  newSegment.save(next).then(() => {
  //    res.redirect('/admin/segment');
  //  });
  //});

});

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

router.get('/:segment_id', function (req, res, next) {

  Segment.findOne({
    _id: req.params.segment_id
  }, (err, segment) => {

    if (err) { return next(err); }

    if (!segment) {
      req.flash("error", "Segment does not exist");
      return res.redirect("/admin/segment", {messages: req.flash('error')});
    }
    res.render('admin/segment/single', {segment});
  });

});

router.post('/:segment_id', function (req, res, next) {

  Segment.findByIdAndRemove({
    _id: req.params.segment_id
  }, function (err, segment) {

    if (err) { return next(err); }

    if (!segment) {
      req.flash("error", "Segment already deleted");
      return res.redirect("/admin/segment");
    }

    res.redirect('/admin/segment');
  });

});

module.exports = router;
