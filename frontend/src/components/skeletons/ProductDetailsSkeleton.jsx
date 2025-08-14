const ProductDetailsSkeleton = () => {
  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-6xl mx-auto p-4 sm:p-8 rounded-lg animate-pulse">
        {/* Main Layout */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Side Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg" />
              ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2 relative">
            <div className="w-full h-[400px] bg-gray-200 rounded-lg mb-4" />
            <div className="md:hidden flex overflow-x-auto mb-4 space-x-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg" />
                ))}
            </div>
            {/* Discount badge placeholder */}
            <div className="absolute top-3 left-3 w-16 h-6 bg-gray-300 rounded-lg" />
          </div>

          {/* Info Section */}
          <div className="md:w-1/2 mt-6 md:mt-0 space-y-4 ml-6 text-left">
            <div className="h-8 w-1/2 bg-gray-200 rounded" />
            <div className="h-6 w-1/4 bg-gray-200 rounded" />
            <div className="h-8 w-1/3 bg-gray-300 rounded" />
            <div className="h-16 w-full bg-gray-200 rounded" />

            {/* Color selector */}
            <div>
              <div className="h-4 w-20 bg-gray-300 rounded mb-1" />
              <div className="flex flex-wrap gap-2 justify-start">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gray-300 rounded-full" />
                  ))}
              </div>
            </div>

            {/* Size selector */}
            <div>
              <div className="h-4 w-20 bg-gray-300 rounded mb-1" />
              <div className="flex gap-2 flex-wrap justify-start">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="w-12 h-10 bg-gray-300 rounded" />
                  ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <div className="h-4 w-20 bg-gray-300 rounded mb-1" />
              <div className="flex items-center gap-4 justify-start">
                <div className="w-8 h-8 bg-gray-300 rounded" />
                <div className="w-4 h-4 bg-gray-300 rounded" />
                <div className="w-8 h-8 bg-gray-300 rounded" />
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="h-12 bg-gray-300 rounded w-full" />

            {/* Product Details Table */}
            <div className="mt-8 space-y-2">
              <div className="h-6 w-1/3 bg-gray-300 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-20">
          <div className="h-6 w-1/3 bg-gray-300 mx-auto mb-4 rounded" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
