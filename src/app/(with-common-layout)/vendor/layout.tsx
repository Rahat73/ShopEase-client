"use client";

import { ReactNode, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import {
  MdAddToPhotos,
  MdOutlineDashboard,
  MdOutlineHistory,
  MdOutlineListAlt,
  MdReviews,
} from "react-icons/md";

const VendorLayout = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/vendor/dashboard",
      icon: <MdOutlineDashboard size={20} className="mr-3" />,
    },
    {
      name: "Product List",
      href: "/vendor/product-list",
      icon: <MdOutlineListAlt size={20} className="mr-3" />,
    },
    {
      name: "Add Product",
      href: "/vendor/add-product",
      icon: <MdAddToPhotos size={20} className="mr-3" />,
    },
    {
      name: "Order History",
      href: "/vendor/order-history",
      icon: <MdOutlineHistory size={20} className="mr-3" />,
    },
    {
      name: "Unreplied Reviews",
      href: "/vendor/unreplied-reviews",
      icon: <MdReviews size={20} className="mr-3" />,
    },
  ];

  return (
    <div className="flex">
      <aside className="hidden md:block w-64 h-[85vh] bg-default-200 ">
        <p className="text-center text-2xl font-bold my-4">Vendor Panel</p>
        <Divider className="my-4" />
        <nav className="mt-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <p className="px-4 flex items-center py-2 hover:bg-default-400 transition">
                {item.icon} {item.name}
              </p>
            </Link>
          ))}
        </nav>
      </aside>

      <div
        className={`md:hidden absolute top-0 left-0 z-50 bg-default-200 w-64 transform transition-transform duration-300 ease-in-out overflow-y-auto`}
        style={{
          transform: isDrawerOpen ? "translateX(0)" : "translateX(-100%)",
          height: "100%",
        }}
      >
        <div className="flex items-center justify-between p-4">
          <span className="font-bold text-xl">Vendor Panel</span>
          <button className="text-xl focus:outline-none" onClick={toggleDrawer}>
            <FaTimes />
          </button>
        </div>
        <nav className="mt-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <p className="px-4 flex items-center py-2 hover:bg-default-400 transition">
                {item.icon} {item.name}
              </p>
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden bg-default-200 p-4 flex justify-between items-center">
          <span className="font-bold text-xl">Vendor Panel</span>
          <button className="text-xl focus:outline-none" onClick={toggleDrawer}>
            <FaBars />
          </button>
        </header>

        <main className="p-4 overflow-auto relative min-h-[50vh]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
