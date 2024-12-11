"use client";

import { Divider } from "@nextui-org/react";

import { GET_RECENT_PRODUCTS } from "@/src/api-endpoints/recent-product.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import ProductCard from "@/src/components/ui/product-card";
import { Product } from "@/src/types";

const RecentlyViewedPage = () => {
  const { data = [] } = useFetchData(GET_RECENT_PRODUCTS);

  return (
    <div className="py-5">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Recently Viewed Products</p>
      </div>
      <Divider className="my-4" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.map(({ product }: { product: Product }) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedPage;
