import { Link } from "react-router-dom";
import HeroImage from "../../assets/hero.jpg";

const Hero = () => {
  return (
    <div
      className="hero h-[400px] sm:h-[500px] md:h-[600px] lg:min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Hero content */}
      <div className="hero-content z-10 text-neutral-content text-center">
        <div className="max-w-xl px-4">
          <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase drop-shadow-md">
            Adventure Awaits
          </h1>
          <p className="mb-6 text-base md:text-lg opacity-90 drop-shadow-sm">
            From sun-drenched coastlines to mountain peaks — gear up for your
            most unforgettable journey yet.
          </p>
          <Link to="/collections">
            <button className="btn btn-primary md:btn-lg  rounded-xl shadow-md hover:shadow-xl transition">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
