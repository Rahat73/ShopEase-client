import { useQuery } from "@tanstack/react-query";

import fetchService from "../services/fetch-service";

export const useFetchData = (
  url: string,
  queryParams?: Record<string, any>
) => {
  const { data, isLoading, refetch, isSuccess, isFetching } = useQuery({
    queryKey: [url, queryParams],
    queryFn: async () => await fetchService(url, queryParams),
  });

  return {
    data: data?.data,
    meta: data?.meta,
    isLoading,
    refetch,
    isSuccess,
    isFetching,
  };
};
