const express = require('express');
const router = express.Router();
const Segment = require('../../../models/segment');
const Currency = require('../../../models/currency');
const Category = require('../../../models/category');
const {ensureAuthenticated} = require("../authenticationMiddleware");

router.get('/', ensureAuthenticated, (req, res) => {
  Segment.find(function (err, segments) {
    if (err) { return next(err); }
    return res.render('admin/segment/index', {segments});
  });
});

router.get('/add', ensureAuthenticated, (req, res) => {
  Category.find((err, categories) => {
    if (err) { return next(err); }
    Currency.find((err, currencies) => {
      if (err) { return next(err); }
      res.render('admin/segment/add', {categories, currencies});
    });
  });

});

router.post('/add', ensureAuthenticated, (req, res, next) => {

  const name = req.body.name;
  const category = req.body.category;
  const currencies = req.body.currencies;

  Segment.findOne({name: name}, function (err, segment) {

    if (err) { return next(err); }
    if (segment) {
      req.flash("error", "Segment already exists");
      return res.render("admin/segment/add", {messages: req.flash('error')});
    }

    const newSegment = new Segment({
      name,
      category,
      currencies
    });
    newSegment.save(next).then(() => {
      res.redirect('/admin/segment');
    });
  });

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

router.get('/:segment_id', ensureAuthenticated, (req, res, next) => {

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

router.post('/:segment_id', ensureAuthenticated, (req, res, next) => {

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
