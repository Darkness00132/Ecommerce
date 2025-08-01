const ProductDetailsSkeleton = () => {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto p-8 rounded-lg animate-pulse">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg" />
              ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4 h-[400px] bg-gray-200 rounded-lg" />
            {/* Mobile Thumbnails */}
            <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg" />
                ))}
            </div>
          </div>

          {/* Right Side Info */}
          <div className="md:w-1/2 md:ml-10 space-y-4">
            <div className="h-8 w-1/2 bg-gray-200 rounded" />
            <div className="h-6 w-1/4 bg-gray-200 rounded" />
            <div className="h-8 w-1/3 bg-gray-300 rounded" />
            <div className="h-16 w-full bg-gray-200 rounded" />

            {/* Colors */}
            <div>
              <div className="h-4 w-20 bg-gray-300 rounded mb-2" />
              <div className="flex gap-2">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-300" />
                  ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="h-4 w-20 bg-gray-300 rounded mb-2" />
              <div className="flex gap-2">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="w-12 h-10 bg-gray-300 rounded" />
                  ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <div className="h-4 w-20 bg-gray-300 rounded mb-2" />
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-300 rounded" />
                <div className="w-4 h-4 bg-gray-300 rounded" />
                <div className="w-8 h-8 bg-gray-300 rounded" />
              </div>
            </div>

            <div className="h-12 bg-gray-300 rounded w-full" />

            {/* Characteristics */}
            <div className="mt-10 space-y-2">
              <div className="h-6 w-1/3 bg-gray-300 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* Related Products */}
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
