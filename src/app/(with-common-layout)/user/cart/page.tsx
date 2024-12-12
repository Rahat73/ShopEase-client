"use client";

import { Divider, Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";

import CartItem from "./_components/cart-item";

import { GET_CART } from "@/src/api-endpoints/cart.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { Cart, Product } from "@/src/types";
import { Coupons } from "@/src/constants";

// type TCartItem = {
//   quantity: number;
//   price: number;
//   productId: string;
// };

const CartPage = () => {
  // const [selectedCartItems, setSelectedCartItems] = useState<TCartItem[]>([]);

  // const handleSelectedCartItems = (cartItem: TCartItem) => {

  //   selectedCartItems.find(item=> item.productId === cartItem.productId)

  //   if (selectedCartItems.includes(cartItem.productId)) {
  //     setSelectedCartItems(
  //       selectedCartItems.filter((id) => id !== cartItem.productId)
  //     );
  //   } else {
  //     setSelectedCartItems([...selectedCartItems, cartItems.productId]);
  //   }
  // };

  const [subtotal, setSubtotal] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState("");

  const { data } = useFetchData(GET_CART);

  const calculateSubtotal = (cartData: Cart): number => {
    if (!cartData || !cartData.cartItems) {
      return 0;
    }

    return cartData.cartItems.reduce((subtotal, item) => {
      const productPrice = item.product.price;
      const discount = item.product.discount;
      const finalPrice = productPrice - (productPrice * discount) / 100;

      return subtotal + finalPrice * item.quantity;
    }, 0);
  };

  useEffect(() => {
    if (data) {
      setSubtotal(calculateSubtotal(data));
    }
  }, [data]);

  const discount = () => {
    return Coupons.find((coupon) => coupon.key === selectedCoupon)?.value || 0;
  };

  return (
    <div className="py-5">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>My Cart</p>
      </div>
      <Divider className="my-4" />
      <div className="grid grid-cols-5 lg:grid-cols-11 gap-10">
        <div className="space-y-3 col-span-5">
          {data?.cartItems.map(
            ({ quantity, product }: { quantity: number; product: Product }) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantity}
                // handleSelectedCartItems={handleSelectedCartItems}
              />
            )
          )}
        </div>
        <div className="col-span-1 flex justify-center ">
          <Divider orientation="vertical" />
        </div>
        <div className="col-span-5">
          <p className="text-xl font-bold text-center mb-4">Order Summary</p>
          <div className="flex flex-col item-denter space-y-3">
            <div className="w-3/4 mx-auto flex justify-between my-4">
              <p className="text-lg">
                Subtotal: ({data?.cartItems.length} items)
              </p>
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

export default CartPage;
