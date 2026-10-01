const express = require ("express")
const  router = express.Router()
const userController = require ("../controller/userController")


router.get("/login", userController.getLoginPage);
router.get("/signup", userController.getSignupPage);
router.get("/logout", userController.logout)

router.post("/signup", userController.postRegister);
router.post("/login", userController.postLogin);


module.exports = router;