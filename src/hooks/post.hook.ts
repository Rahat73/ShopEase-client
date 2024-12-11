import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import postService from "../services/post-service";

type TPostMutation = {
  url: string;
  postData: Record<string, any>;
};

export const usePostData = ({
  invalidateQueries = [],
  doNotShowNotification = false,
}: {
  invalidateQueries: string[];
  doNotShowNotification?: boolean;
}) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, TPostMutation>({
    mutationFn: async ({ url, postData }) => await postService(url, postData),
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: invalidateQueries });
      } else if (!doNotShowNotification) {
        toast.error(data.message);
      }
    },
    onError: (error: any) => {
      if (!doNotShowNotification) {
        toast.error(error.message);
      }
    },
  });
};
