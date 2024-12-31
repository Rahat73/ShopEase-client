import {
  MdBolt,
  MdDashboard,
  MdOutlineCompare,
  MdOutlineHistory,
  MdPerson,
  MdPreview,
  MdShoppingBag,
  MdShoppingCart,
  MdStore,
} from "react-icons/md";
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ShopEase",
  description: "Make beautiful websites regardless of your design experience.",
  navItemsCustomer: [
    {
      label: "Profile",
      icon: MdPerson,
      href: "/user/profile",
    },
    {
      label: "Order History",
      icon: MdOutlineHistory,
      href: "/user/order/order-history",
    },
    {
      label: "Cart",
      icon: MdShoppingCart,
      href: "/user/cart",
    },
    {
      label: "Recently Viewed",
      icon: MdPreview,
      href: "/user/recently-viewed",
    },
  ],
  navItemsAdmin: [
    {
      label: "Dashboard",
      icon: MdDashboard,
      href: "/admin/dashboard",
    },
  ],
  navItemsVendor: [
    {
      label: "Dashboard",
      icon: MdDashboard,
      href: "/vendor/dashboard",
    },
  ],
  navItemsCommon: [
    {
      label: "Products",
      icon: MdShoppingBag,
      href: "/products",
    },
    {
      label: "Flash Sell",
      icon: MdBolt,
      href: "/flash-sell",
    },
    {
      label: "Shops",
      icon: MdStore,
      href: "/shop",
    },
    {
      label: "Compare",
      icon: MdOutlineCompare,
      href: "/compare",
    },
  ],
  links: {
    // github: "https://github.com/nextui-org/nextui",
    // twitter: "https://twitter.com/getnextui",
    // docs: "https://nextui.org",
    // discord: "https://discord.gg/9b6yyZKmH4",
    // sponsor: "https://patreon.com/jrgarciadev",
  },
};
