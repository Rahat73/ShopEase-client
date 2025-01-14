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
import { NavbarExtension } from "./navbar-extension";

import logo from "@/src/assets/images/logo.png";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { siteConfig } from "@/src/config/site";
import { getCurrentUser } from "@/src/services/auth-service";

export const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <div className="sticky top-0 z-40">
      <NextUINavbar
        maxWidth="full"
        position="sticky"
        className="pt-3 px-7 z-50"
      >
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

        <NavbarItem className="hidden md:flex basis-2/5">
          <SearchBar />
        </NavbarItem>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          {user?.role === "CUSTOMER" && (
            <>
              {siteConfig.navItemsCustomer?.map((item) => (
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
            </>
          )}
          {user?.role === "ADMIN" && (
            <>
              {siteConfig.navItemsAdmin?.map((item) => (
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
            </>
          )}
          {user?.role === "VENDOR" && (
            <>
              {siteConfig.navItemsVendor?.map((item) => (
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
            </>
          )}
          {/* {siteConfig.navItemsCommon?.map((item) => (
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
          ))} */}

          <ThemeSwitch />
          <NavbarItem>
            <AuthBtn />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          {/* <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link> */}
          <ThemeSwitch />
          <AuthBtn />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu className="z-50">
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {user?.role === "CUSTOMER" && (
              <>
                {siteConfig.navItemsCustomer.map((item, index) => (
                  <NavbarMenuItem key={`${item}-${index}`}>
                    <NextLink
                      href={item.href}
                      className="flex items-center space-x-3"
                    >
                      {item.icon &&
                        createElement(item.icon, {
                          size: 20,
                          className: "hover:opacity-80 text-default-600",
                        })}{" "}
                      <p className="hover:opacity-80 text-default-600">
                        {item.label}
                      </p>
                    </NextLink>
                  </NavbarMenuItem>
                ))}
              </>
            )}
            {user?.role === "ADMIN" && (
              <>
                {siteConfig.navItemsAdmin.map((item, index) => (
                  <NavbarMenuItem key={`${item}-${index}`}>
                    <NextLink
                      href={item.href}
                      className="flex items-center space-x-3"
                    >
                      {item.icon &&
                        createElement(item.icon, {
                          size: 20,
                          className: "hover:opacity-80 text-default-600",
                        })}{" "}
                      <p className="hover:opacity-80 text-default-600">
                        {item.label}
                      </p>
                    </NextLink>
                  </NavbarMenuItem>
                ))}
              </>
            )}
            {user?.role === "VENDOR" && (
              <>
                {siteConfig.navItemsVendor.map((item, index) => (
                  <NavbarMenuItem key={`${item}-${index}`}>
                    <NextLink
                      href={item.href}
                      className="flex items-center space-x-3"
                    >
                      {item.icon &&
                        createElement(item.icon, {
                          size: 20,
                          className: "hover:opacity-80 text-default-600",
                        })}{" "}
                      <p className="hover:opacity-80 text-default-600">
                        {item.label}
                      </p>
                    </NextLink>
                  </NavbarMenuItem>
                ))}
              </>
            )}
            {siteConfig.navItemsCommon.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <NextLink
                  href={item.href}
                  className="flex items-center space-x-3"
                >
                  {item.icon &&
                    createElement(item.icon, {
                      size: 20,
                      className: "hover:opacity-80 text-default-600",
                    })}{" "}
                  <p className="hover:opacity-80 text-default-600">
                    {item.label}
                  </p>
                </NextLink>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
      <div className="md:hidden pb-3 sticky top-0 bg-background z-10">
        <div className="w-10/12 mx-auto ">
          <SearchBar />
        </div>
      </div>
      <NavbarExtension />
    </div>
  );
};
