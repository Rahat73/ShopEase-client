"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SearchIcon } from "@/src/components/icons";
import { Product } from "@/src/types";
import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { noImg } from "@/src/constants";

const ComparePage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState("first");

  const [selectedProductFirst, setSelectedProductFirst] = useState<Product>();
  const [selectedProductSecond, setSelectedProductSecond] = useState<Product>();
  const [selectedProductThird, setSelectedProductThird] = useState<Product>();
  const [selectedProductCategory, setSelectedProductCategory] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    // Cleanup function to cancel the timeout if the user types again
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data = [], isFetching } = useFetchData(
    GET_ALL_PRODUCTS,
    {
      searchTerm: debouncedSearchTerm,
    },
    () => debouncedSearchTerm.length > 0
  );

  const handleModal = (value: string) => {
    onOpen();
    setSelected(value);
  };

  const handleProductSelection = (product: Product) => {
    if (
      selectedProductCategory &&
      selectedProductCategory !== product.category.name
    ) {
      toast.error("Please select a product from the same category.");

      return;
    }

    if (selected === "first") {
      setSelectedProductCategory(product.category.name);
      setSelectedProductFirst(product);
    } else if (selected === "second") {
      setSelectedProductCategory(product.category.name);
      setSelectedProductSecond(product);
    } else {
      setSelectedProductCategory(product.category.name);
      setSelectedProductThird(product);
    }

    onOpenChange();
  };

  return (
    <div className="py-5 mx-12">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Compare Products</p>
        <div className="flex items-center gap-5">
          {selectedProductCategory && (
            <p className="text-base font-medium">
              Category: {selectedProductCategory}
            </p>
          )}
          <Button
            color="danger"
            variant="flat"
            startContent={<MdClear />}
            onPress={() => {
              setSelectedProductFirst(undefined);
              setSelectedProductSecond(undefined);
              setSelectedProductThird(undefined);
              setSelectedProductCategory("");
            }}
          >
            Clear
          </Button>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <div className="p-5 bg-default-100 rounded-lg shadow-lg h-[450px] flex justify-center items-center">
          {selectedProductFirst ? (
            <>
              <div className="flex flex-col gap-2">
                <Image
                  alt={selectedProductFirst.name}
                  className="w-full object-cover"
                  radius="lg"
                  shadow="sm"
                  src={selectedProductFirst.images?.[0] || noImg}
                  width={200}
                  height={150}
                />
                <p className="text-lg font-bold">{selectedProductFirst.name}</p>
                <p className="text-md">
                  Price:{" "}
                  <span className="text-green-600 font-bold">
                    {(
                      selectedProductFirst.price -
                      selectedProductFirst.price * (0 / 100)
                    ).toFixed(2)}
                    $
                  </span>
                  <s className="ml-2 text-sm text-default-500">
                    {selectedProductFirst.price.toFixed(2)}$
                  </s>
                </p>
                <p className="text-md">
                  Discount: {selectedProductFirst.discount}%
                </p>
                <p className="text-md">
                  Sold: {selectedProductFirst.soldCount}
                </p>
                <p className="text-md">
                  In Stock: {selectedProductFirst.inventoryCount}
                </p>
                <Button
                  className="mt-5"
                  onPress={() => {
                    router.push(`/products/${selectedProductFirst.id}`);
                  }}
                >
                  View Product
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button
                variant="light"
                onPress={() => {
                  handleModal("first");
                }}
              >
                + Add Product
              </Button>
            </>
          )}
        </div>
        <div className="p-5 bg-default-100 rounded-lg shadow-lg h-[450px] flex justify-center items-center">
          {selectedProductSecond ? (
            <>
              <div className="flex flex-col gap-2">
                <Image
                  alt={selectedProductSecond.name}
                  className="w-full object-cover"
                  radius="lg"
                  shadow="sm"
                  src={selectedProductSecond.images?.[0] || noImg}
                  width={200}
                  height={150}
                />
                <p className="text-lg font-bold">
                  {selectedProductSecond.name}
                </p>
                <p className="text-md">
                  Price:{" "}
                  <span className="text-green-600 font-bold">
                    {(
                      selectedProductSecond.price -
                      selectedProductSecond.price * (0 / 100)
                    ).toFixed(2)}
                    $
                  </span>
                  <s className="ml-2 text-sm text-default-500">
                    {selectedProductSecond.price.toFixed(2)}$
                  </s>
                </p>
                <p className="text-md">
                  Discount: {selectedProductSecond.discount}%
                </p>
                <p className="text-md">
                  Sold: {selectedProductSecond.soldCount}
                </p>
                <p className="text-md">
                  In Stock: {selectedProductSecond.inventoryCount}
                </p>
                <Button
                  className="mt-5"
                  onPress={() => {
                    router.push(`/products/${selectedProductSecond.id}`);
                  }}
                >
                  View Product
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button
                variant="light"
                onPress={() => {
                  handleModal("second");
                }}
              >
                + Add Product
              </Button>
            </>
          )}
        </div>
        <div className="p-5 bg-default-100 rounded-lg shadow-lg h-[450px] flex justify-center items-center">
          {selectedProductThird ? (
            <>
              <div className="flex flex-col gap-2">
                <Image
                  alt={selectedProductThird.name}
                  className="w-full object-cover"
                  radius="lg"
                  shadow="sm"
                  src={selectedProductThird.images?.[0] || noImg}
                  width={200}
                  height={150}
                />
                <p className="text-lg font-bold">{selectedProductThird.name}</p>
                <p className="text-md">
                  Price:{" "}
                  <span className="text-green-600 font-bold">
                    {(
                      selectedProductThird.price -
                      selectedProductThird.price * (0 / 100)
                    ).toFixed(2)}
                    $
                  </span>
                  <s className="ml-2 text-sm text-default-500">
                    {selectedProductThird.price.toFixed(2)}$
                  </s>
                </p>
                <p className="text-md">
                  Discount: {selectedProductThird.discount}%
                </p>
                <p className="text-md">
                  Sold: {selectedProductThird.soldCount}
                </p>
                <p className="text-md">
                  In Stock: {selectedProductThird.inventoryCount}
                </p>
                <Button
                  className="mt-5"
                  onPress={() => {
                    router.push(`/products/${selectedProductThird.id}`);
                  }}
                >
                  View Product
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button
                variant="light"
                onPress={() => {
                  handleModal("third");
                }}
              >
                + Add Product
              </Button>
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        className="h-96"
        classNames={{
          closeButton: "right-2 top-2",
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select a product
              </ModalHeader>
              <ModalBody>
                <Autocomplete
                  fullWidth
                  isClearable
                  isLoading={isFetching}
                  size="lg"
                  defaultItems={data}
                  placeholder="Search..."
                  startContent={
                    <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  onInputChange={setSearchTerm}
                >
                  {(product: Product) => (
                    <AutocompleteItem
                      key={product.id}
                      textValue={product.name}
                      onPress={() => handleProductSelection(product)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex gap-5 items-center">
                          <Image
                            src={product.images?.[0] || noImg}
                            alt={product.name}
                            width={50}
                            height={50}
                          />
                          <div>
                            <p>{product.name}</p>
                            <p className="text-green-600">
                              {(
                                product.price -
                                product.price * (product.discount / 100)
                              ).toFixed(2)}
                              $
                            </p>
                          </div>
                        </div>
                        <p className="text-default-500">
                          {product.category.name}
                        </p>
                      </div>
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ComparePage;
