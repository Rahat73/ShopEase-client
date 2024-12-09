"use client";

import React from "react";
import { Card, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";

import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { Product } from "@/src/types";
import { noImg } from "@/src/constants";

const FlashSellPage = () => {
  const { data = [] } = useFetchData(GET_ALL_PRODUCTS, {
    sortBy: "discount",
    sortOrder: "desc",
  });

  return (
    <div className="p-5 bg-default-100 rounded-lg shadow-lg">
      <p className="text-center text-2xl font-bold ">Flash Sell Products</p>

      <Divider className="my-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {data.map((item: Product) => (
          <Card
            key={item.id}
            isPressable
            shadow="sm"
            className="group"
            onPress={() => console.log(item.images?.[0])}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                isBlurred
                alt={item.name}
                className="w-full object-cover h-[150px] group-hover:scale-110 transition-all duration-300"
                radius="lg"
                shadow="sm"
                src={item.images?.[0] || noImg}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small flex-col justify-start">
              <div>
                <b>{item.name}</b>
              </div>
              <div className="font-bold text-green-700 text-lg">
                ${(item.price - item.price * (item.discount / 100)).toFixed(2)}
              </div>
              <div className="text-default-400 space-x-2">
                <span className="line-through">${item.price.toFixed(2)}</span>
                <span className="bg-red-600 px-1 text-white rounded">
                  {item.discount}%
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlashSellPage;
