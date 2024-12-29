"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Form } from "@nextui-org/react";
import { Input } from "@nextui-org/input";

import { useUserLogin } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/user.provider";

const credentials = {
  admin: { email: "admin@mail.com", password: "123456" },
  vendor: { email: "vendor@mail.com", password: "123456" },
  customer: { email: "rahat.ashik.18@gmail.com", password: "123456" },
};

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<undefined | Record<string, string>>();
  const [showPass, setShowPass] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const { mutateAsync: handleUserLogin, isPending } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (!data.email) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));

      return;
    }
    if (!data.password) {
      setErrors((prev) => ({
        ...prev,
        password: "Please enter your password",
      }));

      return;
    }
    setErrors(undefined);

    const res = await handleUserLogin(data);

    if (res?.success) {
      if (res.data.user.role === "VENDOR") {
        router.replace("/vendor/dashboard");
      } else if (res.data.user.role === "ADMIN") {
        router.replace("/admin/dashboard");
      } else if (redirect) {
        router.replace(redirect);
      } else {
        router.replace("/");
      }
    }
    userLoading(true);
  };

  return (
    <div className="flex w-full min-h-[80vh] py-5 flex-col items-center justify-center">
      <h3 className="my-2 text-2xl font-bold">Login with ShopEase</h3>
      <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
      <div className="flex justify-center items-center space-x-2">
        <p className="italic">Credentials: </p>
        <Button
          color="primary"
          size="sm"
          radius="full"
          onPress={() => setUserCredentials(credentials.admin)}
        >
          Admin
        </Button>
        <Button
          color="warning"
          size="sm"
          radius="full"
          onPress={() => setUserCredentials(credentials.vendor)}
        >
          Vendor
        </Button>
        <Button
          color="success"
          size="sm"
          radius="full"
          onPress={() => setUserCredentials(credentials.customer)}
        >
          Customer
        </Button>
      </div>
      <div className="w-10/12 md:w-[35%] space-y-3 mt-5">
        <Form
          validationBehavior="native"
          validationErrors={errors}
          onSubmit={onSubmit}
        >
          <Input
            isRequired
            fullWidth
            value={userCredentials.email}
            isInvalid={!!errors?.email}
            errorMessage={errors?.email && errors.email}
            name="email"
            label="Email"
            type="email"
          />

          <Input
            isRequired
            fullWidth
            value={userCredentials.password}
            isInvalid={!!errors?.password}
            errorMessage={errors?.password && errors.password}
            name="password"
            label="Password"
            type={`${showPass ? "text" : "password"}`}
            isClearable={false}
            endContent={
              <FaLock
                className="text-2xl text-default-400 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            }
          />

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
            isLoading={isPending}
          >
            Login
          </Button>
        </Form>
        <div className="text-center">
          Don&lsquo;t have account ?{" "}
          <Link href={"/signup"} className="text-primary-500">
            Sign Up
          </Link>
        </div>
        <div className="text-center my-1">
          <Link href={"/forgot-password"} className="text-danger-500">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
