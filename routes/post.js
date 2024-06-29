var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController")
const isAdmin = require("../routes/protected").isAdmin;

router.use("/delete", isAdmin);

router.get("/create", postController.createPostForm)

router.post("/create", postController.makePost)

router.get("/:id/delete", isAdmin, postController.deletePostForm)

router.post("/:id/delete", isAdmin, postController.deletePost)

module.exports = router;
