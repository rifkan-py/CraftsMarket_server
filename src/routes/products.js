const multer = require("multer");
const {
  allProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
  createProduct,
  uploadImage,
} = require("../controllers/products");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = require("express").Router();

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimeType.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new Error("upload correct file type"), false);
  }
};
const upload = multer({
  storage,
  fileFilter,
});

router.get("/", allProducts);
router.post("/", authenticate, authorize(["ADMIN", "VENDOR"]), createProduct);
router.post(
  "/upload",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  upload.single("file"),
  uploadImage
);
router.get("/:id", authenticate, authorize(["ADMIN", "VENDOR"]), singleProduct);
router.put("/:id", authenticate, authorize(["ADMIN", "VENDOR"]), updateProduct);
router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  deleteProduct
);

module.exports = router;
