const router = require("express").Router();
const checkoutController = require("../controllers/checkoutController");
const verifyCsrf = require("../middleware/csrf.js");
const auth = require("../middleware/auth.js");

router.post("/", verifyCsrf, auth, checkoutController.makeCheckout);

//update checkout after succeful paying
router.put("/:id/pay", verifyCsrf, auth, checkoutController.updateCheckout);

//when paid and finalized make order
router.post("/:id/finalize", verifyCsrf, auth, checkoutController.makeOrder);

module.exports = router;
