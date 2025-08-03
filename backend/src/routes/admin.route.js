const router = require("express").Router();
const adminController = require("../controllers/adminController.js");
const auth = require("../middleware/auth.js");
const verifyCsrf = require("../middleware/csrf.js");
const { admin, superAdmin } = require("../middleware/admin.js");

router.get("/users", auth, admin, adminController.getUsers);

router.post("/", verifyCsrf, auth, superAdmin, adminController.makeUser);

router.put("/", verifyCsrf, auth, superAdmin, adminController.updateUser);

router.delete("/", verifyCsrf, auth, superAdmin, adminController.deleteUser);

module.exports = router;
