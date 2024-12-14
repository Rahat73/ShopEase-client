import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaEdit } from "react-icons/fa";

import { addProductValidationSchema } from "@/src/schemas/product.schema";
import AppTextarea from "@/src/components/form/app-textarea";
import AppSelect from "@/src/components/form/app-select";
import AppInput from "@/src/components/form/app-input";
import AppForm from "@/src/components/form/app-form";
import {
  GET_MY_PRODUCTS,
  UPDATE_PRODUCT,
} from "@/src/api-endpoints/product.api";
import { useUpdateData } from "@/src/hooks/mutation.hook";
import { GET_ALL_CATEGORIES } from "@/src/api-endpoints/category.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { Category, Product } from "@/src/types";

const EditProduct = ({ product }: { product: Product }) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { data: categories, isLoading: categoriesLoading } =
    useFetchData(GET_ALL_CATEGORIES);

  const categoryOptions = categories?.map((category: Category) => ({
    label: category.name,
    key: category.id,
  }));

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const { mutateAsync: updateProduct, isPending } = useUpdateData({
    invalidateQueries: [GET_MY_PRODUCTS],
  });

  const handleUpdateProduct: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    const postData = {
      ...data,
      price: Number(data.price),
      discount: Number(data.discount),
      inventoryCount: Number(data.inventoryCount),
    };

    formData.append("data", JSON.stringify(postData));
    for (let image of imageFiles) {
      formData.append("files", image);
    }
    const res = await updateProduct({
      url: UPDATE_PRODUCT + "/" + product.id,
      postData: formData,
    });

    if (res?.success) {
      setImageFiles([]);
      setImagePreviews([]);
      onClose();
    }
  };

  return (
    <>
      <Button isIconOnly aria-label="Edit" variant="light" onPress={onOpen}>
        <FaEdit size={18} className="text-blue-500 hover:text-blue-700" />
      </Button>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        classNames={{
          closeButton: "right-2 top-2",
        }}
        size="2xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-10">
            Edit Product
          </ModalHeader>
          <ModalBody>
            <AppForm
              resolver={zodResolver(addProductValidationSchema)}
              defaultValues={product}
              reset={false}
              onSubmit={handleUpdateProduct}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="my-3">
                    <AppInput label="Product Name" name="name" />
                  </div>
                  <div className="my-3">
                    <AppTextarea label="Description" name="description" />
                  </div>
                  <div className="my-3">
                    <AppInput label="Price" name="price" type="number" />
                  </div>
                  <div className="my-3">
                    <AppInput label="Discount" name="discount" type="number" />
                  </div>
                  <div className="my-3">
                    <AppInput
                      label="Inventory"
                      name="inventoryCount"
                      type="number"
                    />
                  </div>
                </div>
                <div>
                  <div className="my-3">
                    <AppSelect
                      label="Category"
                      name="categoryId"
                      loading={categoriesLoading}
                      options={categoryOptions}
                    />
                  </div>
                  <div className="min-w-fit flex-1">
                    <label
                      className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                      htmlFor="image"
                    >
                      Upload image
                    </label>
                    <input
                      multiple
                      className="hidden"
                      id="image"
                      type="file"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </div>
                  {imagePreviews.length > 0 ? (
                    <div className="grid grid-cols-2 gap-5 my-5">
                      {imagePreviews.map((imageDataUrl) => (
                        <div
                          key={imageDataUrl}
                          className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2"
                        >
                          <Image
                            alt="item"
                            className="size-28 object-cover object-center rounded-md"
                            src={imageDataUrl}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    product.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-5 my-5">
                        {product.images.map((imageDataUrl) => (
                          <div
                            key={imageDataUrl}
                            className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2"
                          >
                            <Image
                              alt="item"
                              className="size-28 object-cover object-center rounded-md"
                              src={imageDataUrl}
                            />
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="max-w-60 mx-auto my-3">
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isPending}
                  className="w-full"
                >
                  Update Product
                </Button>
              </div>
            </AppForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProduct;
