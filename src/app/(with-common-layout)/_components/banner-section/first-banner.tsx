"use client";

import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

import cart from "@/src/assets/images/cart-boxes.png";

const FirstBanner = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="relative z-10 flex justify-center"
          >
            <Image src={cart} alt="Cart Items" width={400} height={400} />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="text-center md:text-left"
          >
            {/* <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
              Special Offer
            </span> */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Shop Smarter, Not Harder
            </h1>
            <p className="text-default-600 text-lg mb-8 max-w-xl">
              ShopEase is your ultimate online shopping destination, offering a
              seamless experience with a wide range of products, exclusive deals
              and Discover amazing deals on thousands of products.
            </p>
            <div className="space-x-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transition-opacity"
                >
                  Shop Now
                  <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FirstBanner;
