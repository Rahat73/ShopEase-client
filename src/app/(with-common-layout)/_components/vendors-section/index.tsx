"use client";

import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";

import { useFetchData } from "@/src/hooks/fetch.hook";
import { SHOPEASE_SUMMARY } from "@/src/api-endpoints/summary.api";

const VendorsSection = () => {
  const router = useRouter();

  const { data: summary, isFetching: isFetchingSummary } =
    useFetchData(SHOPEASE_SUMMARY);

  const stats = [
    { value: summary?.totalShops || 0, label: "Active Shops" },
    { value: summary?.totalProducts || 0, label: "Products" },
    { value: summary?.totalCustomers || 0, label: "Happy Customers" },
    { value: summary?.totalOrders || 0, label: "Orders" },
  ];

  return (
    <section className="py-16 px-4 md:px-6 rounded-lg bg-default-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Discover Amazing Shops
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-default-600 text-lg max-w-2xl mx-auto"
          >
            We have curated a collection of premium shops that will meet all
            your needs. From fashion to electronics, find everything under one
            roof.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-default-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <Button
            size="lg"
            className="group bg-default-900 text-default-50"
            onPress={() => router.push("/shops")}
          >
            Explore All Shops
            <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default VendorsSection;
