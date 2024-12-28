"use client";

import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";

import { useFetchData } from "@/src/hooks/fetch.hook";
import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import { Product } from "@/src/types";
import ProductCard from "@/src/components/ui/product-card";
import ProductCardSkeleton from "@/src/components/ui/loading-contents/product-card-skeleton";

const FlashSellSection = () => {
  const { data = [], isFetching } = useFetchData(GET_ALL_PRODUCTS, {
    limit: 5,
    sortBy: "discount",
    sortOrder: "desc",
  });

  return (
    <div className="p-5 bg-default-100 rounded-lg shadow-lg min-h-[50vh]">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold animate-pulse">Hurry Up! Flash Sell</p>
        <Link href="/flash-sell">
          <Button
            className="text-tiny text-white bg-black/20"
            color="default"
            radius="lg"
            size="sm"
            variant="shadow"
          >
            View All Products
          </Button>
        </Link>
      </div>
      <Divider className="my-4" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {isFetching ? (
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

export default FlashSellSection;
