"use client";

import {
  Divider,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { formatDate } from "date-fns";

import AddCoupon from "./_components/add-coupon";
import EditCoupon from "./_components/edit-coupon";
import DeleteCoupon from "./_components/delete-coupon";

import { GET_ALL_COUPONS } from "@/src/api-endpoints/coupon.api";
import AppLoading from "@/src/components/ui/loading-contents/app-loading";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { Coupon } from "@/src/types";

const columns = [
  {
    key: "code",
    label: "Code",
  },
  {
    key: "discount",
    label: "Discount (%)",
  },
  {
    key: "createdAt",
    label: "Created At",
  },
  {
    key: "edit",
    label: "Edit",
  },
  {
    key: "delete",
    label: "Delete",
  },
];

const ManageCoupons = () => {
  const { data: categories = [], isLoading } = useFetchData(
    GET_ALL_COUPONS
  ) as {
    data: Coupon[];
    isLoading: boolean;
  };

  return (
    <div className="my-1 space-y-4">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Manage Coupons</p>
        <AddCoupon />
      </div>
      <Divider className="my-4" />
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={categories}
          emptyContent={"No rows to display."}
          isLoading={isLoading}
          loadingContent={<AppLoading />}
        >
          {(item: Coupon) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "edit" ? (
                    <EditCoupon coupon={item} />
                  ) : columnKey === "delete" ? (
                    <DeleteCoupon couponId={item.id} />
                  ) : columnKey === "createdAt" ? (
                    formatDate(item.createdAt, "dd MMM, yyyy - hh:mm a")
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageCoupons;
