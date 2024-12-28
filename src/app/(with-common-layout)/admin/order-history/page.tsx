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
import { useState, useEffect, Key } from "react";

import { GET_ORDERS } from "@/src/api-endpoints/order.api";
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
  { name: "AMOUNT", uid: "amountAndDiscount" },
  { name: "STATUS", uid: "status" },
  { name: "CUSTOMER INFO", uid: "customerInfo" },
  { name: "VENDOR INFO", uid: "vendorInfo" },
  { name: "DATE", uid: "createdAt" },
];

const renderCell = (order: Record<string, any>, columnKey: Key) => {
  switch (columnKey) {
    case "id":
      return (
        <Tooltip content={<span>{order.id}</span>}>
          <span className="text-bold text-small">
            {order.id.substring(0, 8)}...
          </span>
        </Tooltip>
      );
    case "amountAndDiscount":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">
            ${order.totalAmount.toFixed(2)}
          </p>
          <p className="text-small text-default-400">
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
          {order.status}
        </Chip>
      );
    case "customerInfo":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">{order.customer.name || "N/A"}</p>
          <p className="text-bold text-tiny text-default-400">
            {order.address || "N/A"}
          </p>
          <p className="text-tiny text-default-400">{order.phone || "N/A"}</p>
        </div>
      );
    case "vendorInfo":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">
            {order.vendor.shopName || "N/A"}
          </p>

          <p className="text-tiny text-default-400">
            {order.vendor.phone || "N/A"}
          </p>
        </div>
      );
    case "createdAt":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">
            {format(new Date(order.createdAt), "MMM dd, yyyy")}
          </p>
          <p className="text-bold text-tiny text-default-400">
            {format(new Date(order.createdAt), "HH:mm:ss")}
          </p>
        </div>
      );
    default:
      return order[columnKey as keyof Order];
  }
};

const AdminOrderHistory = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const {
    data: ordersData = [],
    meta,
    isFetching,
  } = useFetchData(GET_ORDERS, { page, limit });

  useEffect(() => {
    if (meta?.total) {
      setTotalPages(Math.ceil(meta.total / limit));
    }
  }, [meta]);

  return (
    <div className="my-1">
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
              hidden={ordersData.length === 0}
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

export default AdminOrderHistory;
