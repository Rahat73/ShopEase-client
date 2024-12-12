"use client";

import { EmblaOptionsType } from "embla-carousel";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import { FaMinus, FaPlus } from "react-icons/fa6";

import { useFetchData } from "@/src/hooks/fetch.hook";
import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import Carousel from "@/src/components/carousel/carousel";
import { usePostData } from "@/src/hooks/mutation.hook";
import { ADD_TO_CART, GET_CART } from "@/src/api-endpoints/cart.api";
import ProductCard from "@/src/components/ui/product-card";
import { Product } from "@/src/types";
import {
  FOLLOW_VENDOR,
  GET_FOLLOWED_VENDORS,
} from "@/src/api-endpoints/follow.api";

const ProductDetailsPage = ({ params }: { params: { productId: string } }) => {
  const [quantity, setQuantity] = useState(1);
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  const router = useRouter();

  const { data, isLoading: productLoading } = useFetchData(
    `${GET_ALL_PRODUCTS}/${params.productId}`,
    undefined,
    () => !!params.productId
  );

  const { data: relatedProducts = [], isLoading: relatedProductsLoading } =
    useFetchData(
      GET_ALL_PRODUCTS,
      { categoryId: data?.categoryId },
      () => !!data
    );

  const { data: cartData, isLoading: cartLoading } = useFetchData(
    GET_CART,
    undefined,
    () => !!params.productId
  );

  const { mutate: addToCartMutation } = usePostData({
    invalidateQueries: [GET_CART],
  });

  const { data: followedVendors = [], isLoading: isFollowedLoading } =
    useFetchData(
      `${GET_FOLLOWED_VENDORS}`,
      undefined,
      () => !!params.productId
    );

  const { mutate } = usePostData({
    invalidateQueries: [GET_FOLLOWED_VENDORS],
  });

  if (
    productLoading ||
    cartLoading ||
    relatedProductsLoading ||
    isFollowedLoading
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const addToCart = () => {
    addToCartMutation({
      url: ADD_TO_CART,
      postData: {
        productId: params.productId,
        quantity,
      },
    });
  };

  const confirmAddToCart = () => {
    setIsWarningOpen(false);
    addToCart();
  };

  const handleAddToCart = () => {
    if (cartData && cartData.vendorId !== data.vendorId) {
      setIsWarningOpen(true);

      return;
    }

    addToCart();
  };

  const handleBuyNow = () => {
    router.push(
      `/user/order?productId=${params.productId}&quantity=${quantity}`
    );
  };

  const handleFollow = () => {
    mutate({
      url: `${FOLLOW_VENDOR}/${data.vendorId}`,
    });
  };

  const isVendorFollowed = followedVendors.find(
    (item: any) => item.vendorId === data.vendorId
  );

  const {
    name,
    description,
    price,
    discount,
    inventoryCount,
    soldCount,
    images,
    vendor,
    category,
  } = data;

  const OPTIONS: EmblaOptionsType = {};
  const SLIDES = images;

  const discountedPrice = (price - (price * discount) / 100).toFixed(2);

  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full h-full flex justify-center items-center">
            <Carousel slides={SLIDES} options={OPTIONS} />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{name}</h1>
            <p className="text-lg text-default-700 mb-2">{description}</p>

            <div className="flex items-center space-x-4 mb-4">
              <span className="text-2xl font-bold text-green-600">
                ${discountedPrice}
              </span>
              {discount > 0 && (
                <span className="text-lg line-through text-gray-500">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-default-600 mb-4 ">
              Discount:{" "}
              <span className="bg-red-600 rounded-full px-2 text-white">
                {discount}%
              </span>
            </p>

            <div className="flex items-center space-x-4 mb-4">
              <span className="text-default-600">
                In Stock: {inventoryCount}
              </span>
              <span className="text-default-600">Sold: {soldCount}</span>
            </div>

            <div className="mb-4">
              Vendor:
              <Link href={`/shop/${data.vendorId}`}>
                <p className="text-lg font-medium ml-2">{vendor?.shopName}</p>
              </Link>
            </div>

            <div className="mb-4">
              <p className="text-default-600">Category: {category?.name}</p>
            </div>

            <div className="flex items-center justify-between my-3">
              <div className="flex items-center space-x-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  isDisabled={quantity === 1}
                  onPress={() => setQuantity((prev) => prev - 1)}
                >
                  <FaMinus size={16} />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  isDisabled={quantity === data.inventoryCount}
                  onPress={() => setQuantity((prev) => prev + 1)}
                >
                  <FaPlus size={16} />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button radius="full" color="default" onPress={handleAddToCart}>
                Add to cart
              </Button>
              <Button radius="full" color="success" onPress={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
          <p className="text-default-600">
            This product is brought to you by our trusted vendor,{" "}
            <strong>
              <Link href={`/shop/${data.vendorId}`}>{vendor.shopName}</Link>
            </strong>
            , specializing in high-quality products,{" "}
            {discount > 10 && `with a attractive discount of ${discount}%`}.{" "}
            {inventoryCount < 100 &&
              `Only ${inventoryCount} left in stock! So Hurry Up!`}
          </p>
        </div>

        <Card
          isPressable
          className="max-w-md mx-auto mt-10 p-2"
          onPress={() => router.push(`/shop/${data.vendorId}`)}
        >
          <CardHeader className="justify-between space-x-10">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={vendor.shopLogo}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {vendor.shopName}
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  Vendor
                </h5>
              </div>
            </div>
            <Button
              className="text-tiny"
              color={isVendorFollowed ? "default" : "primary"}
              radius="full"
              size="sm"
              variant="shadow"
              onPress={handleFollow}
            >
              {isVendorFollowed ? "Unfollow" : "Follow"}
            </Button>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-500">
            <p className="mb-2">Address: {vendor.address}</p>
            <p>Phone: {vendor.phone}</p>
          </CardBody>
          {/* <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-500 text-small">4.8</p>
            <p className=" text-default-500 text-small">Rating</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-500 text-small">24</p>
            <p className="text-default-500 text-small">Reviews</p>
          </div>
        </CardFooter> */}
        </Card>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {relatedProducts.map((product: Product) => {
              if (product.id !== data.id) {
                return <ProductCard key={product.id} product={product} />;
              }
            })}
          </div>
        </div>
      </div>
      <Modal
        backdrop="blur"
        aria-labelledby="modal-title"
        isOpen={isWarningOpen}
        onClose={() => setIsWarningOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Vendor Conflict</ModalHeader>
          <ModalBody>
            The product you are trying to add to your cart belongs to a
            different vendor. Do you want to continue?
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setIsWarningOpen(false)}>Cancel</Button>
            <Button color="danger" onPress={confirmAddToCart}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductDetailsPage;
