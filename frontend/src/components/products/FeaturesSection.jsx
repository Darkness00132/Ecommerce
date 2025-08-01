import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const features = [
  {
    icon: <HiShoppingBag size={32} />,
    title: "Free International Shipping",
    description: "On all orders over $100.00",
  },
  {
    icon: <HiArrowPathRoundedSquare size={32} />,
    title: "15 Days Return",
    description: "Money back guarantee",
  },
  {
    icon: <HiOutlineCreditCard size={32} />,
    title: "Secure Checkout",
    description: "100% secured checkout process",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-center cursor-default rounded-xl transition-all duration-300 hover:scale-105 hover:bg-base-200 p-6"
          >
            <div className="flex justify-center mb-4 text-primary">
              <div className="p-4 bg-base-100 rounded-full shadow-md">
                {feature.icon}
              </div>
            </div>
            <h4 className="uppercase font-semibold text-lg text-neutral mb-2">
              {feature.title}
            </h4>
            <p className="text-sm text-neutral-content">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
