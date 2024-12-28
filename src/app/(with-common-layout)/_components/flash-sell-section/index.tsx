"use client";

import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { useFetchData } from "@/src/hooks/fetch.hook";
import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import { Product } from "@/src/types";
import ProductCard from "@/src/components/ui/product-card";
import ProductCardSkeleton from "@/src/components/ui/loading-contents/product-card-skeleton";
import CountdownTimer from "@/src/components/ui/count-down-timer";

const FlashSellSection = () => {
  const { data = [], isLoading } = useFetchData(GET_ALL_PRODUCTS, {
    limit: 6,
    sortBy: "discount",
    sortOrder: "desc",
  });

  const router = useRouter();

  return (
    <div
      className="p-5 bg-default-100 rounded-lg shadow-lg grid grid-cols-12 dark:bg-blend-overlay bg-[15%_center] md:bg-[0%_center]"
      style={{
        backgroundImage: "url('/images/flash-sell-banner.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div className="hidden lg:col-span-5 lg:flex flex-col items-center justify-center">
        <div className="w-11/12 mx-auto">
          <div className="flex items-center justify-between backdrop-blur-xl p-5 rounded-lg">
            <p className="text-2xl font-bold animate-pulse">
              Hurry Up! <br /> Flash Sell⚡
            </p>

            <Button
              className="text-tiny text-white bg-black/20"
              color="default"
              radius="lg"
              size="sm"
              variant="shadow"
              onPress={() => router.push("/flash-sell")}
            >
              View All Products
            </Button>
          </div>
          <Divider className="my-4" />
        </div>
        <CountdownTimer endDate={"2024-12-31T23:59:59"} />
      </div>
      <div className="col-span-12 md:col-span-12 lg:col-span-7">
        <div className=" lg:hidden flex items-center justify-between backdrop-blur-xl p-1 rounded-lg">
          <p className="text-2xl font-bold animate-pulse">
            Hurry Up! Flash Sell⚡
          </p>

          <Button
            className="text-tiny text-white bg-black/20"
            color="default"
            radius="lg"
            size="sm"
            variant="shadow"
            onPress={() => router.push("/flash-sell")}
          >
            View All Products
          </Button>
        </div>
        <Divider className="my-4 lg:hidden" />
        <div className="my-4 lg:hidden">
          <CountdownTimer endDate={"2024-12-31T23:59:59"} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
          {isLoading ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
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
    </div>
  );
};

export default FlashSellSection;
