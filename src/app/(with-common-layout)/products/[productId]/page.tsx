"use client";

import { EmblaOptionsType } from "embla-carousel";
import { Avatar, Button, Card, CardBody, CardHeader } from "@nextui-org/react";

import { useFetchData } from "@/src/hooks/fetch.hook";
import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import Carousel from "@/src/components/carousel/carousel";

const ProductDetailsPage = ({ params }: { params: { productId: string } }) => {
  const { data } = useFetchData(
    `${GET_ALL_PRODUCTS}/${params.productId}`,
    undefined,
    () => !!params.productId
  );

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const {
    name,
    description,
    price,
    discount,
    inventoryCount,
    soldCount,
    images,
    vendor,
    category,
  } = data;

  const OPTIONS: EmblaOptionsType = {};
  const SLIDES = images;

  const discountedPrice = (price - (price * discount) / 100).toFixed(2);

  console.log(data);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-full flex justify-center items-center">
          <Carousel slides={SLIDES} options={OPTIONS} />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <p className="text-lg text-default-700 mb-2">{description}</p>

          {/* Pricing */}
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-2xl font-bold text-green-600">
              ${discountedPrice}
            </span>
            {discount > 0 && (
              <span className="text-lg line-through text-gray-500">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-default-600 mb-4 ">
            Discount:{" "}
            <span className="bg-red-600 rounded-full px-2 text-white">
              {discount}%
            </span>
          </p>

          <div className="flex items-center space-x-4 mb-4">
            <span className="text-default-600">In Stock: {inventoryCount}</span>
            <span className="text-default-600">Sold: {soldCount}</span>
          </div>

          <div className="mb-4">
            <p className="text-lg font-medium">Vendor: {vendor?.shopName}</p>
          </div>

          <div className="mb-4">
            <p className="text-default-600">Category: {category?.name}</p>
          </div>

          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
        <p className="text-default-600">
          This product is brought to you by our trusted vendor,{" "}
          <strong>{vendor?.shopName}</strong>, specializing in high-quality
          products,{" "}
          {discount > 10 && `with a attractive discount of ${discount}%`}.{" "}
          {inventoryCount < 100 &&
            `Only ${inventoryCount} left in stock! So Hurry Up!`}
        </p>
      </div>

      <Card className="max-w-md mx-auto mt-10 p-2">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src={vendor.shopLogo} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {vendor.shopName}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                Vendor
              </h5>
            </div>
          </div>
          <Button
            className="text-tiny"
            color="primary"
            radius="full"
            size="sm"
            variant="shadow"
          >
            Follow
          </Button>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-500">
          <p className="mb-2">Address: {vendor.address}</p>
          <p>Phone: {vendor.phone}</p>
        </CardBody>
        {/* <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-500 text-small">4.8</p>
            <p className=" text-default-500 text-small">Rating</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-500 text-small">24</p>
            <p className="text-default-500 text-small">Reviews</p>
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default ProductDetailsPage;
