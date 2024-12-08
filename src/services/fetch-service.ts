"use server";

import axiosInstance from "../lib/axios-instance";

const fetchService = async (
  url: string,
  queryParams: Record<string, any> | undefined
) => {
  try {
    const { data } = await axiosInstance.get(url, {
      params: queryParams,
    });

    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export default fetchService;
