"use client";

import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { GiTakeMyMoney } from "react-icons/gi";
import { useRouter } from "next/navigation";

import { GET_MY_ORDERS } from "@/src/api-endpoints/order.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import aamarpay from "@/src/assets/images/aamarpay.jpg";
import { usePostData } from "@/src/hooks/mutation.hook";
import { SET_UP_PAYMENT } from "@/src/api-endpoints/payment.api";

const PaymentPage = ({
  searchParams,
}: {
  searchParams: { orderId: string };
}) => {
  const router = useRouter();
  const { orderId } = searchParams;

  const { data: orderData = [] } = useFetchData(
    GET_MY_ORDERS,
    { id: orderId },
    () => !!orderId
  );

  const { mutateAsync: setupPayment } = usePostData({
    invalidateQueries: [],
  });

  const handlePayment = async () => {
    const res = await setupPayment({
      url: SET_UP_PAYMENT,
      postData: {
        orderId,
      },
    });

    if (res?.success) {
      window.location.href = res.data.payment_url;
    }
  };

  return (
    <div className="py-5">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Payment</p>
      </div>
      <Divider className="my-4" />
      <div className="flex flex-col items-center py-5">
        <p className="text-xl font-bold text-center">
          Total Amount:{" "}
          <span className="text-green-600">
            {(orderData?.[0]?.totalAmount - orderData?.[0]?.discount).toFixed(
              2
            )}{" "}
            $
          </span>
        </p>
        <p className="text-lg font-bold my-5">Select a payment method:</p>
        <div className="flex gap-4 justify-center">
          <button
            className="size-28 rounded-md bg-default-500 text-white flex flex-col justify-center items-center"
            onClick={() => router.replace(`/user/order/order-history`)}
          >
            <GiTakeMyMoney className="size-14" />
            <p className="text-tiny text-center">Cash on Delivery</p>
          </button>
          <button
            className="size-28 rounded-md bg-default-500 text-white flex justify-center items-center"
            onClick={handlePayment}
          >
            <Image src={aamarpay} className="rounded-md" alt="aamarpay" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
