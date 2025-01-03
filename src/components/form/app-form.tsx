"use client";

import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface formConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps extends formConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
  reset?: boolean;
}

export default function AppForm({
  children,
  onSubmit,
  defaultValues,
  resolver,
  reset = true,
}: IProps) {
  const formConfig: formConfig = {};

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submitHandler = methods.handleSubmit((data) => {
    onSubmit(data);
    if (reset) {
      methods.reset();
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler}>{children}</form>
    </FormProvider>
  );
}
