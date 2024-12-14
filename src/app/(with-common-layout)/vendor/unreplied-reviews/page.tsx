"use client";

import { Divider, Card, CardBody, Image } from "@nextui-org/react";
import {
  FaStar,
  FaCommentAlt,
  FaBox,
  FaCalendarAlt,
  FaUser,
  FaRegStar,
} from "react-icons/fa";
import { format } from "date-fns";
import Rating from "react-rating";

import AddReply from "./_components/add-reply";

import { GET_UNREPLIED_REVIEWS } from "@/src/api-endpoints/review.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { Review } from "@/src/types";
import { noImg } from "@/src/constants";

const UnrepliedReviews = () => {
  const { data: reviews = [], isLoading } = useFetchData(
    GET_UNREPLIED_REVIEWS
  ) as { data: Review[]; isLoading: boolean };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="my-1 max-w-4xl mx-auto">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Reviews</p>
      </div>
      <Divider className="my-4" />

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          No unreplied reviews at the moment.
        </p>
      ) : (
        reviews.map((review) => (
          <Card key={review.id} className="mb-6 shadow-lg">
            <CardBody className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Image
                    src={review.product.images[0] || noImg}
                    alt={review.product.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold my-2">
                      {review.product.name}
                    </h3>
                    <p className="text-default-600 mb-2 flex items-center">
                      <FaBox className="mr-2" /> Order ID: {review.order.id}
                    </p>
                    <p className="text-default-600 mb-2 flex items-center">
                      <FaCalendarAlt className="mr-2" /> Order Date:{" "}
                      {format(new Date(review.order.createdAt), "MMMM d, yyyy")}
                    </p>
                    <p className="text-default-600 mb-4 flex items-center">
                      <FaUser className="mr-2" /> {review.customer.name}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <span className="mr-2">Rating:</span>
                      {/* @ts-expect-error there is a version miss-match in the source */}
                      <Rating
                        readonly
                        initialRating={review.rating}
                        emptySymbol={
                          <FaRegStar className="text-green-600 text-2xl" />
                        }
                        fullSymbol={
                          <FaStar className="text-green-600 text-2xl" />
                        }
                      />
                    </div>
                  </div>

                  <div className="bg-default-300 p-4 rounded-lg mb-4">
                    <p className=" flex items-start">
                      <FaCommentAlt className="mr-2 mt-1 flex-shrink-0" />
                      {review.comment}
                    </p>
                  </div>
                  <AddReply reviewId={review.id} />
                </div>
              </div>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
};

export default UnrepliedReviews;
