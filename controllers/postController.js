var asyncHandler = require("express-async-handler");
var PostModel = require("../models/postModel");
var UserModel = require("../models/userModel");
const { body, validationResult } = require("express-validator");

exports.createPostForm = (req, res) => {
  res.render("postForm", { title: "Create Post" });
};

exports.makePost = [
  body("title", "Title must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Password must contain at least 3 characters")
    .trim()
    .isLength({ min: 3, max: 200 })
    .escape()
    .withMessage("Post over character limit"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      res.render("postForm", {
        title: "Create Post",
        errors: errors.array(),
      });
      return;
    } else {
      const postDetails = {
        title: req.body.title,
        description: req.body.description,
        date: Date.now(),
        user: req.user,
      };
      const post = new PostModel(postDetails);
      await post.save();

      res.redirect("/user");
    }
  }),
];

exports.deletePostForm = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.params.id).populate("user").exec();

  res.render("deletePostForm", { title: "Delete Post", post: post });
});


exports.deletePost = asyncHandler(async(req, res) => {
  await PostModel.deleteOne({ _id: req.params.id });

  res.redirect("/user")
})