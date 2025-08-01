import { Link } from "react-router-dom";

const ProductsGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products?.map((product, index) => {
        const hasDiscount =
          product.discountPrice && product.discountPrice < product.price;

        const discountPercentage = hasDiscount
          ? Math.round(
              ((product.price - product.discountPrice) / product.price) * 100
            )
          : 0;

        return (
          <Link key={index} to={`/product/${product._id}`} className="block">
            <div className="relative flex flex-col rounded-2xl bg-base-100 border border-base-200 shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              {/* Discount badge */}
              {hasDiscount && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-semibold z-10">
                  -{discountPercentage}%
                </span>
              )}

              {/* Image */}
              <div className="w-full aspect-[3/4] overflow-hidden">
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText || product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="p-4 space-y-1">
                {/* Name */}
                <h3 className="text-base font-semibold text-base-content line-clamp-1">
                  {product.name}
                </h3>

                {/* Brand */}
                {product.brand && (
                  <p className="text-xs text-base-content/50 tracking-wide uppercase">
                    {product.brand}
                  </p>
                )}

                {/* Prices */}
                <div className="flex justify-between items-center text-sm mt-1">
                  {hasDiscount ? (
                    <>
                      <span className="line-through text-base-content/50">
                        ${product.price}
                      </span>
                      <span className="text-base font-bold text-base-content">
                        ${product.discountPrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-base font-bold text-base-content">
                      ${product.price}
                    </span>
                  )}
                </div>

                {/* Low stock info */}
                {product.countInStock <= 5 && (
                  <div className="mt-2 inline-block bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-md">
                    Count in stock: {product.countInStock}
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
