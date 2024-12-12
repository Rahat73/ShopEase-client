import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  deleteService,
  postService,
  updateService,
} from "../services/mutation-service";

type TPostMutation = {
  url: string;
  postData?: Record<string, any>;
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
      if (data === "invalid signature") {
        toast.error("Please login.");

        return;
      }
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: invalidateQueries });
        if (!doNotShowNotification) {
          toast.success(data.message);
        }
      } else if (!doNotShowNotification) {
        toast.error(data.message);
      }
    },
    onError: (error: any) => {
      console.log(error);
      if (!doNotShowNotification) {
        toast.error(error.message);
      }
    },
  });
};

export const useUpdateData = ({
  invalidateQueries = [],
  doNotShowNotification = false,
}: {
  invalidateQueries: string[];
  doNotShowNotification?: boolean;
}) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, TPostMutation>({
    mutationFn: async ({ url, postData }) => await updateService(url, postData),
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: invalidateQueries });
        if (!doNotShowNotification) {
          toast.success(data.message);
        }
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

export const useDeleteData = ({
  invalidateQueries = [],
  doNotShowNotification = false,
}: {
  invalidateQueries: string[];
  doNotShowNotification?: boolean;
}) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, TPostMutation>({
    mutationFn: async ({ url }) => await deleteService(url),
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: invalidateQueries });
        if (!doNotShowNotification) {
          toast.success(data.message);
        }
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
