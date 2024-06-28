var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController")

router.get("/create", postController.createPostForm)

router.post("/create", postController.makePost)

module.exports = router;
