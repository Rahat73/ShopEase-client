"use client";

import { EmblaOptionsType } from "embla-carousel";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import { FaMinus, FaPlus } from "react-icons/fa6";

import ProductReviews from "./_component/product-reviews";

import { useFetchData } from "@/src/hooks/fetch.hook";
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_VENDOR_PRIORITY,
} from "@/src/api-endpoints/product.api";
import Carousel from "@/src/components/carousel/carousel";
import { usePostData } from "@/src/hooks/mutation.hook";
import { ADD_TO_CART, GET_CART } from "@/src/api-endpoints/cart.api";
import ProductCard from "@/src/components/ui/product-card";
import { Product } from "@/src/types";
import {
  FOLLOW_VENDOR,
  GET_FOLLOWED_VENDORS,
} from "@/src/api-endpoints/follow.api";
import ProductDetailsSkeleton from "@/src/components/ui/loading-contents/product-details-skeleton";
import { noImg } from "@/src/constants";
import VendorCardSkeleton from "@/src/components/ui/loading-contents/vendor-card-skeleton";
import ProductCardSkeleton from "@/src/components/ui/loading-contents/product-card-skeleton";
import { ADD_RECENT_PRODUCT } from "@/src/api-endpoints/recent-product.api";

const ProductDetailsPage = ({ params }: { params: { productId: string } }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [quantity, setQuantity] = useState(1);
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  const router = useRouter();

  const { data = {}, isLoading: productLoading } = useFetchData(
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

  const { mutate } = usePostData({
    invalidateQueries: [GET_ALL_PRODUCTS],
    doNotShowNotification: true,
  });

  useEffect(() => {
    mutate({
      url: ADD_RECENT_PRODUCT,
      postData: {
        productId: params.productId,
      },
    });
  }, [params.productId]);

  const { mutate: addToCartMutation, isPending } = usePostData({
    invalidateQueries: [GET_CART],
  });

  const {
    data: followedVendors = [],
    isLoading: isFollowedLoading,
    isFetching: isFollowedFetching,
    refetch,
  } = useFetchData(GET_FOLLOWED_VENDORS, undefined, () => !!params.productId);

  const { mutateAsync: followVendor, isPending: isVendorFollowPending } =
    usePostData({
      invalidateQueries: [GET_FOLLOWED_VENDORS, GET_PRODUCT_VENDOR_PRIORITY],
    });

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

  const handleFollow = async () => {
    const res = await followVendor({
      url: `${FOLLOW_VENDOR}/${data.vendorId}`,
    });

    if (res.success) {
      refetch();
    }
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
  } = data || {};

  const OPTIONS: EmblaOptionsType = {};
  const SLIDES = images;

  const discountedPrice = (price - (price * discount) / 100).toFixed(2);

  return (
    <>
      <div className="container mx-auto px-4 py-10">
        {productLoading ? (
          <ProductDetailsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full h-full flex justify-center items-center">
              {SLIDES?.length === 0 ? (
                <Image
                  src={noImg}
                  width={500}
                  height={500}
                  className="object-cover"
                  alt="Product Image"
                />
              ) : (
                <Carousel slides={SLIDES} options={OPTIONS} />
              )}
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
                <Button
                  radius="full"
                  color="default"
                  isLoading={isPending}
                  isDisabled={cartLoading}
                  onPress={handleAddToCart}
                >
                  Add to cart
                </Button>
                <Button radius="full" color="success" onPress={handleBuyNow}>
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        )}

        <Divider className="my-10" />

        <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {isFollowedLoading || productLoading ? (
              <VendorCardSkeleton />
            ) : (
              <Card
                isPressable
                className="max-w-md mx-auto mt-10 p-2"
                onPress={() => router.push(`/shop/${data?.vendorId}`)}
              >
                <CardHeader className="justify-between space-x-10">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src={vendor?.shopLogo}
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        {vendor?.shopName}
                      </h4>
                      <h5 className="text-small tracking-tight text-default-400">
                        Vendor
                      </h5>
                    </div>
                  </div>
                  <Button
                    isLoading={isVendorFollowPending || isFollowedFetching}
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
                  <p>Address: {vendor?.address}</p>
                  <p>Phone: {vendor?.phone}</p>
                </CardBody>
              </Card>
            )}

            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">
                Additional Information
              </h2>
              {productLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-3/2 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>
              ) : (
                <p className="text-default-600">
                  This product is brought to you by our trusted vendor,{" "}
                  <strong>
                    <Link href={`/shop/${data?.vendorId}`}>
                      {vendor?.shopName}
                    </Link>
                  </strong>
                  , specializing in high-quality products,{" "}
                  {discount > 10 &&
                    `with a attractive discount of ${discount}%`}
                  .{" "}
                  {inventoryCount < 100 &&
                    `Only ${inventoryCount} left in stock! So Hurry Up!`}
                </p>
              )}
            </div>
          </div>
          <div className="mt-10 border-l-3 pl-3">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <ProductReviews productId={data?.id} />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {relatedProductsLoading ? (
              <ProductCardSkeleton />
            ) : !relatedProducts?.length ? (
              <div className="">No related products to show</div>
            ) : (
              <>
                {relatedProducts.map((product: Product) => {
                  if (product.id !== data?.id) {
                    return <ProductCard key={product?.id} product={product} />;
                  }
                })}
              </>
            )}
          </div>
        </div>
      </div>

      <Modal
        backdrop="blur"
        aria-labelledby="modal-title"
        isOpen={isWarningOpen}
        classNames={{
          closeButton: "right-2 top-2",
        }}
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
