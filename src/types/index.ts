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

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
  CUSTOMER = "CUSTOMER",
}

export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export type TUser = {
  id: string;
  email: string;
  password: string;
  role: Role;
  isSuspended: boolean;
  createdAt: Date;
  updatedAt: Date;
  admin?: TAdmin | null;
  vendor?: TVendor | null;
  customer?: Customer | null;
};

export type TAdmin = {
  id: string;
  email: string;
  name: string;
  phone: string;
  profilePhoto?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: TUser;
};

export type TVendor = {
  id: string;
  email: string;
  shopName: string;
  shopLogo?: string | null;
  shopDescription: string;
  phone: string;
  address: string;
  isBlacklisted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: TUser;
  product: Product[];
  order: Order[];
  cart: Cart[];
  follow: Follow[];
};

export type Customer = {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  profilePhoto?: string | null;
  address?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: TUser;
  order: Order[];
  review: Review[];
  cart?: Cart | null;
  follow: Follow[];
  recentProduct: RecentProduct[];
};

export type Category = {
  id: string;
  name: string;
  description?: string | null;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  inventoryCount: number;
  soldCount: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  vendorId: string;
  vendor: TVendor;
  categoryId: string;
  category: Category;
  orderItem: OrderItem[];
  review: Review[];
  cartItem: CartItem[];
  recentProduct: RecentProduct[];
};

export type Order = {
  id: string;
  totalAmount: number;
  discount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  customerId: string;
  customer: Customer;
  vendorId: string;
  vendor: TVendor;
  orderItems: OrderItem[];
};

export type OrderItem = {
  quantity: number;
  price: number;
  productId: string;
  product: Product;
  orderId: string;
  order: Order;
};

export type Cart = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  cartItems: CartItem[];
  customerId: string;
  customer: Customer;
  vendorId: string;
  vendor: TVendor;
};

export type CartItem = {
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  cartId: string;
  cart: Cart;
  productId: string;
  product: Product;
};

export type Follow = {
  createdAt: Date;
  updatedAt: Date;
  customerId: string;
  customer: Customer;
  vendorId: string;
  vendor: TVendor;
};

export type RecentProduct = {
  createdAt: Date;
  updatedAt: Date;
  customerId: string;
  customer: Customer;
  productId: string;
  product: Product;
};

export type Review = {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  product: Product;
  customerId: string;
  customer: Customer;
};
