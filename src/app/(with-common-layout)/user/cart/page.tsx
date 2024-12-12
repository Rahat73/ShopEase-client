"use client";

import { Divider, Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import CartItem from "./_components/cart-item";

import { GET_CART } from "@/src/api-endpoints/cart.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { Cart, Product } from "@/src/types";
import { Coupons } from "@/src/constants";
import { usePostData } from "@/src/hooks/mutation.hook";
import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import { CREATE_ORDER, GET_MY_ORDERS } from "@/src/api-endpoints/order.api";
import AppForm from "@/src/components/form/app-form";
import AppInput from "@/src/components/form/app-input";
import { createOrderValidationSchema } from "@/src/schemas/order.schema";

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

  const router = useRouter();

  const { data } = useFetchData(GET_CART) as { data: Cart };

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

  const { mutateAsync: createOrder } = usePostData({
    invalidateQueries: [GET_ALL_PRODUCTS, GET_MY_ORDERS],
    doNotShowNotification: true,
  });

  const orderItems = data?.cartItems.map(
    ({ quantity, product }: { quantity: number; product: Product }) => ({
      productId: product.id,
      quantity: quantity,
    })
  );

  const handleProceedToCheckout: SubmitHandler<FieldValues> = async (data) => {
    const res = await createOrder({
      url: CREATE_ORDER,
      postData: {
        ...data,
        discount: discount(),
        orderItems,
      },
    });

    if (res.success) {
      router.push("/user/payment?orderId=" + res.data.id);
    }
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
          <div className="max-w-md mx-auto flex flex-col item-denter space-y-3">
            <AppForm
              resolver={zodResolver(createOrderValidationSchema)}
              onSubmit={handleProceedToCheckout}
            >
              <div className="my-2 max-w-sm mx-auto">
                <AppInput name="phone" label="Phone" type="number" />
              </div>
              <div className="my-2 max-w-sm mx-auto">
                <AppInput name="address" label="Address" type="text" />
              </div>
              <div className="my-2 max-w-sm mx-auto">
                <Select
                  className=""
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
              </div>

              <div className="w-3/4 mx-auto flex justify-between mt-4">
                <p className="text-lg">
                  Subtotal: ({data?.cartItems.length} items)
                </p>
                <p className="text-lg">${subtotal.toFixed(2)} </p>
              </div>
              <div className="w-3/4 mx-auto flex justify-between">
                <p className="text-lg">Total: </p>
                <p className="text-lg">
                  ${(subtotal - (subtotal * discount()) / 100).toFixed(2)}{" "}
                </p>
              </div>
              <div className=" flex justify-center my-3">
                <Button color="success" className="" type="submit">
                  Proceed to Payment
                </Button>
              </div>
            </AppForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
