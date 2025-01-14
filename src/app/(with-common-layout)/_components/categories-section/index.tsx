"use client";

import { Card, CardFooter, Divider, Image } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";

import { useFetchData } from "@/src/hooks/fetch.hook";
import { GET_ALL_CATEGORIES } from "@/src/api-endpoints/category.api";
import { Category } from "@/src/types";
import CategoryCardSkeleton from "@/src/components/ui/loading-contents/category-card-skeleton";
import cart from "@/src/assets/images/cart-items.png";

const CategoriesSection = () => {
  const { data = [], isLoading } = useFetchData(GET_ALL_CATEGORIES);

  const router = useRouter();

  return (
    <div className="p-5 px-12 bg-default-100 min-h-[40vh]">
      <p className="text-2xl font-bold">Categories</p>
      <Divider className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <CategoryCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.map((item: Category) => (
                <Card
                  key={item.id}
                  isFooterBlurred
                  isPressable
                  className="h-52"
                  onPress={() => {
                    router.push(
                      `/products?categoryId=${item.id}&categoryName=${item.name}`
                    );
                  }}
                >
                  <div className="w-full h-32 object-cover">
                    <Image
                      removeWrapper
                      alt="Electronics icon"
                      className="z-0 w-full h-full object-cover"
                      src={item.icon}
                    />
                  </div>
                  <CardFooter className="bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between py-1">
                    <div>
                      <p className="font-medium text-lg text-left">
                        {item.name}
                      </p>
                      <p className="text-left text-tiny">{item.description}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
        <div className="col-span-1">
          <NextImage
            src={cart}
            alt="cart"
            width={300}
            height={300}
            className="mx-auto"
          />
          <p className="text-3xl mx-auto font-semibold text-end">
            Meet All your needs with our wide range of categories
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
