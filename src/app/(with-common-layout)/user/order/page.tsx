"use client";

import {
  Button,
  Card,
  CardBody,
  Divider,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link } from "@nextui-org/link";
import { FaMinus, FaPlus } from "react-icons/fa";

import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { Coupons, noImg } from "@/src/constants";

const OrderPage = ({
  searchParams,
}: {
  searchParams: { productId: string; quantity: number };
}) => {
  const [subtotal, setSubtotal] = useState(0);
  const [newQuantity, setNewQuantity] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState("");

  const { productId, quantity } = searchParams;

  const { data, isLoading } = useFetchData(
    `${GET_ALL_PRODUCTS}/${productId}`,
    undefined,
    () => !!productId
  );

  useEffect(() => {
    if (data) {
      const actualPrice = data.price - (data.price * data.discount) / 100;

      setSubtotal(actualPrice * (newQuantity + Number(quantity)));
    }
  }, [data, newQuantity]);

  const discount = () => {
    return Coupons.find((coupon) => coupon.key === selectedCoupon)?.value || 0;
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="py-5">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Order</p>
      </div>
      <Divider className="my-4" />
      <div className="grid grid-cols-5 lg:grid-cols-11 gap-10">
        <div className="space-y-3 col-span-5">
          <Card className="w-full max-w-lg mx-auto" radius="sm">
            <CardBody className="flex flex-row items-center p-4">
              <Image
                alt={data.name}
                className="object-cover rounded-lg"
                src={data.images[0] || noImg}
                width={100}
                height={100}
              />
              <div className="ml-4 flex-grow">
                <Link
                  href={`/products/${productId}`}
                  className="text-default-900"
                >
                  <h3 className="text-lg font-semibold">{data.name}</h3>
                </Link>
                <div className="flex items-center mt-1">
                  <span className="text-xl font-bold text-green-600">
                    $
                    {(data.price - (data.price * data.discount) / 100).toFixed(
                      2
                    )}
                  </span>
                  {data.discount > 0 && (
                    <span className="ml-2 text-sm line-through text-gray-500">
                      ${data.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    isDisabled={Number(quantity) + newQuantity === 1}
                    onPress={() => setNewQuantity((prev) => prev - 1)}
                  >
                    <FaMinus size={16} />
                  </Button>
                  <span className="w-8 text-center">
                    {Number(quantity) + newQuantity}
                  </span>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    isDisabled={quantity === data.inventoryCount}
                    onPress={() => setNewQuantity((prev) => prev + 1)}
                  >
                    <FaPlus size={16} />
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-span-1 flex justify-center ">
          <Divider orientation="vertical" />
        </div>
        <div className="col-span-5">
          <p className="text-xl font-bold text-center mb-4">Order Summary</p>
          <div className="flex flex-col item-denter space-y-3">
            <div className="w-3/4 mx-auto flex justify-between my-4">
              <p className="text-lg">Subtotal:</p>
              <p className="text-lg">${subtotal.toFixed(2)} </p>
            </div>
            <Select
              className="max-w-sm mx-auto"
              label="Select a coupon"
              onChange={(e) => setSelectedCoupon(e.target.value)}
            >
              {Coupons.map((coupon) => (
                <SelectItem key={coupon.key} textValue={coupon.label}>
                  {coupon.label}{" "}
                  <span className="ml-5 text-tiny">
                    Enjoy-${coupon.value}% off
                  </span>
                </SelectItem>
              ))}
            </Select>
            <div className="w-3/4 mx-auto flex justify-between py-4">
              <p className="text-lg">Total: </p>
              <p className="text-lg">
                ${(subtotal - (subtotal * discount()) / 100).toFixed(2)}{" "}
              </p>
            </div>
            <Button color="success" className="max-w-lg mx-auto">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
