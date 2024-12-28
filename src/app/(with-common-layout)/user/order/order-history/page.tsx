"use client";

import {
  Chip,
  Divider,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { format } from "date-fns";
import { Key, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { MdOutlinePayments, MdRateReview } from "react-icons/md";
import Link from "next/link";

import { GET_MY_ORDERS } from "@/src/api-endpoints/order.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { Order } from "@/src/types";
import AppLoading from "@/src/components/ui/loading-contents/app-loading";

const statusColorMap = {
  PENDING: "warning",
  COMPLETED: "success",
  CANCELLED: "danger",
};

const columns = [
  { name: "ORDER ID", uid: "id" },
  { name: "TOTAL AMOUNT", uid: "totalAmount" },
  { name: "STATUS", uid: "status" },
  { name: "contactInfo", uid: "contactInfo" },
  { name: "DATE", uid: "createdAt" },
  { name: "REVIEW", uid: "review" },
  { name: "PAYMENT", uid: "payment" },
];

const renderCell = (order: Record<string, any>, columnKey: Key) => {
  const cellValue = order[columnKey as keyof Order];

  switch (columnKey) {
    case "id":
      return (
        <Tooltip content={<span>{cellValue}</span>}>
          <span className="text-bold text-small">
            {cellValue.substring(0, 8)}...
          </span>
        </Tooltip>
      );
    case "totalAmount":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">${cellValue.toFixed(2)}</p>
          <p className="text-default-400 text-tiny">
            Discount: {order.discount}%
          </p>
        </div>
      );
    case "status":
      return (
        <Chip
          className="capitalize"
          color={
            statusColorMap[order.status as keyof typeof statusColorMap] as
              | "warning"
              | "success"
              | "danger"
          }
          size="sm"
          variant="flat"
        >
          {cellValue}
        </Chip>
      );
    case "contactInfo":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">{order.address || "N/A"}</p>
          <p className="text-tiny text-default-400">{order.phone || "N/A"}</p>
        </div>
      );
    case "createdAt":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">
            {format(new Date(cellValue), "MMM dd, yyyy")}
          </p>
          <p className="text-bold text-tiny text-default-400">
            {format(new Date(cellValue), "HH:mm:ss")}
          </p>
        </div>
      );
    case "review":
      return (
        <>
          {order.status === "COMPLETED" && (
            <Tooltip content={<span>Write a review</span>}>
              <Link href={`/user/order/order-details?orderId=${order.id}`}>
                <Button isIconOnly size="sm" variant="light" color="primary">
                  <MdRateReview className="text-xl" />
                </Button>
              </Link>
            </Tooltip>
          )}
        </>
      );
    case "payment":
      return (
        <>
          {order.status === "PENDING" && (
            <Tooltip content={<span>Complete payment</span>}>
              <Link href={"/user/payment?orderId=" + order.id}>
                <Button isIconOnly size="sm" variant="light" color="primary">
                  <MdOutlinePayments className="text-xl" />
                </Button>
              </Link>
            </Tooltip>
          )}
        </>
      );
    default:
      return cellValue;
  }
};

const OrderHistoryPage = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const {
    data: ordersData = [],
    meta,
    isFetching,
  } = useFetchData(GET_MY_ORDERS, { page, limit });

  useEffect(() => {
    if (meta?.total) {
      setTotalPages(Math.ceil(meta.total / limit));
    }
  }, [meta]);

  return (
    <div className="py-5">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Order History</p>
      </div>
      <Divider className="my-4" />
      <Table
        aria-label="order list table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              hidden={!ordersData.length}
              color="secondary"
              page={page}
              total={totalPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          isLoading={isFetching}
          loadingContent={<AppLoading />}
          emptyContent={"No rows to display."}
        >
          {ordersData.map((order: Order) => (
            <TableRow key={order.id}>
              {(columnKey) => (
                <TableCell>{renderCell(order, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderHistoryPage;
