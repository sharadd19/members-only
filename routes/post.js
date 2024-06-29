var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController")
const isAdmin = require("../routes/protected").isAdmin;
const isMember = require("../routes/protected").isMember;

router.use("/delete", isAdmin);

router.use("/edit", isMember)

router.get("/create", postController.createPostForm)

router.post("/create", postController.savePost)

router.post("/:id/create", postController.savePost)

router.get("/:id/delete", isAdmin, postController.deletePostForm)

router.post("/:id/delete", isAdmin, postController.deletePost)

router.get("/:id/edit", isMember, postController.editPostForm)


module.exports = router;
