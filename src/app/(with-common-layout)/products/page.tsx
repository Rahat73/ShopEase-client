"use client";

import {
  Checkbox,
  Chip,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Link,
  Select,
  SelectItem,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";

import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import ProductCard from "@/src/components/ui/product-card";
import { Category, Product } from "@/src/types";
import { GET_ALL_CATEGORIES } from "@/src/api-endpoints/category.api";
import ProductCardSkeleton from "@/src/components/ui/loading-contents/product-card-skeleton";

const AllProducts = () => {
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const categoryName = searchParams.get("categoryName");
  const searchTerm = searchParams.get("searchTerm");
  const router = useRouter();

  const { data: products = [], isFetching: isProductsFetching } = useFetchData(
    GET_ALL_PRODUCTS,
    {
      sortBy,
      sortOrder,
      categoryId,
      searchTerm,
    }
  );
  const { data: categories = [], isLoading: isCategoryLoading } =
    useFetchData(GET_ALL_CATEGORIES);

  return (
    <>
      <div className="py-5">
        <div className="text-xl font-bold space-x-4 flex justify-start items-center">
          <p>All Products</p>
          {categoryName && (
            <Chip variant="bordered" onClose={() => router.push("/products")}>
              {categoryName}
            </Chip>
          )}
          <Button className=" block md:hidden" size="sm" onPress={onOpen}>
            Filter
          </Button>
        </div>
        <Divider className="my-4" />

        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-2 hidden md:block">
            <div>
              <p className="text-lg ">Categories</p>
              {isCategoryLoading ? (
                <div className="space-y-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="w-3/5 h-3" />
                  ))}
                </div>
              ) : (
                <>
                  {categories.map((item: Category) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Link
                        className="font-light hover:underline cursor-pointer text-default-800"
                        onClick={() =>
                          router.push(
                            `/products?categoryId=${item.id}&categoryName=${item.name}`
                          )
                        }
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </>
              )}
            </div>
            <Divider className="my-2" />
            <div className="space-y-2 flex flex-col">
              <p className="text-lg ">Sort By</p>
              <Select
                className="max-w-xs"
                label="Price"
                labelPlacement="inside"
                size="sm"
                selectedKeys={sortOrder ? [sortOrder] : []}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setSortBy("price");
                }}
              >
                <SelectItem key="desc" value="desc">
                  High to Low
                </SelectItem>
                <SelectItem key="asc" value="asc">
                  Low to High
                </SelectItem>
              </Select>
              <div>
                <Checkbox
                  color="success"
                  className="space-x-1"
                  isSelected={sortBy === "soldCount"}
                  onValueChange={(value) => {
                    setSortBy(value ? "soldCount" : "");
                    setSortOrder("");
                  }}
                >
                  Best Seller
                </Checkbox>
                <Checkbox
                  color="success"
                  className="space-x-1"
                  isSelected={sortBy === "inventoryCount"}
                  onValueChange={(value) => {
                    setSortBy(value ? "inventoryCount" : "");
                    setSortOrder("");
                  }}
                >
                  Availability
                </Checkbox>
                <Checkbox
                  color="success"
                  className="space-x-1"
                  isSelected={sortBy === "discount"}
                  onValueChange={(value) => {
                    setSortBy(value ? "discount" : "");
                    setSortOrder("");
                  }}
                >
                  Discount
                </Checkbox>
              </div>
            </div>
            <Divider className="my-2" />
          </div>
          <div className="bg-default-100 rounded-lg shadow-lg p-5 col-span-10 md:col-span-8 ">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {isProductsFetching ? (
                <>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </>
              ) : (
                <>
                  {products.map((item: Product) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Drawer
        backdrop="blur"
        isOpen={isOpen}
        size="xs"
        placement="left"
        className="min-h-screen"
        classNames={{
          closeButton: "right-2 top-2",
        }}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Filter
              </DrawerHeader>
              <DrawerBody>
                <div className="">
                  <div>
                    <p className="text-lg ">Categories</p>
                    {isCategoryLoading ? (
                      <div>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Skeleton key={index} className="w-3/5 h-3" />
                        ))}
                      </div>
                    ) : (
                      <>
                        {categories.map((item: Category) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-2"
                          >
                            <Link
                              className="font-light hover:underline cursor-pointer text-default-800"
                              onClick={() =>
                                router.push(
                                  `/products?categoryId=${item.id}&categoryName=${item.name}`
                                )
                              }
                            >
                              {item.name}
                            </Link>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <Divider className="my-2" />
                  <div className="space-y-2 flex flex-col">
                    <p className="text-lg ">Sort By</p>
                    <Select
                      className="max-w-xs"
                      label="Price"
                      labelPlacement="inside"
                      size="sm"
                      selectedKeys={sortOrder ? [sortOrder] : []}
                      onChange={(e) => {
                        setSortOrder(e.target.value);
                        setSortBy("price");
                      }}
                    >
                      <SelectItem key="desc" value="desc">
                        High to Low
                      </SelectItem>
                      <SelectItem key="asc" value="asc">
                        Low to High
                      </SelectItem>
                    </Select>
                    <div>
                      <Checkbox
                        color="success"
                        className="space-x-1"
                        isSelected={sortBy === "soldCount"}
                        onValueChange={(value) => {
                          setSortBy(value ? "soldCount" : "");
                          setSortOrder("");
                        }}
                      >
                        Best Seller
                      </Checkbox>
                      <Checkbox
                        color="success"
                        className="space-x-1"
                        isSelected={sortBy === "inventoryCount"}
                        onValueChange={(value) => {
                          setSortBy(value ? "inventoryCount" : "");
                          setSortOrder("");
                        }}
                      >
                        Availability
                      </Checkbox>
                      <Checkbox
                        color="success"
                        className="space-x-1"
                        isSelected={sortBy === "discount"}
                        onValueChange={(value) => {
                          setSortBy(value ? "discount" : "");
                          setSortOrder("");
                        }}
                      >
                        Discount
                      </Checkbox>
                    </div>
                  </div>
                  <Divider className="my-2" />
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AllProducts;
