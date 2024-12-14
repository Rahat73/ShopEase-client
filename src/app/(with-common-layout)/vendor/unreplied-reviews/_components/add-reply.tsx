import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { FaReply } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ADD_REVIEW_REPLY,
  GET_UNREPLIED_REVIEWS,
} from "@/src/api-endpoints/review.api";
import AppForm from "@/src/components/form/app-form";
import AppTextarea from "@/src/components/form/app-textarea";
import { usePostData } from "@/src/hooks/mutation.hook";
import { addReplyValidationSchema } from "@/src/schemas/review.schema";

const AddReply = ({ reviewId }: { reviewId: string }) => {
  const { mutate: addReply, isPending } = usePostData({
    invalidateQueries: [GET_UNREPLIED_REVIEWS],
  });

  const handleAddReply: SubmitHandler<FieldValues> = (data) => {
    addReply({
      url: ADD_REVIEW_REPLY,
      postData: {
        ...data,
        reviewId,
      },
    });
  };

  return (
    <AppForm
      resolver={zodResolver(addReplyValidationSchema)}
      onSubmit={handleAddReply}
    >
      <AppTextarea
        name="content"
        label="Your reply"
        placeholder="Type your response here"
      />
      <Button
        className="mt-4"
        color="primary"
        endContent={<FaReply />}
        type="submit"
        isLoading={isPending}
      >
        Send Reply
      </Button>
    </AppForm>
  );
};

export default AddReply;
