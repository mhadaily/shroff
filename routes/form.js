const express = require('express');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const router = express.Router();

// setup route middlewares
const csrfProtection = csrf({cookie: true});
const parseForm = bodyParser.urlencoded({extended: false});

/* GET users listing. */
router.get('/', csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  res.render('form', {csrfToken: req.csrfToken()})
});

router.post('/process', parseForm, csrfProtection, function (req, res) {
  res.send('data is being processed')
});

module.exports = router;
