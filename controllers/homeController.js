const hashPassword = require("../passwordHelper").hashPassword;
const passport = require("passport");
const UserModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = /* [
  body("username", "Username must exist")
  .trim()
  .isLength({min: 3})
  .escape()
  .custom(async value => {
    return await UserModel.find({username: value}).exec()
  })
  .withMessage("Username doesn't exist"),
  body("username", "Username must exist")
  .trim()
  .isLength({min: 3})
  .escape()
  .custom(async value => {
    return await UserModel.find({username: value}).exec()
  })
  .withMessage("Username doesn't exist"),   

  , */(req, res) => {
  var failureMessages = [... new Set(req.session.messages)]
  
  res.render("index", { title: "Members Club", failureMessages: failureMessages});
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

      res.redirect("/");
    }
  }),
];

exports.login = passport.authenticate("local", {
  successRedirect: "/user",
  failureRedirect: "/",
  failureMessage: true
});

exports.logout = (req,res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}