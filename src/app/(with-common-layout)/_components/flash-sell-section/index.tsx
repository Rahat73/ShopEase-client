"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";

import { useFetchData } from "@/src/hooks/fetch.hook";
import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import { noImg } from "@/src/constants";
import { Product } from "@/src/types";

const list = [
  {
    title: "Orange",
    img: "/images/fruit-1.jpeg",
    price: "$5.50",
  },
  {
    title: "Tangerine",
    img: "/images/fruit-2.jpeg",
    price: "$3.00",
  },
  {
    title: "Raspberry",
    img: "/images/fruit-3.jpeg",
    price: "$10.00",
  },
  {
    title: "Lemon",
    img: "/images/fruit-4.jpeg",
    price: "$5.30",
  },
  {
    title: "Avocado",
    img: "/images/fruit-5.jpeg",
    price: "$15.70",
  },
  {
    title: "Lemon 2",
    img: "/images/fruit-6.jpeg",
    price: "$8.00",
  },
  {
    title: "Banana",
    img: "/images/fruit-7.jpeg",
    price: "$7.50",
  },
  {
    title: "Watermelon",
    img: "/images/fruit-8.jpeg",
    price: "$12.20",
  },
];

const FlashSellSection = () => {
  const { data = [] } = useFetchData(GET_ALL_PRODUCTS);

  console.log(data);

  return (
    <div className="p-5 bg-default-100 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Flash Sell</p>
        <Button
          className="text-tiny text-white bg-black/20"
          color="default"
          radius="lg"
          size="sm"
          variant="shadow"
        >
          View All Products
        </Button>
      </div>
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
              <div className="font-bold text-default-600">
                ${(item.price - item.price * (item.discount / 100)).toFixed(2)}
              </div>
              <div className="text-default-400 space-x-2">
                <span className="line-through">${item.price.toFixed(2)}</span>
                <span className="text-green-700">{item.discount}%</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlashSellSection;
