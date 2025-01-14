"use client";

import { Divider } from "@nextui-org/react";

import ShopInfoCard, { ShopInfo } from "./_component/shop-info-card";

import { useFetchData } from "@/src/hooks/fetch.hook";
import { GET_VENDORS_DETAILED_INFO } from "@/src/api-endpoints/user.api";
import ShopInfoCardSkeleton from "@/src/components/ui/loading-contents/shop-info-card-skeleton";

const ShopsPage = () => {
  const { data = [], isLoading } = useFetchData(GET_VENDORS_DETAILED_INFO);

  return (
    <div className="py-5 px-12 bg-default-50">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Shops</p>
      </div>
      <Divider className="my-4" />
      <div className="space-y-4">
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <ShopInfoCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {data.map((shop: ShopInfo) => (
              <ShopInfoCard key={shop.id} shop={shop} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ShopsPage;
