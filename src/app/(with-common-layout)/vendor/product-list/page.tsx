"use client";

import {
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Tooltip,
  Image,
} from "@nextui-org/react";
import { Key, useEffect, useState } from "react";

import EditProduct from "./_components/edit-product";
import DeleteProduct from "./_components/delete-product";
import DuplicateProduct from "./_components/duplicate-product";

import { GET_MY_PRODUCTS } from "@/src/api-endpoints/product.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { noImg } from "@/src/constants";
import { Product } from "@/src/types";
import AppLoading from "@/src/components/ui/loading-contents/app-loading";

const columns = [
  { name: "IMAGE", uid: "image" },
  { name: "NAME", uid: "name" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "PRICE", uid: "price" },
  { name: "INVENTORY", uid: "inventoryCount" },
  { name: "SOLD", uid: "soldCount" },
  { name: "CATEGORY", uid: "category" },
  { name: "ACTIONS", uid: "actions" },
];

const renderCell = (product: Record<string, any>, columnKey: Key) => {
  const cellValue = product[columnKey as keyof Product];

  switch (columnKey) {
    case "image":
      return (
        <Image
          src={product.images[0] || noImg}
          alt={product.name}
          width={50}
          height={50}
          className="object-cover"
        />
      );
    case "name":
      return <span className="font-semibold">{cellValue}</span>;
    case "description":
      return (
        <Tooltip content={cellValue}>
          <span>
            {cellValue.length > 20
              ? `${cellValue.substring(0, 20)}...`
              : cellValue}
          </span>
        </Tooltip>
      );
    case "price":
      return (
        <div className="flex flex-col">
          <span className="font-semibold">${cellValue.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="text-tiny text-default-400">
              Discount: {product.discount}%
            </span>
          )}
        </div>
      );
    case "category":
      return <span>{product.category.name}</span>;
    case "actions":
      return (
        <div className="flex items-center gap-2">
          <Tooltip content="Edit product">
            <EditProduct product={product as Product} />
          </Tooltip>
          <Tooltip content="Duplicate product">
            <DuplicateProduct productId={product.id} />
          </Tooltip>
          <Tooltip content="Delete product">
            <DeleteProduct productId={product.id} />
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};

const VendorProductListPage = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const {
    data: products = [],
    meta,
    isFetching,
  } = useFetchData(GET_MY_PRODUCTS, { page, limit });

  useEffect(() => {
    if (meta?.total) {
      setTotalPages(Math.ceil(meta.total / limit));
    }
  }, [meta]);

  return (
    <div className="my-1">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Product List</p>
      </div>
      <Divider className="my-4" />
      <Table
        aria-label="Product list table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              hidden={products.length === 0}
              color="primary"
              page={page}
              total={totalPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={products}
          emptyContent={"No rows to display."}
          isLoading={isFetching}
          loadingContent={<AppLoading />}
        >
          {(item: Product) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default VendorProductListPage;
