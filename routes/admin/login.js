const express = require('express');
const router = express.Router();

/* GET Administrator Login */
router.get('/', csrfProtection, function (req, res) {
  res.render('login', {title: 'Shroff Administrator',csrfToken: req.csrfToken()});
});

module.exports = router;
