"use client";

import { ReactNode, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import {
  MdCategory,
  MdListAlt,
  MdOutlineDashboard,
  MdPeople,
} from "react-icons/md";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <MdOutlineDashboard size={20} className="mr-3" />,
    },
    {
      name: "Manage Users",
      href: "/admin/manage-users",
      icon: <MdPeople size={20} className="mr-3" />,
    },
    {
      name: "Manage Categories",
      href: "/admin/manage-categories",
      icon: <MdCategory size={20} className="mr-3" />,
    },
    {
      name: "Order History",
      href: "/admin/order-history",
      icon: <MdListAlt size={20} className="mr-3" />,
    },
  ];

  return (
    <div className="flex h-[85vh]">
      <aside className="hidden md:block w-64   bg-default-200 ">
        <p className="text-center text-2xl font-bold my-4">Admin Panel</p>
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
          <span className="font-bold text-xl">Admin Panel</span>
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
          <span className="font-bold text-xl">Admin Panel</span>
          <button className="text-xl focus:outline-none" onClick={toggleDrawer}>
            <FaBars />
          </button>
        </header>

        <main className="p-4 overflow-auto relative">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
