const hashPassword = require("../passwordHelper").hashPassword;
const passport = require("passport");
const UserModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const PostModel = require("../models/postModel");

exports.index = asyncHandler(async (req, res) => {
  const postList = await PostModel.find().populate("user").exec();
  res.render("index", {
    title: "Members Club",
    postList: postList,
  });
});

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
  body("confirmPassword", "Passwords must match")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("The passwords do not match"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      res.render("signup", {
        title: "Create an account!",
        errors: errors.array(),
      });
      return;
    } else {
      const hashedPassword = await Promise.resolve(
        hashPassword(req.body.password)
      );

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

      res.redirect("/login");
    }
  }),
];

exports.getLoginForm = (req, res) => {
  var failureMessages = [...new Set(req.session.messages)];

  res.render("login", { title: "Login!", failureMessages: failureMessages });
};
exports.login = passport.authenticate("local", {
  successRedirect: "/user",
  failureRedirect: "/login",
  failureMessage: true,
});

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
