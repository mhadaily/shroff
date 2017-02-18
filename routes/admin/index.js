const express = require("express");
const passport = require("passport");
const User = require("../../models/user");
const router = express.Router();
const {ensureAuthenticated} = require("./authenticationMiddleware");

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("admin/index", {username: req.user.username});
});

router.get("/userlist", ensureAuthenticated, (req, res, next) => {
  User.find()
      .sort({createdAt: "descending"})
      .exec(function (err, users) {
        if (err) { return next(err); }
        res.render("admin/userlist", {users: users});
      });
});

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/admin");
  } else {
    res.render("admin/login");
  }
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/admin/",
  failureRedirect: "/admin/login",
  failureFlash: true
}));

router.get("/logout", ensureAuthenticated, (req, res) => {
  req.logout();
  res.redirect("/admin/login");
});

router.get("/signup", (req, res) => {
  res.render("admin/signup");
});

router.post("/signup", (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username: username}, function (err, user) {

    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("admin/signup");
    }

    const newUser = new User({
      username: username,
      password: password
    });
    newUser.save(next);

  });
}, passport.authenticate("login", {
  successRedirect: "/admin/login",
  failureRedirect: "/admin/signup",
  failureFlash: true
}));

router.get("/users/:username", ensureAuthenticated, (req, res, next) => {
  User.findOne({username: req.params.username}, (err, user) => {
    if (err) { return next(err); }
    if (!user) { return next(404); }
    res.render("admin/profile", {user: user});
  });
});

router.post("/edit", ensureAuthenticated, (req, res, next) => {
  req.user.displayName = req.body.displayname;
  req.user.bio = req.body.bio;
  req.user.save((err) => {
    if (err) {
      next(err);
      return;
    }
    req.flash("info", "Profile updated!");
    res.redirect("/edit");
  });
});

module.exports = router;
