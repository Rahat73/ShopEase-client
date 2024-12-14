"use client";

import { Card, CardBody, Avatar } from "@nextui-org/react";
import {
  FaStar,
  FaRegStar,
  FaCalendarAlt,
  FaComment,
  FaReply,
} from "react-icons/fa";
import { format } from "date-fns";
import Rating from "react-rating";

import { GET_PRODUCT_REVIEWS } from "@/src/api-endpoints/review.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { Review } from "@/src/types";
import { noImg } from "@/src/constants";

const ProductReviews = ({ productId }: { productId: string }) => {
  const { data: reviews = [], isLoading } = useFetchData(
    GET_PRODUCT_REVIEWS + "/" + productId
  ) as {
    data: Review[];
    isLoading: boolean;
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-4">No reviews yet for this product.</div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <Card key={review.id} className="w-full">
          <CardBody className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar
                src={review.customer.profilePhoto || noImg}
                alt={review.customer.name}
                className="w-12 h-12"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">
                    {review.customer.name}
                  </h3>
                  <div className="flex items-center">
                    {/* @ts-expect-error there is a version miss-match in the source */}
                    <Rating
                      readonly
                      initialRating={review.rating}
                      fractions={10}
                      emptySymbol={
                        <FaRegStar className="text-green-600 text-2xl" />
                      }
                      fullSymbol={
                        <FaStar className="text-green-600 text-2xl" />
                      }
                    />
                  </div>
                </div>
                <p className="text-sm text-default-500 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  {format(new Date(review.createdAt), "MMMM d, yyyy")}
                </p>
                <p className="mb-4 flex items-start">
                  <FaComment className="mr-2 mt-1 flex-shrink-0" />
                  {review.comment}
                </p>
                {review.reviewReply && (
                  <div className="bg-default-100 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2 flex items-center">
                      <FaReply className="mr-2" />
                      Vendor&apos;s Reply
                    </p>
                    <p className="text-sm">{review.reviewReply?.content}</p>
                    <p className="text-xs text-default-500 mt-2">
                      {format(
                        new Date(review.reviewReply.createdAt),
                        "MMMM d, yyyy 'at' h:mm a"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ProductReviews;
