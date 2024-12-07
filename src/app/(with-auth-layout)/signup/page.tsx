"use client";

import Link from "next/link";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaLock } from "react-icons/fa";
import { Button } from "@nextui-org/button";

import { useUserRegistration } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/user.provider";
import AppForm from "@/src/components/form/app-form";
import {
  customerSignupValidationSchema,
  vendorSignupValidationSchema,
} from "@/src/schemas/auth.schema";
import AppInput from "@/src/components/form/app-input";
import AppTextarea from "@/src/components/form/app-textarea";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [selectedUser, setSelectedUser] = useState("customer");

  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const { mutateAsync: handleUserRegistration, isPending } =
    useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formdata = new FormData();

    if (selectedUser === "customer") {
      const customerData = {
        password: data.password,
        customer: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
        },
      };

      formdata.append("data", JSON.stringify(customerData));
    } else {
      const vendorData = {
        password: data.password,
        vendor: {
          email: data.email,
          phone: data.phone,
          shopName: data.shopName,
          shopDescription: data.shopDescription,
          address: data.address,
        },
      };

      formdata.append("data", JSON.stringify(vendorData));
    }

    const res = await handleUserRegistration({
      userData: formdata,
      selectedUser,
    });

    if (res.success) {
      router.push("/");
    }
    userLoading(true);
  };

  return (
    <div>
      <div className="flex w-full h-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Sign up with ShopEase</h3>
        <p className="mb-4">Let&lsquo;s Get You Signed Up !</p>
        <div className="w-10/12 md:w-[35%]">
          <Tabs
            fullWidth
            aria-label="Options"
            selectedKey={selectedUser}
            onSelectionChange={(key: React.Key) => {
              setSelectedUser(key as string);
            }}
          >
            <Tab key="customer" title="Customer">
              <Card>
                <CardBody>
                  <AppForm
                    resolver={zodResolver(customerSignupValidationSchema)}
                    onSubmit={onSubmit}
                  >
                    <div className="py-3">
                      <AppInput name="name" label="Name" type="text" />
                    </div>
                    <div className="py-3">
                      <AppInput name="email" label="Email" type="email" />
                    </div>
                    <div className="py-3">
                      <AppInput name="phone" label="Phone" type="tel" />
                    </div>
                    <div className="py-3">
                      <AppInput name="address" label="Address" type="text" />
                    </div>
                    <div className="py-3">
                      <AppInput
                        name="password"
                        label="Password"
                        type={`${showPass ? "text" : "password"}`}
                        clearable={false}
                        endContent={
                          <FaLock
                            className="text-2xl text-default-400 cursor-pointer"
                            onClick={() => setShowPass(!showPass)}
                          />
                        }
                      />
                    </div>

                    <Button
                      className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                      size="lg"
                      type="submit"
                      isLoading={isPending}
                    >
                      Sign Up
                    </Button>
                  </AppForm>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="vendor" title="Vendor">
              <Card>
                <CardBody>
                  <AppForm
                    resolver={zodResolver(vendorSignupValidationSchema)}
                    onSubmit={onSubmit}
                  >
                    <div className="py-3">
                      <AppInput name="email" label="Email" type="email" />
                    </div>
                    <div className="py-3">
                      <AppInput name="phone" label="Phone" type="tel" />
                    </div>
                    <div className="py-3">
                      <AppInput name="shopName" label="Shop Name" type="text" />
                    </div>
                    <div className="py-3">
                      <AppInput name="address" label="Address" type="text" />
                    </div>

                    <div className="py-3">
                      <AppInput
                        name="password"
                        label="Password"
                        type={`${showPass ? "text" : "password"}`}
                        clearable={false}
                        endContent={
                          <FaLock
                            className="text-2xl text-default-400 cursor-pointer"
                            onClick={() => setShowPass(!showPass)}
                          />
                        }
                      />
                    </div>
                    <div className="py-3">
                      <AppTextarea
                        name="shopDescription"
                        label="Shop Description"
                        type="text"
                      />
                    </div>
                    <Button
                      className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                      size="lg"
                      type="submit"
                      isLoading={isPending}
                    >
                      Sign Up
                    </Button>
                  </AppForm>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
          <div className="text-center">
            Already have an account ?{" "}
            <Link href={"/signin"} className="text-primary-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
