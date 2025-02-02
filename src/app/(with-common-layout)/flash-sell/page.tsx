"use client";

import React from "react";
import { Divider } from "@nextui-org/react";

import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { Product } from "@/src/types";
import ProductCard from "@/src/components/ui/product-card";
import ProductCardSkeleton from "@/src/components/ui/loading-contents/product-card-skeleton";

const FlashSellPage = () => {
  const { data = [], isLoading } = useFetchData(GET_ALL_PRODUCTS, {
    sortBy: "discount",
    sortOrder: "desc",
    limit: 10,
  });

  return (
    <div className="p-5 px-12 bg-default-50 min-h-[85vh]">
      <p className="text-center text-2xl font-bold ">Flash Sell Products</p>

      <Divider className="my-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {data.map((item: Product) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FlashSellPage;
