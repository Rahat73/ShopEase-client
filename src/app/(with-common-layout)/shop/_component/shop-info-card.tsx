"use client";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaBagShopping, FaMapPin } from "react-icons/fa6";
import { useEffect, useState } from "react";

import { usePostData } from "@/src/hooks/mutation.hook";
import {
  FOLLOW_VENDOR,
  GET_FOLLOWED_VENDORS,
} from "@/src/api-endpoints/follow.api";
import { useFetchData } from "@/src/hooks/fetch.hook";

export interface ShopInfo {
  id: string;
  shopName: string;
  shopLogo: string;
  address: string;
  _count: { product: number };
}

export default function ShopInfoCard({ shop }: { shop: ShopInfo }) {
  const router = useRouter();

  const [following, setFollowing] = useState(false);

  const { data: followedVendors = [], isLoading: isFollowedLoading } =
    useFetchData(GET_FOLLOWED_VENDORS);

  const { mutateAsync: followVendor, isPending: isVendorFollowPending } =
    usePostData({
      invalidateQueries: [GET_FOLLOWED_VENDORS],
    });

  const handleFollow = async () => {
    const res = await followVendor({
      url: `${FOLLOW_VENDOR}/${shop.id}`,
    });

    if (res?.success) {
      setFollowing(!following);
    }
  };

  useEffect(() => {
    const isVendorFollowed = followedVendors.find(
      (item: any) => item.vendorId === shop.id
    );

    setFollowing(!!isVendorFollowed);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto bg-default-100 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center">
        <div className="w-1/4 relative">
          <Image
            src={shop.shopLogo}
            alt={shop.shopName}
            className="rounded-l-lg object-cover"
          />
        </div>
        <div className="w-3/4 p-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-lg font-semibold text-default-800">
                {shop.shopName}
              </h2>
              <p className="text-xs text-default-600 flex items-center">
                <FaMapPin size={12} className="mr-1" />
                {shop.address}
              </p>
            </div>
            <Button
              isLoading={isVendorFollowPending || isFollowedLoading}
              className="text-tiny"
              color={following ? "default" : "primary"}
              radius="full"
              size="sm"
              variant="shadow"
              onPress={handleFollow}
            >
              {following ? "Unfollow" : "Follow"}
            </Button>
          </div>
          <div className="flex items-center text-xs text-default-500">
            <FaBagShopping size={14} className="mr-1" />
            <span>{shop._count.product} Products</span>
          </div>
          <button
            // size="sm"
            // variant="light"
            className="mt-2 group underline underline-offset-4 text-tiny flex items-center"
            onClick={() => router.push(`/shop/${shop.id}`)}
          >
            View Shop
            <FaArrowRight
              size={12}
              className="ml-1 group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
