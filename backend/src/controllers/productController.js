const Product = require("../models/product.model.js");
const asyncHandler = require("../utils/asyncHandler.js");

const { uploadToCloudinary, cloudinary } = require("../middleware/upload.js");

const allowedFields = [
  "name",
  "description",
  "price",
  "discountPrice",
  "countInStock",
  "sku",
  "category",
  "brand",
  "sizes",
  "colors",
  "collections",
  "material",
  "gender",
  "isFeatured",
  "isPublished",
  "rating",
  "numReviews",
  "tags",
  "metaTitle",
  "metaDescription",
  "metaKeyword",
  "dimensions",
  "weight",
];

let productController = {};

productController.getProducts = asyncHandler(async (req, res) => {
  const userQueries = {};

  const {
    category,
    collection,
    colors,
    sizes,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    material,
    brand,
  } = req.query;

  if (collection && collection.toLowerCase() !== "all") {
    userQueries.collection = collection;
  }

  if (category && category.toLowerCase() !== "all") {
    userQueries.category = category;
  }

  if (material) {
    userQueries.material = { $in: material.split(",") };
  }

  if (brand) {
    userQueries.brand = { $in: brand.split(",") };
  }

  if (sizes) {
    userQueries.sizes = { $in: sizes.split(",") };
  }

  if (colors) {
    userQueries.colors = { $in: colors.split(",") };
  }

  if (gender) {
    userQueries.gender = gender;
  }

  if (minPrice || maxPrice) {
    userQueries.discountPrice = {};
    if (minPrice) userQueries.discountPrice.$gte = Number(minPrice);
    if (maxPrice) userQueries.discountPrice.$lte = Number(maxPrice);
  }

  if (search) {
    userQueries.$or = [
      { name: { $regex: search, $options: "i" } },
      { sku: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  let sort;
  if (sortBy) {
    switch (sortBy) {
      case "priceASC":
        sort = { price: 1 };
        break;
      case "priceDESC":
        sort = { price: -1 };
        break;
      case "popularity":
        sort = { rating: -1, numReviews: -1 };
        break;
      case "stockASC":
        sort = { countInStock: 1 };
        break;
      case "stockDESC":
        sort = { countInStock: -1 };
        break;
      default:
        sort = { createdAt: -1 };
        break;
    }
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;
  const totalProducts = await Product.countDocuments(userQueries);

  const products = await Product.find(userQueries)
    .sort(sort)
    .limit(Number(limit) || 0)
    .skip(skip);

  res.status(200).json({
    page,
    products,
    totalPages: Math.ceil(totalProducts / limit),
    totalProducts,
  });
});

productController.getBestSeller = asyncHandler(async (req, res) => {
  const bestSeller = await Product.findOne().sort({
    rating: -1,
    numReviews: -1,
  });
  res.json({ bestSeller });
});

productController.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ product });
});

productController.getSimilarProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const { gender, category, brand } = product;

  const products = await Product.find({
    $and: [
      { _id: { $ne: req.params.id } },
      { gender },
      { $or: [{ category }, { brand }] },
    ],
  }).limit(4);

  res.status(200).json({ products });
});

productController.makeProduct = asyncHandler(async (req, res) => {
  //for postman
  if (req.body?.data !== undefined) {
    req.body = JSON.parse(req.body.data);
  }
  const filteredBody = {};
  for (const key of allowedFields) {
    if (req.body[key] !== undefined) {
      filteredBody[key] = req.body[key].trim();
    }
  }
  if (filteredBody.sizes) {
    if (typeof filteredBody.sizes === "string") {
      filteredBody.sizes = filteredBody.sizes.split(",").map((s) => s.trim());
    } else if (Array.isArray(filteredBody.sizes)) {
      filteredBody.sizes = filteredBody.sizes.map((s) => s.trim());
    }
  }

  if (filteredBody.colors) {
    if (typeof filteredBody.colors === "string") {
      filteredBody.colors = filteredBody.colors.split(",").map((c) => c.trim());
    } else if (Array.isArray(filteredBody.colors)) {
      filteredBody.colors = filteredBody.colors.map((c) => c.trim());
    }
  }

  if (filteredBody.tags) {
    if (typeof filteredBody.tags === "string") {
      filteredBody.tags = filteredBody.tags.split(",").map((t) => t.trim());
    } else if (Array.isArray(filteredBody.tags)) {
      filteredBody.tags = filteredBody.tags.map((t) => t.trim());
    }
  }

  const results = await Promise.all(
    req.files.map((file) => {
      return uploadToCloudinary(file.buffer);
    })
  );
  filteredBody.images = results.map((r) => ({
    url: r.secure_url,
    public_id: r.public_id,
  }));

  filteredBody.user = req.user._id;

  const product = await Product.create(filteredBody);

  res.status(201).json({ product });
});

productController.updateProduct = asyncHandler(async (req, res) => {
  //for postman
  if (req.body?.data !== undefined) {
    req.body = JSON.parse(req.body.data);
  }
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  if (req.body.sizes) {
    if (typeof req.body.sizes === "string") {
      req.body.sizes = req.body.sizes.split(",").map((s) => s.trim());
    } else if (Array.isArray(req.body.sizes)) {
      req.body.sizes = req.body.sizes.map((s) => s.trim());
    }
  }

  if (req.body.colors) {
    if (typeof req.body.colors === "string") {
      req.body.colors = req.body.colors.split(",").map((c) => c.trim());
    } else if (Array.isArray(req.body.colors)) {
      req.body.colors = req.body.colors.map((c) => c.trim());
    }
  }

  if (req.body.tags) {
    if (typeof req.body.tags === "string") {
      req.body.tags = req.body.tags.split(",").map((t) => t.trim());
    } else if (Array.isArray(req.body.tags)) {
      req.body.tags = req.body.tags.map((t) => t.trim());
    }
  }
  for (const key of allowedFields) {
    if (req.body[key] !== undefined) {
      product[key] = req.body[key];
    }
  }

  //get images user want to keep then delete what user dont want from cloudinary and database
  const incomingImageUrls = JSON.parse(req.body.existingImages || "[]").map(
    (img) => img.url
  );
  const deletePromises = product.images
    .filter(
      (image) => !incomingImageUrls.includes(image.url) && image.public_id
    )
    .map((image) => cloudinary.uploader.destroy(image.public_id));

  if (deletePromises.length > 0) {
    await Promise.all(deletePromises);
  }
  product.images = product.images.filter((image) =>
    incomingImageUrls.includes(image.url)
  );

  //Handle user want insert new images
  if (req.files?.length) {
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.buffer);
      product.images.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }
  }

  const updatedProduct = await product.save();
  res.status(200).json({ product: updatedProduct });
});

// productController.deleteProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findOneAndDelete({ _id: req.params.id });

//   if (!product) {
//     return res.status(404).json({ message: "Product not found" });
//   }
//   res.status(200).json({ message: "Product deleted successfully" });
// });

module.exports = productController;
