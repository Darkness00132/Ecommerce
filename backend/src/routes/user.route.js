const router = require("express").Router();
const auth = require("../middleware/auth.js");
const verifyCsrf = require("../middleware/csrf.js");
const userController = require("../controllers/userController.js");

router.post("/signup", verifyCsrf, userController.postSignup);

router.post("/login", verifyCsrf, userController.postLogin);

router.get("/profile", auth, userController.getProfile);

router.post("/forgetPassword", verifyCsrf, userController.PostForgetPassword);

router.put("/resetPassword", verifyCsrf, userController.resetPassword);

router.delete("/logout", verifyCsrf, auth, userController.deleteLogout);

module.exports = router;
