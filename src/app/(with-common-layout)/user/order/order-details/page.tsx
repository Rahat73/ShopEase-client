"use client";

import { Divider, Card, CardBody, Image, Chip } from "@nextui-org/react";
import { FaBagShopping, FaPhone, FaTruck, FaUser } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import Link from "next/link";

import AddReview from "./_components/add-review";

import { GET_ORDERS } from "@/src/api-endpoints/order.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { OrderItem } from "@/src/types";
import { noImg } from "@/src/constants";
import OrderInfoSkeleton from "@/src/components/ui/loading-contents/order-info-skeleton";
import OrderItemSkeleton from "@/src/components/ui/loading-contents/order-item-skeleton";

const statusColor = {
  COMPLETED: "success",
  PENDING: "warning",
  CANCELLED: "danger",
};

const OrderDetails = ({
  searchParams,
}: {
  searchParams: { orderId: string };
}) => {
  const { orderId } = searchParams;
  const { data: order = {}, isLoading: isOrderLoading } = useFetchData(
    GET_ORDERS + "/" + orderId,
    undefined,
    () => !!orderId
  );

  return (
    <div className="py-5 mx-12">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Order History</p>
      </div>
      <Divider className="my-4" />
      {isOrderLoading ? (
        <OrderInfoSkeleton />
      ) : (
        <Card className="mb-8 shadow-lg">
          <CardBody className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaBagShopping className="mr-2" /> Order Information
                </h2>
                <p className="mb-2">
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p className="mb-2">
                  <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
                </p>
                <p className="mb-2">
                  <strong>Discount:</strong> {order.discount}%
                </p>
                <p className="mb-2">
                  <strong>Status:</strong>{" "}
                  <Chip
                    color={
                      statusColor[order.status as keyof typeof statusColor] as
                        | "warning"
                        | "success"
                        | "danger"
                    }
                    variant="flat"
                    className="ml-2"
                  >
                    {order.status}
                  </Chip>
                </p>
                <p className="mb-2">
                  <strong>Transaction ID:</strong> {order.trxId || "N/A"}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaUser className="mr-2" /> Vendor Details
                </h2>
                <p className="mb-2 underline">
                  <Link href={"/shop/" + order.vendor.id}>
                    {order.vendor.shopName}
                  </Link>
                </p>
                <p className="mb-2 flex items-center">
                  <FaMapPin size={18} className="mr-2" /> {order.vendor.address}
                </p>
                <p className="mb-2 flex items-center">
                  <FaPhone size={18} className="mr-2" /> {order.vendor.phone}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <FaTruck className="mr-2" /> Order Items
      </h2>
      {isOrderLoading ? (
        <OrderItemSkeleton />
      ) : (
        <>
          {order.orderItems.map((item: OrderItem, index: number) => (
            <Card key={item.productId} className="mb-6 shadow-md">
              <CardBody className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="col-span-1 flex space-x-4">
                    <Image
                      src={item.product.images[0] || noImg}
                      alt={item.product.name}
                      width={100}
                      height={100}
                      className="rounded-lg mr-6 mb-4 md:mb-0 object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {item.product.description}
                      </p>
                      <p className="mb-1">
                        <strong>Price:</strong> ${item.price.toFixed(2)}
                      </p>
                      <p className="mb-4">
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                    </div>
                  </div>
                  <AddReview
                    orderId={item.orderId}
                    productId={item.productId}
                    review={order.review[index]}
                  />
                </div>
              </CardBody>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default OrderDetails;
