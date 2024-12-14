"use client";

import { Divider, Image } from "@nextui-org/react";
import React, { ChangeEvent, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { zodResolver } from "@hookform/resolvers/zod";

import AppInput from "@/src/components/form/app-input";
import AppForm from "@/src/components/form/app-form";
import { usePostData } from "@/src/hooks/mutation.hook";
import { ADD_PRODUCT, GET_MY_PRODUCTS } from "@/src/api-endpoints/product.api";
import AppTextarea from "@/src/components/form/app-textarea";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { GET_ALL_CATEGORIES } from "@/src/api-endpoints/category.api";
import { Category } from "@/src/types";
import AppSelect from "@/src/components/form/app-select";
import { addProductValidationSchema } from "@/src/schemas/product.schema";

const VendorAddProduct = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

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

  const { mutate: addProduct, isPending } = usePostData({
    invalidateQueries: [GET_MY_PRODUCTS],
  });

  const handleAddProduct: SubmitHandler<FieldValues> = (data) => {
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
    addProduct({
      url: ADD_PRODUCT,
      postData: formData,
    });

    setImageFiles([]);
    setImagePreviews([]);
  };

  return (
    <div className="my-1">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Add Product</p>
      </div>
      <Divider className="my-4" />
      <div className="max-w-xl mx-auto">
        <AppForm
          resolver={zodResolver(addProductValidationSchema)}
          onSubmit={handleAddProduct}
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
              {imagePreviews.length > 0 && (
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
              )}
            </div>
          </div>
          <div className="max-w-60 mx-auto">
            <Button
              type="submit"
              color="primary"
              isLoading={isPending}
              className="w-full"
            >
              Add Product
            </Button>
          </div>
        </AppForm>
      </div>
    </div>
  );
};

export default VendorAddProduct;
