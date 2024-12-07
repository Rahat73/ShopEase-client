import { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUser {
  email: string;
  role: string;
}

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  defaultValue?: string;
  endContent?: ReactNode;
}
