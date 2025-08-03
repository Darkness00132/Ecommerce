const router = require("express").Router();
const productController = require("../controllers/productController.js");
const auth = require("../middleware/auth.js");
const { admin } = require("../middleware/admin.js");
const verifyCsrf = require("../middleware/csrf.js");
const { upload } = require("../middleware/upload.js");

router.get("/", productController.getProducts);

router.get("/bestSeller", productController.getBestSeller);

router.get("/:id", productController.getProduct);

//route to get you may like products similar to product you choose
router.get("/similar/:id", productController.getSimilarProducts);

router.post(
  "/makeProduct",
  verifyCsrf,
  auth,
  admin,
  upload.array("images", 5),
  productController.makeProduct
);

router.put(
  "/:id",
  verifyCsrf,
  auth,
  admin,
  upload.array("images", 5),
  productController.updateProduct
);

router.delete("/:id", verifyCsrf, auth, admin, productController.deleteProduct);

module.exports = router;
