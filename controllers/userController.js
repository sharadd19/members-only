var asyncHandler = require("express-async-handler");
var PostModel = require("../models/postModel");

exports.userHome = asyncHandler(async (req, res) => {
  const postList = await PostModel.find().exec();

  res.render("user", {
    user: req.user,
    postList: postList,
  });
});

exports.getPostsByUser = asyncHandler(async (req, res) => {
  const userPosts = await PostModel.find({ user: req.user.id })
    .populate("user")
    .exec();

  res.render("myPosts", {
    title: "My Posts",
    userPosts: userPosts,
  });
});

exports.getMembershipForm = (req, res) => {
  res.render("membershipForm", { title: "Membership" });
};

exports.membership = asyncHandler(async (req, res) => {
  const secret = req.body.secret;
  if (secret === "excelsior") {
    await UserModel.findByIdAndUpdate(req.user.id, { membership: true });
  } else {
    res.redirect("/user/membership", {
      title: "Membership",
      error: {val: true, message: "Sorry, you entered the wrong secret"},
    });
  }
});
