import { Link } from "react-router-dom";

const GenderCollection = () => {
  return (
    <section className="py-16 px-2 sm:px-4 lg:px-6 xl:px-12">
      <div className="mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Women's Collection */}
        <div className="relative flex-1 group overflow-hidden rounded-2xl shadow-md">
          <img
            src="https://res.cloudinary.com/dgzqfkqua/image/upload/f_auto,q_auto/v1754111603/womens-collection_qdvwsb.jpg"
            alt="Women's Collection"
            fetchpriority="high"
            className="w-full aspect-[3/4] object-cover transform transition duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-base-200/90 backdrop-blur-md p-5 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-2">
              Women's Collection
            </h2>
            <Link
              to="/collections?gender=Woman"
              className="btn btn-sm btn-info"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1 group overflow-hidden rounded-2xl shadow-md">
          <img
            src="https://res.cloudinary.com/dgzqfkqua/image/upload/f_auto,q_auto/v1754111608/mens-collection_f4oqcj.jpg"
            alt="Men's Collection"
            fetchpriority="high"
            className="w-full aspect-[3/4] object-cover transform transition duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-base-200/90 backdrop-blur-md p-5 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-2">
              Men's Collection
            </h2>
            <Link to="/collections?gender=Men" className="btn btn-sm btn-info">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
