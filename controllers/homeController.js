const hashPassword = require("../passwordHelper").hashPassword;
const passport = require("passport");
const UserModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = (req, res) => {
  res.render("index", { title: "Members Club" });
};

exports.getSignUpForm = (req, res) => {
  res.render("signup", { title: "Create an Account!" });
};

exports.signUp = [
  body("username", "Username must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("password", "Password must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("confirmPassword", "Passwords must match").trim().isLength({min: 3}).escape()
  .custom((value, {req}) => value === req.body.password).withMessage("The passwords do not match"),

  asyncHandler(async (req, res, next) => {
    try {
      const hashedPassword = hashPassword(req.body.password);

      const userDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPassword,
        membership: false,
        isAdmin: false,
      };
      const user = new UserModel(userDetails);
      await user.save();

      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  }),
];

exports.login = passport.authenticate("local", {
  successRedirect: "/user",
  failureRedirect: "/",
});
