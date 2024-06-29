var asyncHandler = require("express-async-handler");
var PostModel = require("../models/postModel");
var UserModel = require("../models/userModel");
const { body, validationResult } = require("express-validator");

exports.createPostForm = (req, res) => {
  res.render("postForm", { title: "Create Post" });
};

exports.savePost = [
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

    const post = new PostModel({
      title: req.body.title,
      description: req.body.description,
      date: Date.now(),
      user: req.user,
    });

    // If we have an id from the request params, we know we are updating a post
    const updatePost = JSON.stringify(req.params.id) !== undefined;

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const title = updatePost ? "Update Post" : "Create Post";

      res.render("postForm", {
        title: title,
        post: post,
        errors: errors.array(),
      });
      return;
    } else {
      if (updatePost) {
        post._id = req.params.id;
        await PostModel.findByIdAndUpdate(req.params.id, post);
        res.redirect("/user");
      }

      await post.save();
      res.redirect("/user");
    }
  }),
];

exports.deletePostForm = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.params.id).populate("user").exec();

  res.render("deletePostForm", { title: "Delete Post", post: post });
});

exports.deletePost = asyncHandler(async (req, res) => {
  await PostModel.deleteOne({ _id: req.params.id });

  res.redirect("/user");
});

exports.editPostForm = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.params.id).populate("user").exec();

  res.render("postForm", { title: "Create Post", post: post });
});
