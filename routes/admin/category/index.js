const express = require('express');
const router = express.Router();
const Category = require('../../../models/category');

router.get('/', function (req, res) {
  Category.find(function (err, categories) {
    if (err) { return next(err); }
    return res.render('admin/category/index', {categories});
  });
});

router.get('/add', function (req, res) {
  res.render('admin/category/add');
});

router.post('/add', function (req, res, next) {

  const name = req.body.name;
  const thumbnail = req.body.thumbnail;

  Category.findOne({name: name}, function (err, category) {

    if (err) { return next(err); }
    if (category) {
      req.flash("error", "Category already exists");
      return res.render("admin/category/add", {messages: req.flash('error')});
    }

    const newCategory = new Category({
      name: name,
      thumbnail: thumbnail
    });
    newCategory.save(next).then(() => {
      res.redirect('/admin/category');
    });
  });

});

//REST API READY !!!
//router.route('/:category_id')
//    .get(function (req, res) {
//
//      res.send(req.params.category_id);
//
//    })
//    .put(function (req, res) {
//
//      res.send(req.params.category_id + 'EDIT')
//
//    })
//    .delete(function (req, res, next) {
//
//      Category.findByIdAndRemove({
//        _id: req.params.category_id
//      }, function (err, category) {
//        if (err) { return next(err); }
//        req.flash("info", "Category was removed");
//        res.redirect('/admin/category', {messages: req.flash('info')});
//      });
//
//    });

router.get('/:category_id', function (req, res, next) {

  Category.findOne({
    _id: req.params.category_id
  }, (err, category) => {

    if (err) { return next(err); }

    if (!category) {
      req.flash("error", "Category does not exist");
      return res.redirect("/admin/category", {messages: req.flash('error')});
    }

    res.render('admin/category/single', {category});
  });

});

router.post('/:category_id', function (req, res, next) {

  Category.findByIdAndRemove({
    _id: req.params.category_id
  }, function (err, category) {

    if (err) { return next(err); }

    if (!category) {
      req.flash("error", "Category already deleted");
      return res.redirect("/admin/category");
    }

    res.redirect('/admin/category');
  });

});

module.exports = router;
