const router = require("express").Router();
const cartController = require("../controllers/cartController.js");
const verifyCsrf = require("../middleware/csrf.js");
const auth = require("../middleware/auth.js");

router.get("/", cartController.getCart);

router.post("/", verifyCsrf, cartController.addProductToCart);

router.put("/", verifyCsrf, cartController.updateProductInCart);

router.delete("/", verifyCsrf, cartController.deleteProductInCart);

//merge product from guest to its account
router.post("/merge", verifyCsrf, auth, cartController.mergeProductsInCart);

module.exports = router;
