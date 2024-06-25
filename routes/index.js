var express = require("express");
var router = express.Router();
const hashPassword = require("../passwordHelper").hashPassword;
const passport = require("passport");
const UserModel = require("../models/userModel");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Members Club" });
});

router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Create an Account!" });
});

router.post("/signup", async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    console.log(hashedPassword);
    const userDetails = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword,
      status: true,
      isAdmin: false,
    };
    const user = new UserModel(userDetails);
    await user.save();

    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/",
  })
);

module.exports = router;
