import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

import bags from "@/src/assets/images/bags.png";

const Secondbanner = () => {
  return (
    <div className="relative bg-gradient-to-r overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="text-center md:text-right order-2 md:order-1"
          >
            {/* <div className="flex items-center justify-center md:justify-end gap-2 mb-4">
              <FaStore className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">
                Featured Shops
              </span>
            </div> */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              Discover Shops with Amazing Deals
            </h1>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-end gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold">1</span>
                </div>
                <p className="text-default-600 text-lg">
                  Same-day delivery available
                </p>
              </div>
              <div className="flex items-center justify-end gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold">2</span>
                </div>
                <p className="text-default-600 text-lg">
                  Quality verified shops
                </p>
              </div>
              <div className="flex items-center justify-end gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold">3</span>
                </div>
                <p className="text-default-600 text-lg">
                  Exclusive in-store offers
                </p>
              </div>
            </div>

            <Link href="/shop">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90 transition-opacity group"
              >
                View All Shops
                <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="relative z-10 order-1 md:order-2 flex justify-center"
          >
            <Image
              src={bags}
              alt="Shopping bangs in hand"
              width={400}
              height={400}
            />
          </motion.div>
        </div>
      </div>
      {/* <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-teal-200 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-emerald-100 rounded-full opacity-10" />
      </div> */}
    </div>
  );
};

export default Secondbanner;
