const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");

const productSchema = new mogoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    sizes: {
      type: [String],
      required: true,
      validate: [(arr) => arr.length > 0, "At least one size is required"],
    },
    colors: {
      type: [String],
      required: true,
      validate: [(arr) => arr.length > 0, "At least one color is required"],
    },
    collections: {
      type: String,
      required: true,
    },
    material: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Men", "Woman", "Unisex"],
    },
    images: {
      type: [
        {
          url: {
            type: String,
            required: true,
          },
          altText: {
            type: String,
          },
          public_id: {
            type: String,
          },
        },
      ],
      validate(val) {
        return val.length <= 5;
      },
      message: "You can upload a maximum of 5 images only.",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeyword: {
      type: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: Number,
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.discountPrice = this.price;
  next();
});

module.exports = mongoose.model("Product", productSchema);
