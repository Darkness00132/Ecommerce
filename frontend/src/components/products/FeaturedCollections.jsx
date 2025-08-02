import { Link } from "react-router-dom";

const FeaturedCollections = () => {
  return (
    <section className="py-16 px-4 mx-4 md:mx-10 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center rounded-3xl bg-cyan-100  transition-colors duration-300">
        {/* Text Section */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">
            Effortless Comfort & Timeless Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-black">
            Clothing Designed to Elevate Your Everyday
          </h2>
          <p className="text-lg text-gray-500 mb-6">
            Discover a collection where comfort meets confidence. Our apparel is
            crafted using premium fabrics, tailored fits, and minimalist design
            — so you can look and feel your best whether you're at work, at
            home, or on the go. Explore everyday essentials made to last.
          </p>
          <Link to="/collections" className="btn btn-info">
            Shop Now
          </Link>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2">
          <div className="w-full overflow-hidden aspect-[4/3] sm:aspect-[5/4] lg:h-[500px]">
            <img
              src="https://res.cloudinary.com/dgzqfkqua/image/upload/f_auto,q_auto,w_1500/v1754111616/featured_mqm1l7.jpg"
              alt="Featured Collection"
              className="w-full h-full object-cover lg:rounded-r-3xl lg:rounded-br-3xl sm:rounded-t-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
