var asyncHandler = require("express-async-handler");
var PostModel = require("../models/postModel");
var UserModel = require("../models/userModel");

exports.userHome = asyncHandler(async (req, res) => {
  const postList = await PostModel.find().populate("user").exec();
  const user = req.user;
  res.render("user", {
    user: user,
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

exports.getMembershipForm = asyncHandler(async(req, res) => {
  const {membership} = await UserModel.findOne({_id: req.user.id}, "membership").exec()
  
  res.render("membershipForm", { title: "Membership", membership: membership });
});

exports.membership = asyncHandler(async (req, res) => {
  const secret = req.body.secret;
  const postList = await PostModel.find().exec();
 
  if (secret === "excelsior") {
    await UserModel.findByIdAndUpdate(req.user.id, {membership: true});

    res.render("user", { user: req.user, postList: postList });
  } else {
    res.render("membershipForm", {
      title: "Membership",
      error: { val: true, message: "Sorry, you entered the wrong secret" },
    });
  }
});
