"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import {
  FaBagShopping,
  FaHeart,
  FaMapPin,
  FaPeopleGroup,
  FaPhone,
} from "react-icons/fa6";
import { formatDate } from "date-fns";

import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_VENDOR_PRIORITY,
} from "@/src/api-endpoints/product.api";
import { GET_VENDORS } from "@/src/api-endpoints/user.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { noImg } from "@/src/constants";
import ProductCard from "@/src/components/ui/product-card";
import { Product } from "@/src/types";
import { usePostData } from "@/src/hooks/mutation.hook";
import {
  FOLLOW_VENDOR,
  GET_FOLLOWED_VENDORS,
} from "@/src/api-endpoints/follow.api";
import ProductCardSkeleton from "@/src/components/ui/loading-contents/product-card-skeleton";

const ShopPage = ({ params }: { params: { vendorId: string } }) => {
  const { vendorId } = params;
  const {
    data: vendorData,
    isLoading: isVendorLoading,
    refetch,
  } = useFetchData(`${GET_VENDORS}/${vendorId}`, undefined, () => !!vendorId);

  const { data: productData, isLoading: isProductLoading } = useFetchData(
    GET_ALL_PRODUCTS,
    { vendorId },
    () => !!vendorId
  );

  const { data: followedVendors = [], isLoading: isFollowedLoading } =
    useFetchData(GET_FOLLOWED_VENDORS, undefined, () => !!vendorId);

  const { mutateAsync, isPending } = usePostData({
    invalidateQueries: [
      GET_FOLLOWED_VENDORS,
      `${GET_VENDORS}/${vendorId}`,
      GET_PRODUCT_VENDOR_PRIORITY,
    ],
  });

  const handleFollow = async () => {
    const res = await mutateAsync({
      url: `${FOLLOW_VENDOR}/${vendorId}`,
    });

    if (res?.success) {
      refetch();
    }
  };

  const isVendorFollowed = followedVendors.find(
    (item: any) => item.vendorId === vendorId
  );

  if (isVendorLoading || isProductLoading || isFollowedLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="rounded-lg">
          <div className="h-40 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {[...Array(8)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar
              isBordered
              src={vendorData.shopLogo || noImg}
              className="w-24 h-24 text-large"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">{vendorData.shopName}</h1>
              <p className="text-default-600 mt-1">
                {vendorData.shopDescription}
              </p>
              <p className="text-default-600 mt-1">
                Join Date: {formatDate(vendorData.createdAt, "dd MMM, yyyy")}
              </p>
            </div>
          </div>
          <Button
            color={isVendorFollowed ? "default" : "primary"}
            variant="shadow"
            className="mt-4 sm:mt-0"
            startContent={<FaHeart size={18} />}
            isLoading={isPending}
            onPress={handleFollow}
          >
            {isVendorFollowed ? "Unfollow" : "Follow"}
          </Button>
        </CardHeader>
        <CardBody className="flex flex-col sm:flex-row justify-between items-center p-6 bg-default-100">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <FaMapPin size={18} />
            <p>{vendorData.address}</p>
          </div>
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <FaPeopleGroup size={18} />
            <p>Followers: {vendorData.follow.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaBagShopping size={18} />
            <p>Products: {productData.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone size={18} />
            <p>{vendorData.phone}</p>
          </div>
        </CardBody>
      </Card>

      <Divider className="my-8" />

      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {productData.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
