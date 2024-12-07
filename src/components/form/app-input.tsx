"use client";

import { IInput } from "@/src/types";
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

export default function AppInput({
  variant = "bordered",
  size = "md",
  required = false,
  disabled = false,
  clearable = true,
  type = "text",
  label,
  name,
  placeholder,
  defaultValue,
  endContent,
}: IInput) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      isInvalid={!!errors[name]}
      variant={variant}
      size={size}
      isRequired={required}
      isDisabled={disabled}
      isClearable={clearable}
      type={type}
      label={label}
      placeholder={placeholder}
      defaultValue={defaultValue}
      endContent={endContent}
    />
  );
}
