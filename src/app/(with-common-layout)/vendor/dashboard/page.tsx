"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Avatar, Divider } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { FaEdit, FaShoppingBag } from "react-icons/fa";
import { FaBoxOpen, FaPeopleGroup } from "react-icons/fa6";

import {
  GET_MY_PROFILE,
  UPDATE_MY_PROFILE,
} from "@/src/api-endpoints/user.api";
import AppForm from "@/src/components/form/app-form";
import AppInput from "@/src/components/form/app-input";
import { noImg } from "@/src/constants";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { useUpdateData } from "@/src/hooks/mutation.hook";
import { TVendor } from "@/src/types";
import { updateVendorValidationSchema } from "@/src/schemas/user.schema";
import AppTextarea from "@/src/components/form/app-textarea";
import ChangePassword from "@/src/components/shared/change-password";
import AppLoading from "@/src/components/ui/loading-contents/app-loading";
import BarChart from "@/src/components/ui/bar-chart";
import {
  PRODUCTS_SOLD_PER_MONTH_VENDOR,
  VENDOR_SUMMARY,
} from "@/src/api-endpoints/summary.api";
import StatCard from "@/src/components/ui/stat-card";

const VendorDashboard = () => {
  const [imageFiles, setImageFiles] = useState<File | undefined>();
  const [imagePreviews, setImagePreviews] = useState<string | undefined>();

  const { data, isLoading } = useFetchData(GET_MY_PROFILE) as {
    data: TVendor;
    isLoading: boolean;
  };

  const { data: summary, isLoading: summaryLoading } =
    useFetchData(VENDOR_SUMMARY);

  const { data: sellSummary, isLoading: sellSummaryLoading } = useFetchData(
    PRODUCTS_SOLD_PER_MONTH_VENDOR
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

  const { mutateAsync: updateProfile, isPending } = useUpdateData({
    invalidateQueries: [GET_MY_PROFILE],
  });

  const handleUpdateProfile: SubmitHandler<FieldValues> = async (data) => {
    const formdata = new FormData();

    if (imageFiles) {
      formdata.append("file", imageFiles);
    }

    formdata.append("data", JSON.stringify(data));

    const res = await updateProfile({
      url: UPDATE_MY_PROFILE,
      postData: formdata,
    });

    if (typeof res === "string" && res === "Duplicate Key error") {
      toast.error("Shop name already exists");
    }
  };

  return (
    <div className="my-1">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Dashboard</p>
      </div>
      <Divider className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="col-span-1 md:col-span-5 self-start">
          {isLoading ? (
            <AppLoading />
          ) : (
            <div className="max-w-xs mx-auto relative">
              <div className="flex justify-center">
                <label htmlFor="image" className="cursor-pointer">
                  <Avatar
                    isBordered
                    className="w-24 h-24"
                    src={imagePreviews || data?.shopLogo || noImg}
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
                resolver={zodResolver(updateVendorValidationSchema)}
                defaultValues={data}
                reset={false}
                onSubmit={handleUpdateProfile}
              >
                <div className="my-3">
                  <AppInput label="Shop Name" name="shopName" />
                </div>
                <div className="my-3">
                  <AppTextarea label="Description" name="shopDescription" />
                </div>
                <div className="my-3">
                  <AppInput label="Phone" name="phone" type="number" />
                </div>
                <div className="my-3">
                  <AppTextarea label="Address" name="address" />
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
        <div className="col-span-1 md:col-span-7 self-start">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 self-start mb-4">
            <StatCard
              title="Total Products"
              value={summary?.totalProducts}
              icon={FaBoxOpen}
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

export default VendorDashboard;
