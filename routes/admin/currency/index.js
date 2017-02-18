const express = require('express');
const router = express.Router();
const Currecny = require('../../../models/currency');
const {ensureAuthenticated} = require("../authenticationMiddleware");

router.get('/', ensureAuthenticated, (req, res) => {
  Currecny.find(function (err, currencies) {
    if (err) { return next(err); }
    return res.render('admin/currency/index', {currencies});
  });
});

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('admin/currency/add');
});

router.post('/add', ensureAuthenticated, (req, res, next) => {

  const name = req.body.name;
  const symbol = req.body.symbol;
  const thumbnail = req.body.thumbnail;

  Currecny.findOne({name: name}, function (err, currency) {

    if (err) { return next(err); }
    if (currency) {
      req.flash("error", "Currecny already exists");
      return res.render("admin/currency/add", {messages: req.flash('error')});
    }

    const newCurrecny = new Currecny({
      name: name,
      symbol: symbol,
      thumbnail: thumbnail
    });
    newCurrecny.save(next).then(() => {
      res.redirect('/admin/currency');
    });
  });

});

//REST API READY !!!
//router.route('/:currency_id')
//    .get(function (req, res) {
//
//      res.send(req.params.currency_id);
//
//    })
//    .put(function (req, res) {
//
//      res.send(req.params.currency_id + 'EDIT')
//
//    })
//    .delete(function (req, res, next) {
//
//      Currecny.findByIdAndRemove({
//        _id: req.params.currency_id
//      }, function (err, currency) {
//        if (err) { return next(err); }
//        req.flash("info", "Currecny was removed");
//        res.redirect('/admin/currency', {messages: req.flash('info')});
//      });
//
//    });

router.get('/:currency_id', ensureAuthenticated, (req, res, next) => {

  Currecny.findOne({
    _id: req.params.currency_id
  }, (err, currency) => {

    if (err) { return next(err); }

    if (!currency) {
      req.flash("error", "Currecny does not exist");
      return res.redirect("/admin/currency", {messages: req.flash('error')});
    }

    res.render('admin/currency/single', {currency});
  });

});

router.post('/:currency_id', ensureAuthenticated, (req, res, next) => {

  Currecny.findByIdAndRemove({
    _id: req.params.currency_id
  }, function (err, currency) {

    if (err) { return next(err); }

    if (!currency) {
      req.flash("error", "Currecny already deleted");
      return res.redirect("/admin/currency");
    }

    res.redirect('/admin/currency');
  });

});

module.exports = router;
