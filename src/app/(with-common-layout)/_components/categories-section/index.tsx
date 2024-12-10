"use client";

import { Card, CardFooter, Divider, Image } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";

import { useFetchData } from "@/src/hooks/fetch.hook";
import { GET_ALL_CATEGORIES } from "@/src/api-endpoints/category.api";
import { Category } from "@/src/types";

const CategoriesSection = () => {
  const { data = [] } = useFetchData(GET_ALL_CATEGORIES);

  const router = useRouter();

  return (
    <div className="p-5 bg-default-100 rounded-lg shadow-lg">
      <p className="text-2xl font-bold ">Categories</p>
      <Divider className="my-4" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data.map((item: Category) => (
          <Card
            key={item.id}
            isFooterBlurred
            isPressable
            className="h-48"
            onPress={() => {
              router.push(
                `/products?categoryId=${item.id}&categoryName=${item.name}`
              );
            }}
          >
            <Image
              removeWrapper
              alt="Electronics icon"
              className="z-0 w-full h-full -translate-y-6 object-cover"
              src={item.icon}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between pt-0">
              <div>
                <p className="text-black font-medium text-lg text-left">
                  {item.name}
                </p>
                <p className="text-black text-left text-tiny">
                  {item.description}
                </p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
