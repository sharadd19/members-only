var asyncHandler = require("express-async-handler");
var PostModel = require("../models/postModel");
var UserModel = require("../models/userModel");
require("dotenv").config();

exports.userHome = asyncHandler(async (req, res) => {
  //const myPosts = await PostModel.find({user: req.user.id}).populate("user").exec()
  const postList = await PostModel.find().sort({date: -1}).populate("user").exec();
  const user = req.user;

  res.render("user", {
    user: user,
    postList: postList,
    //myPosts: myPosts,
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
 
  if (secret === process.env.MEMBERSHIP_PASSWORD) {
    await UserModel.findByIdAndUpdate(req.user.id, {membership: true});

    res.redirect("/user")
  } else {
    res.render("membershipForm", {
      title: "Membership",
      error: { val: true, message: "Sorry, you entered the wrong secret" },
    });
  }
});

exports.getAdminForm = asyncHandler(async(req, res) => {
  const {isAdmin} = await UserModel.findOne({_id: req.user.id}, "isAdmin").exec()
  
  res.render("adminForm", { title: "Admin", isAdmin: isAdmin });
});

exports.admin = asyncHandler(async (req, res) => {
  const secret = req.body.secret;
 
  if (secret === process.env.ADMIN_PASSWORD) {
    await UserModel.findByIdAndUpdate(req.user.id, {isAdmin: true, membership: true});

    res.redirect("/user")
  } else {
    res.render("adminForm", {
      title: "Admin",
      error: { val: true, message: "Sorry, you entered the wrong secret" },
    });
  }
});