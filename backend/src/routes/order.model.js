const router = require("express").Router();
const auth = require("../middleware/auth.js");
const { admin } = require("../middleware/admin.js");
const orderController = require("../controllers/orderController.js");

router.get("/all", auth, admin, orderController.getOrders);

router.get("/myOrders", auth, orderController.getMyOrders);

router.get("/:id", auth, orderController.getOrder);

router.put("/:id", auth, admin, orderController.updateOrder);

module.exports = router;
