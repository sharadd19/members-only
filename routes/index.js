var express = require("express");
var router = express.Router();
const homeController = require("../controllers/homeController");

/* GET home page. */
router.get("/", homeController.index);

router.get("/signup", homeController.getSignUpForm);

router.post("/signup", homeController.signUp);

router.get("/login", homeController.getLoginForm);

router.post("/login", homeController.login);

router.get("/logout", homeController.logout)

module.exports = router;
