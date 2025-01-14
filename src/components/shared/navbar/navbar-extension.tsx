"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Tooltip,
} from "@nextui-org/react";
import { MdArrowDropDown } from "react-icons/md";

import { siteConfig } from "@/src/config/site";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { GET_ALL_CATEGORIES } from "@/src/api-endpoints/category.api";
import { Category } from "@/src/types";

export function NavbarExtension() {
  const [hide, setHide] = useState(false);

  const handleHideNavbar = (value: number) => {
    if (value > 300) {
      setHide(true);
    } else {
      setHide(false);
    }
  };

  const { data = [], isLoading } = useFetchData(GET_ALL_CATEGORIES);

  return (
    <Navbar
      shouldHideOnScroll={hide}
      maxWidth="full"
      className="px-7 bg-default-50 top-0 sticky z-40 hidden sm:flex"
      onScrollPositionChange={handleHideNavbar}
    >
      <NavbarContent className="gap-4">
        {siteConfig.navItemsCommon?.map((item) => (
          <NavbarItem key={item.href}>
            <Link color="foreground" href={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}

        <Tooltip
          showArrow
          size="lg"
          placement="bottom-start"
          content={
            isLoading ? (
              <div>Loading...</div>
            ) : (
              <ul className="list-none px-5 py-2 m-0">
                {data.map((category: Category) => (
                  <li key={category.id} className="mb-2">
                    <Link
                      color="foreground"
                      href={`/products?categoryId=${category.id}&categoryName=${category.name}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )
          }
        >
          <NavbarItem>
            <Link color="foreground" href="#" className="cursor-pointer">
              Categories <MdArrowDropDown />
            </Link>
          </NavbarItem>
        </Tooltip>
      </NavbarContent>
    </Navbar>
  );
}
