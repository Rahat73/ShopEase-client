"use client";

import { motion } from "framer-motion";
import { FaAward, FaClock, FaShield, FaStore } from "react-icons/fa6";

const features = [
  {
    icon: FaStore,
    title: "Verified Sellers",
    description:
      "All our shops are thoroughly vetted for quality and reliability",
  },
  {
    icon: FaShield,
    title: "Secure Shopping",
    description: "Shop with confidence with our buyer protection program",
  },
  {
    icon: FaClock,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your shopping needs",
  },
  {
    icon: FaAward,
    title: "Quality Products",
    description:
      "Curated selection of high-quality products from trusted shops",
  },
];
const ServiceSection = () => {
  return (
    <div className="bg-default-100 my-4 p-8 rounded-lg">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Your trusted shopping companion
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-default-600 text-lg max-w-2xl mx-auto"
        >
          ShopEase is your reliable, one-stop destination for all your shopping
          needs.
        </motion.p>
      </div>
      <div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-default-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <feature.icon className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-default-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
