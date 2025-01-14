"use client";

import { Avatar, Divider } from "@nextui-org/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { ChangeEvent, useState } from "react";
import { Input } from "@nextui-org/input";
import { FaEdit, FaShoppingBag } from "react-icons/fa";
import { FaBoxOpen, FaPeopleGroup, FaShop } from "react-icons/fa6";

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
import ChangePassword from "@/src/components/shared/change-password";
import AppLoading from "@/src/components/ui/loading-contents/app-loading";
import {
  PRODUCTS_SOLD_PER_MONTH,
  SHOPEASE_SUMMARY,
} from "@/src/api-endpoints/summary.api";
import StatCard from "@/src/components/ui/stat-card";
import BarChart from "@/src/components/ui/bar-chart";

const AdminDashboard = () => {
  const [imageFiles, setImageFiles] = useState<File | undefined>();
  const [imagePreviews, setImagePreviews] = useState<string | undefined>();

  const { data, isLoading } = useFetchData(GET_MY_PROFILE) as {
    data: TAdmin;
    isLoading: boolean;
  };

  const { data: summary, isLoading: summaryLoading } =
    useFetchData(SHOPEASE_SUMMARY);

  const { data: sellSummary, isLoading: sellSummaryLoading } = useFetchData(
    PRODUCTS_SOLD_PER_MONTH
  );

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

  return (
    <div className="my-1">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Dashboard</p>
      </div>
      <Divider className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="col-span-1 md:col-span-5">
          {isLoading ? (
            <AppLoading />
          ) : (
            <div className="w-10/12 lg:w-8/12 mx-auto relative self-start">
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
                  defaultValue={data?.email}
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
          )}
        </div>
        <div className="col-span-1 md:col-span-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 self-start">
            <StatCard
              title="Total Products"
              value={summary?.totalProducts}
              icon={FaBoxOpen}
              isLoading={summaryLoading}
            />
            <StatCard
              title="Total Shops"
              value={summary?.totalShops}
              icon={FaShop}
              isLoading={summaryLoading}
            />
            <StatCard
              title="Total Customers"
              value={summary?.totalCustomers}
              icon={FaPeopleGroup}
              isLoading={summaryLoading}
            />
            <StatCard
              title="Total Orders"
              value={summary?.totalOrders}
              icon={FaShoppingBag}
              isLoading={summaryLoading}
            />
          </div>

          {sellSummaryLoading ? (
            <AppLoading />
          ) : (
            <BarChart data={sellSummary} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
