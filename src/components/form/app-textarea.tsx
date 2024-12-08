import { Textarea } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

export default function AppTextarea({
  name,
  label,
  variant = "bordered",
  placeholder,
  defaultValue,
}: IInput) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Textarea
      {...register(name)}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      minRows={4}
      variant={variant}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
}
