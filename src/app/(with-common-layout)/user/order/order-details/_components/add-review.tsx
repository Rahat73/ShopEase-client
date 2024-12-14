import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { MdRateReview } from "react-icons/md";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@nextui-org/input";

import { GET_ORDERS } from "@/src/api-endpoints/order.api";
import AppForm from "@/src/components/form/app-form";
import AppTextarea from "@/src/components/form/app-textarea";
import { usePostData } from "@/src/hooks/mutation.hook";
import { ADD_REVIEW } from "@/src/api-endpoints/review.api";
import { Review } from "@/src/types";

const AddReview = ({
  orderId,
  productId,
  review,
}: {
  orderId: string;
  productId: string;
  review: Review | undefined;
}) => {
  const [rating, setRating] = useState(4.5);

  const { mutateAsync: addReview, isPending } = usePostData({
    invalidateQueries: [GET_ORDERS + "/" + orderId],
  });

  const handleAddReview: SubmitHandler<FieldValues> = async (data) => {
    const res = await addReview({
      url: ADD_REVIEW,
      postData: {
        orderId,
        productId,
        review: {
          rating,
          comment: data.comment,
        },
      },
    });

    if (typeof res === "string" && res === "Duplicate Key error") {
      toast.error("Review already submitted.");
    }
  };

  return (
    <div className="col-span-1">
      {review ? (
        <>
          {/* @ts-expect-error there is a version miss-match in the source */}
          <Rating
            readonly
            fractions={10}
            initialRating={review.rating}
            emptySymbol={<FaRegStar className="text-green-600 text-2xl" />}
            fullSymbol={<FaStar className="text-green-600 text-2xl" />}
          />
          <Textarea
            readOnly
            defaultValue={review.comment || ""}
            label="Review"
            className="my-3"
          />
        </>
      ) : (
        <AppForm reset={false} onSubmit={handleAddReview}>
          {/* @ts-expect-error there is a version miss-match in the source */}
          <Rating
            initialRating={rating}
            start={0}
            stop={5}
            fractions={10}
            emptySymbol={<FaRegStar className="text-green-600 text-2xl" />}
            fullSymbol={<FaStar className="text-green-600 text-2xl" />}
            onChange={setRating}
          />
          <div className="my-3">
            <AppTextarea name="comment" label="Review" />
          </div>
          <Button
            type="submit"
            color="primary"
            className="my-3"
            isLoading={isPending}
            startContent={<MdRateReview />}
          >
            Add Review
          </Button>
        </AppForm>
      )}
    </div>
  );
};

export default AddReview;
