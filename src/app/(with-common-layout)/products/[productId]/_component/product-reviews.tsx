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
import ReviewCardSkeleton from "@/src/components/ui/loading-contents/review-card-skeleton";

const ProductReviews = ({ productId }: { productId: string }) => {
  const { data: reviews = [], isLoading } = useFetchData(
    GET_PRODUCT_REVIEWS + "/" + productId
  ) as {
    data: Review[];
    isLoading: boolean;
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <ReviewCardSkeleton />
      ) : reviews.length === 0 ? (
        <div className="text-center py-4">No reviews yet for this product.</div>
      ) : (
        <>
          {reviews.map((review) => (
            <Card key={review.id} className="w-full">
              <CardBody className="p-3">
                <div className="flex items-start space-x-4">
                  <Avatar
                    src={review.customer.profilePhoto || noImg}
                    alt={review.customer.name}
                    className="w-8 h-8"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{review.customer.name}</h3>
                      <div className="flex items-center">
                        {/* @ts-expect-error there is a version miss-match in the source */}
                        <Rating
                          readonly
                          initialRating={review.rating}
                          fractions={10}
                          emptySymbol={
                            <FaRegStar className="text-green-600 text-lg" />
                          }
                          fullSymbol={
                            <FaStar className="text-green-600 text-lg" />
                          }
                        />
                      </div>
                    </div>
                    <p className="text-tiny text-default-500 mb-2 flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      {format(new Date(review.createdAt), "MMMM d, yyyy")}
                    </p>
                    <p className="mb-2 flex items-start">
                      <FaComment className="mr-2 mt-1 flex-shrink-0" />
                      {review.comment}
                    </p>
                    {review.reviewReply && (
                      <div className="bg-default-100 p-2 rounded-lg">
                        <div className="flex justify-between">
                          <p className="text-sm font-semibold mb-2 flex items-center">
                            <FaReply className="mr-2" />
                            Vendor&apos;s Reply
                          </p>
                          <p className="text-xs text-default-500">
                            {format(
                              new Date(review.reviewReply.createdAt),
                              "MMMM d, yyyy"
                            )}
                          </p>
                        </div>
                        <p className="text-sm">{review.reviewReply?.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default ProductReviews;
