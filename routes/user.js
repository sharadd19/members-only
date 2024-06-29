var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController")


router.get("/", userController.userHome)

router.get("/:id/getPosts", userController.getPostsByUser)

router.get("/membership", userController.getMembershipForm)

router.post("/membership", userController.membership)

router.get("/admin", userController.getAdminForm)

router.post("/admin", userController.admin)


module.exports = router;
