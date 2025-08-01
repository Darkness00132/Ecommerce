const CollectionSkeleton = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="filter-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Mobile toggle button */}
        <div className="lg:hidden bg-base-100 py-3 px-4 flex justify-center shadow-sm border-b border-base-300">
          <label
            htmlFor="filter-drawer"
            className="btn btn-sm btn-disabled gap-2"
          >
            <div className="w-4 h-4 bg-base-300 rounded-full animate-pulse" />
            <span className="w-20 h-4 bg-base-300 rounded animate-pulse"></span>
          </label>
        </div>

        <div className="flex-grow p-4 space-y-4">
          {/* Heading */}
          <div className="h-6 w-40 bg-base-300 rounded animate-pulse"></div>

          {/* Sort Options */}
          <div className="flex gap-4">
            <div className="h-10 w-32 bg-base-300 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-base-300 rounded animate-pulse"></div>
          </div>

          {/* Product grid */}
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-base-300 animate-pulse rounded-xl shadow"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar skeleton */}
      <div className="drawer-side lg:bg-base-200 lg:p-4 lg:overflow-y-auto lg:shadow-lg lg:border-r lg:border-base-300 lg:min-w-[250px] hidden lg:block">
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-6 bg-base-300 rounded animate-pulse w-3/4"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionSkeleton;
