"use client";

import {
  getKeyValue,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Divider } from "@nextui-org/react";

import AddCategory from "./_components/add-category";
import UpdateCategory from "./_components/update-category";
import DeleteCategories from "./_components/delete-categories";

import { GET_ALL_CATEGORIES } from "@/src/api-endpoints/category.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { Category } from "@/src/types";
import { noImg } from "@/src/constants";
import AppLoading from "@/src/components/ui/loading-contents/app-loading";

const columns = [
  {
    key: "icon",
    label: "Icon",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "description",
    label: "Description",
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

const AdminManageCategories = () => {
  const { data: categories = [], isFetching } = useFetchData(
    GET_ALL_CATEGORIES
  ) as {
    data: Category[];
    isFetching: boolean;
  };

  return (
    <div className="my-1 space-y-4">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Manage Categories</p>
        <AddCategory />
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
          isLoading={isFetching}
          loadingContent={<AppLoading />}
        >
          {(item: Category) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "icon" ? (
                    <Image
                      src={item.icon || noImg}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                  ) : columnKey === "edit" ? (
                    <UpdateCategory category={item} />
                  ) : columnKey === "delete" ? (
                    <DeleteCategories categoryId={item.id} />
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

export default AdminManageCategories;
