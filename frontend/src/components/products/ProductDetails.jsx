import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import ProductsGrid from "./ProductsGrid";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance/axiosInstance";
import ProductDetailsSkeleton from "../skeletons/ProductDetailsSkeleton";
import useCart from "../../store/useCart.js";

const ProductDetails = ({ product }) => {
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCart((state) => state.addToCart);
  const isAddingProduct = useCart((state) => state.isAddingProduct);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const { isFetching, data } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data.product;
    },
    enabled: !product && !!id,
  });

  const selectedProduct = data || product;
  const productId = product?._id || id;

  const { data: similarProducts } = useQuery({
    queryKey: ["similarProducts", productId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/products/similar/${productId}`
      );
      return response.data.products;
    },
  });

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  async function handleAddToCart() {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and color before adding to cart.");
      return;
    }
    await addToCart({
      productID: selectedProduct._id,
      name: selectedProduct.name,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
  }

  if (isFetching || !selectedProduct) return <ProductDetailsSkeleton />;

  const { price, discountPrice, countInStock } = selectedProduct;
  const hasDiscount = discountPrice && discountPrice < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <>
      <Helmet>
        <title>{selectedProduct?.metaTitle || selectedProduct.name}</title>
        <meta
          name="description"
          content={
            selectedProduct?.metaDescription ||
            selectedProduct.description.slice(0, 150)
          }
        />
        <meta
          property="og:title"
          content={selectedProduct?.metaTitle || selectedProduct.name}
        />
        <meta
          property="og:description"
          content={
            selectedProduct?.metaDescription ||
            selectedProduct.description.slice(0, 150)
          }
        />
        <meta property="og:image" content={selectedProduct.images[0]?.url} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="Lacoste E-commerce" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={selectedProduct?.metaTitle || selectedProduct.name}
        />
        <meta
          name="twitter:description"
          content={
            selectedProduct?.metaDescription ||
            selectedProduct.description.slice(0, 150)
          }
        />
        <meta name="twitter:image" content={selectedProduct.images[0]?.url} />
        <meta name="twitter:url" content={window.location.href} />
      </Helmet>

      <div className="p-4 sm:p-6">
        <div className="max-w-6xl mx-auto p-4 sm:p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  onClick={() => setMainImage(image.url)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    mainImage === image.url
                      ? "border-neutral shadow-md scale-105"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>

            {/* Main image */}
            <div className="md:w-1/2 relative">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-auto object-cover rounded-lg mb-4"
              />
              {hasDiscount && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-lg z-10">
                  -{discountPercent}%
                </span>
              )}
              <div className="md:hidden flex overflow-x-auto space-x-4">
                {selectedProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.altText || `Thumbnail ${index}`}
                    onClick={() => setMainImage(image.url)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                      mainImage === image.url
                        ? "border-neutral shadow-md scale-105"
                        : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="md:w-1/2 md:ml-10 mt-6 md:mt-0 space-y-4">
              <h1 className="text-2xl md:text-3xl font-semibold">
                {selectedProduct.name}
              </h1>

              <div className="flex items-center gap-2">
                {hasDiscount ? (
                  <>
                    <p className="text-gray-500 line-through">${price}</p>
                    <p className="text-xl font-bold">${discountPrice}</p>
                    <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
                      -{discountPercent}%
                    </span>
                  </>
                ) : (
                  <p className="text-xl font-semibold text-gray-800">
                    ${price}
                  </p>
                )}
              </div>

              {countInStock <= 5 && (
                <p className="text-sm text-red-600 font-medium">
                  Only {countInStock} left in stock!
                </p>
              )}

              <p className="text-gray-700 break-words whitespace-pre-line">
                {selectedProduct.description}
              </p>

              {/* Color */}
              <div>
                <p className="font-medium text-gray-700 mb-1">Color:</p>
                <div className="flex gap-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-black scale-110"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                      title={color}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="font-medium text-gray-700 mb-1">Size:</p>
                <div className="flex gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`btn btn-sm ${
                        selectedSize === size
                          ? "btn-neutral text-white"
                          : "btn-outline"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="font-medium text-gray-700 mb-1">Quantity:</p>
                <div className="flex items-center gap-4">
                  <button
                    className="btn btn-sm"
                    onClick={() =>
                      quantity > 1 && setQuantity((prev) => prev - 1)
                    }
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    className="btn btn-sm"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className={`btn w-full btn-neutral rounded-lg mt-4 ${
                  isAddingProduct ? "btn-disabled" : ""
                }`}
                disabled={isAddingProduct}
              >
                {isAddingProduct ? "Adding..." : "ADD TO CART"}
              </button>

              {/* Characteristics */}
              <div className="mt-8 text-gray-700">
                <h3 className="text-lg font-semibold mb-2">Product Details:</h3>
                <table className="table text-sm">
                  <tbody>
                    <tr>
                      <td className="font-medium">Brand</td>
                      <td>{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Material</td>
                      <td>{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Similar products */}
          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4">
              You May Also Like
            </h2>
            <ProductsGrid products={similarProducts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
