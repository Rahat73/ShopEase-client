"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Avatar, Divider } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaEdit } from "react-icons/fa";

import ChangePassword from "../../../../components/shared/change-password";

import AppForm from "@/src/components/form/app-form";
import AppInput from "@/src/components/form/app-input";
import { noImg } from "@/src/constants";
import { updateCustomerValidationSchema } from "@/src/schemas/user.schema";
import { useFetchData } from "@/src/hooks/fetch.hook";
import {
  GET_MY_PROFILE,
  UPDATE_MY_PROFILE,
} from "@/src/api-endpoints/user.api";
import { Customer } from "@/src/types";
import { useUpdateData } from "@/src/hooks/mutation.hook";
import AppTextarea from "@/src/components/form/app-textarea";

const UserProfilePage = () => {
  const [imageFiles, setImageFiles] = useState<File | undefined>();
  const [imagePreviews, setImagePreviews] = useState<string | undefined>();

  const { data, isLoading } = useFetchData(GET_MY_PROFILE) as {
    data: Customer;
    isLoading: boolean;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const { mutate: updateProfile, isPending } = useUpdateData({
    invalidateQueries: [GET_MY_PROFILE],
  });

  const handleUpdateProfile: SubmitHandler<FieldValues> = (data) => {
    const formdata = new FormData();

    if (imageFiles) {
      formdata.append("file", imageFiles);
    }

    formdata.append("data", JSON.stringify(data));

    updateProfile({
      url: UPDATE_MY_PROFILE,
      postData: formdata,
    });
  };

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <div className="py-5">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>My Profile</p>
      </div>
      <Divider className="my-4" />
      <div className="max-w-xs mx-auto my-10 relative">
        <div className="flex justify-center">
          <label htmlFor="image" className="cursor-pointer">
            <Avatar
              isBordered
              className="w-24 h-24"
              src={imagePreviews || data?.profilePhoto || noImg}
              alt="avatar"
            />
          </label>
          <input
            className="hidden"
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
        <div className="my-3">
          <Input
            readOnly
            label="email"
            name="Email"
            defaultValue={data.email}
          />
        </div>
        <AppForm
          resolver={zodResolver(updateCustomerValidationSchema)}
          defaultValues={data}
          reset={false}
          onSubmit={handleUpdateProfile}
        >
          <div className="my-3">
            <AppInput label="Name" name="name" />
          </div>
          <div className="my-3">
            <AppTextarea label="Address" name="address" />
          </div>
          <div className="my-3">
            <AppInput label="phone" name="phone" type="number" />
          </div>
          <div className="w-full flex justify-between">
            <Button
              type="submit"
              color="primary"
              isDisabled={isLoading}
              isLoading={isPending}
              startContent={<FaEdit />}
            >
              Update
            </Button>
          </div>
        </AppForm>
        <ChangePassword />
      </div>
    </div>
  );
};

export default UserProfilePage;
