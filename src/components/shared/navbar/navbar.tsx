import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { createElement } from "react";
import { Tooltip } from "@nextui-org/react";

import AuthBtn from "./auth-btn";
import SearchBar from "./search-bar";

import logo from "@/src/assets/images/logo.png";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { siteConfig } from "@/src/config/site";

export const Navbar = () => {
  return (
    <div className="py-3">
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Image alt="ShopEase" height={40} src={logo} width={40} />
              <p className="font-bold text-inherit">ShopEase</p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarItem className="hidden md:flex w-6/12">
          <SearchBar />
        </NavbarItem>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          {siteConfig.navItems?.map((item) => (
            <NavbarItem key={item.href}>
              <Tooltip content={item.label} showArrow={true}>
                <NextLink
                  className={clsx(
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.icon &&
                    createElement(item.icon, {
                      size: 20,
                      className: "hover:opacity-80 text-default-600",
                    })}
                </NextLink>
              </Tooltip>
            </NavbarItem>
          ))}
          <ThemeSwitch />
          <NavbarItem className="hidden sm:flex">
            <AuthBtn />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          {/* <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link> */}
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
      <div className="md:hidden w-10/12 mx-auto">
        <SearchBar />
      </div>
    </div>
  );
};
