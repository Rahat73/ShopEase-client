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

import { GET_MY_ORDERS } from "@/src/api-endpoints/order.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { Order } from "@/src/types";

const statusColorMap = {
  PENDING: "warning",
  COMPLETED: "success",
  CANCELLED: "danger",
};

const columns = [
  { name: "ORDER ID", uid: "id" },
  { name: "TOTAL AMOUNT", uid: "totalAmount" },
  { name: "DISCOUNT", uid: "discount" },
  { name: "STATUS", uid: "status" },
  { name: "ADDRESS", uid: "address" },
  { name: "PHONE", uid: "phone" },
  { name: "DATE", uid: "createdAt" },
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
        </div>
      );
    case "discount":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">{cellValue.toFixed(2)}%</p>
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
    case "address":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">{cellValue || "N/A"}</p>
        </div>
      );
    case "phone":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">{cellValue || "N/A"}</p>
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
    isLoading,
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
        <TableBody>
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
