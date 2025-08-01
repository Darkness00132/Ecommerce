import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance/axiosInstance";

const NewArrivals = () => {
  const { data: newArrivals, isLoading } = useQuery({
    queryKey: ["products", "new Arrivals"],
    queryFn: async () => {
      const response = await axiosInstance.get("/products/?limit=8");
      return response.data.products;
    },
    onError: (error) => {
      console.log("new arrivals error: ", error);
    },
  });

  if (isLoading) return <p>Loading</p>;

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Discover the latest trends, fresh styles, and must-have pieces
          handpicked just for you.
        </p>
      </div>

      <Marquee speed={40} pauseOnHover gradient={false} className="gap-6">
        {newArrivals.map((product) => (
          <Link to={`/product/${product._id}`} className="block">
            <div
              key={product._id}
              className="min-w-[70%] sm:min-w-[50%] lg:min-w-[30%] mx-3 relative"
            >
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
                className="w-full h-[400px]  md:h-[500px] object-cover rounded-lg"
                draggable={false}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-md text-white p-4 rounded-b-lg">
                <h4 className="font-medium">{product.name}</h4>
                {product.discountPrice &&
                product.discountPrice < product.price ? (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="line-through text-sm text-gray-300">
                      ${product.price}
                    </span>
                    <span className="text-lg font-semibold ">
                      ${product.discountPrice}
                    </span>
                  </div>
                ) : (
                  <p className="mt-1 text-white">${product.price}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </Marquee>
    </section>
  );
};

export default NewArrivals;
