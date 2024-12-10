"use client";

import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import { useFetchData } from "@/src/hooks/fetch.hook";

const ProductDetailsPage = ({ params }: { params: { productId: string } }) => {
  console.log(params.productId);

  const { data } = useFetchData(
    `${GET_ALL_PRODUCTS}/${params.productId}`,
    undefined,
    () => !!params.productId
  );

  console.log(data);

  return <div />;
};

export default ProductDetailsPage;
