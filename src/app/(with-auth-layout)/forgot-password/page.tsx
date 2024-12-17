"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { FieldValues, SubmitHandler } from "react-hook-form";

import {
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
} from "@/src/schemas/auth.schema";
import AppInput from "@/src/components/form/app-input";
import AppForm from "@/src/components/form/app-form";
import envConfig from "@/src/config/env-config";
import { useForgotPassword } from "@/src/hooks/auth.hook";

const ForgotPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const [showPass, setShowPass] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const { mutateAsync: handleForgotPassword, isPending } = useForgotPassword();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await handleForgotPassword(data);

    if (!res?.success) {
      setForgotSuccess(false);

      return;
    }

    setForgotSuccess(true);
  };

  const handleNewPasswordSubmit: SubmitHandler<FieldValues> = async (data) => {
    setResetLoading(true);
    await axios
      .post(
        `${envConfig.baseApi}/auth/reset-password`,
        { ...data, id: userId },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setResetSuccess(true);
          toast.success(res.data.message);
        } else {
          setResetSuccess(false);
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        setResetSuccess(false);
        toast.error(err.message);
      });

    setResetLoading(false);
  };

  useEffect(() => {
    if (resetSuccess) {
      router.push("/signin");
    }
  }, [resetSuccess]);

  return (
    <div className="flex min-h-screen py-5 w-full flex-col items-center justify-center">
      {userId && token ? (
        <>
          <h3 className="my-2 text-2xl font-bold">ShopEase</h3>
          <p className="mb-4">Enter your new password</p>
          <div className="w-10/12 md:w-[35%]">
            <AppForm
              resolver={zodResolver(resetPasswordValidationSchema)}
              onSubmit={handleNewPasswordSubmit}
            >
              <div className="py-3">
                <AppInput
                  name="password"
                  label="New Password"
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
                isLoading={resetLoading}
              >
                Submit Password
              </Button>
            </AppForm>
            <div className="text-center text-primary-500 my-2">
              <Link href="/signin">Back to Login ?</Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className="my-2 text-2xl font-bold">ShopEase</h3>
          <p className="mb-4">Enter your email to reset password</p>
          <div className="w-10/12 md:w-[35%]">
            <AppForm
              resolver={zodResolver(forgotPasswordValidationSchema)}
              onSubmit={onSubmit}
            >
              <div className="py-3">
                <AppInput name="email" label="Email" type="email" />
              </div>

              <Button
                className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                size="lg"
                type="submit"
                isLoading={isPending}
              >
                Reset Password
              </Button>
            </AppForm>
            <div className="text-center text-primary-500 my-2">
              <Link href="/signin">Back to Login ?</Link>
            </div>
            {forgotSuccess && (
              <p className="text-center font-bold text-default">
                Reset Password Link Sent to your email. Check spam box if not
                found.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
