"use client";

import { Avatar, Divider } from "@nextui-org/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { ChangeEvent, useState } from "react";
import { Input } from "@nextui-org/input";

import {
  GET_MY_PROFILE,
  UPDATE_MY_PROFILE,
} from "@/src/api-endpoints/user.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import AppForm from "@/src/components/form/app-form";
import AppInput from "@/src/components/form/app-input";
import { updateAdminValidationSchema } from "@/src/schemas/user.schema";
import { TAdmin } from "@/src/types";
import { useUpdateData } from "@/src/hooks/mutation.hook";
import { noImg } from "@/src/constants";

const AdminDashboard = () => {
  const [imageFiles, setImageFiles] = useState<File | undefined>();
  const [imagePreviews, setImagePreviews] = useState<string | undefined>();

  const { data, isLoading } = useFetchData(GET_MY_PROFILE) as {
    data: TAdmin;
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
    <div className="my-1">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Dashboard</p>
      </div>
      <Divider className="my-4" />
      <div className="max-w-xs mx-auto my-10">
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
          resolver={zodResolver(updateAdminValidationSchema)}
          defaultValues={{
            name: data?.name,
            phone: data?.phone,
          }}
          reset={false}
          onSubmit={handleUpdateProfile}
        >
          <div className="my-3">
            <AppInput label="Name" name="name" />
          </div>
          <div className="my-3">
            <AppInput label="phone" name="phone" type="number" />
          </div>
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              color="primary"
              isDisabled={isLoading}
              isLoading={isPending}
            >
              Update
            </Button>
          </div>
        </AppForm>
      </div>
    </div>
  );
};

export default AdminDashboard;
