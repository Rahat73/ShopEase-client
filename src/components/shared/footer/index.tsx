"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaCcMastercard,
  FaCcStripe,
  FaCcVisa,
  FaFacebook,
  FaInstagram,
  FaMapPin,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import logo from "@/src/assets/images/logo.png";

const quickLinks = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
  {
    title: "Products",
    href: "/products",
  },
];
const quickLinks2 = [
  {
    title: "FAQs",
    href: "/faqs",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    title: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-default-50 py-8 mt-8">
      <div className="container px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image alt="ShopEase" height={40} src={logo} width={40} />
              <span className="text-xl font-bold">ShopEase</span>
            </div>
            <p className="text-default-600">
              Your one-stop destination for all your shopping needs. Quality
              products, trusted sellers, and excellent customer service.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-default-600 hover:text-primary transition-colors"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-default-600 hover:text-primary transition-colors"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-default-600 hover:text-primary transition-colors"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="#"
                className="text-default-600 hover:text-primary transition-colors"
              >
                <FaYoutube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex space-x-10">
              <ul className="space-y-2">
                {quickLinks.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-default-600 hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {quickLinks2.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-default-600 hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-default-600">
                <FaMapPin size={20} className="shrink-0 mt-1" />
                <span>123 Shopping Street, Fashion Avenue, FL 12345</span>
              </li>
              <li className="flex items-center gap-3 text-default-600">
                <FaPhone size={20} />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3 text-default-600">
                <MdEmail size={20} />
                <span>support@shopease.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-default-600 mb-4">
              Subscribe to our newsletter and get 10% off your first purchase.
            </p>
            <form className="space-y-2" onSubmit={handleSubscribe}>
              <Input
                type="email"
                placeholder="Enter your email"
                size="sm"
                endContent={
                  <Button isIconOnly size="sm" variant="light" type="submit">
                    <FaArrowRight size={16} />
                  </Button>
                }
              />
            </form>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-default-600 text-sm text-center md:text-left">
              © {new Date().getFullYear()} ShopEase. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <FaCcVisa size={20} />
              <FaCcMastercard size={20} />
              <FaCcStripe size={20} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
