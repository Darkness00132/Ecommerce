import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-base-100">
      {/* Hero image */}
      <img
        src="https://res.cloudinary.com/dgzqfkqua/image/upload/f_auto,q_auto,w_auto,dpr_auto/hero_mowl1k.jpg"
        alt="Adventure background"
        fetchpriority="high"
        className="w-full h-[500px] md:h-[700px] object-cover"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-6">
        <div className="text-center text-base-200 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5 tracking-wide opacity-70 uppercase">
            Adventure Awaits
          </h1>
          <p className="text-base-100 sm:text-lg md:text-xl mb-10 max-w-xl mx-auto opacity-60">
            Discover premium gear for your next journey — from coastal escapes
            to mountain hikes.
          </p>
          <Link to="/collections">
            <button className="btn btn-primary btn-lg rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
