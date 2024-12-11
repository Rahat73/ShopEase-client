"use server";

import axiosInstance from "../lib/axios-instance";

export const postService = async (
  url: string,
  postData?: Record<string, any>
) => {
  try {
    const { data } = await axiosInstance.post(url, postData);

    return data;
  } catch (error: any) {
    return error?.response?.data?.message;
  }
};

export const updateService = async (
  url: string,
  postData?: Record<string, any>
) => {
  try {
    const { data } = await axiosInstance.patch(url, postData);

    return data;
  } catch (error: any) {
    return error?.response?.data?.message;
  }
};

export const deleteService = async (url: string) => {
  try {
    const { data } = await axiosInstance.delete(url);

    return data;
  } catch (error: any) {
    return error?.response?.data?.message;
  }
};
