"use server";

import axiosInstance from "../lib/axios-instance";

const postService = async (url: string, postData: Record<string, any>) => {
  try {
    const { data } = await axiosInstance.post(url, postData);

    return data;
  } catch (error: any) {
    return error?.response?.data?.message;
  }
};

export default postService;
