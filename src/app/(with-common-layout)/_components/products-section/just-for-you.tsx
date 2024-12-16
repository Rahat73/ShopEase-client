"use client";

import { Divider } from "@nextui-org/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

import ProductCard from "../../../../components/ui/product-card";

import { GET_PRODUCT_VENDOR_PRIORITY } from "@/src/api-endpoints/product.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { Product } from "@/src/types";
import ProductCardSkeleton from "@/src/components/ui/loading-contents/product-card-skeleton";

const JustForYou = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const limit = 10;

  const {
    data = [],
    meta,
    isFetching,
  } = useFetchData(GET_PRODUCT_VENDOR_PRIORITY, {
    page,
    limit,
  });

  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setProducts((prev) => {
        const newProducts = data.filter(
          (newProduct: Product) =>
            !prev.some((prevProduct) => prevProduct.id === newProduct.id)
        );

        return [...prev, ...newProducts];
      });
    }
    if (meta) {
      setHasMore(page * limit < meta.total);
    }
  }, [data]);

  // Function to fetch the next page
  const fetchMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="p-5 bg-default-100 rounded-lg shadow-lg min-h-[50vh]">
      <p className="text-2xl font-bold ">Just For You</p>
      <Divider className="my-4" />

      {isFetching && products.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={
            <h4 style={{ textAlign: "center", marginTop: "1rem" }}>
              Loading more products...
            </h4>
          }
          endMessage={
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              No more products to load.
            </p>
          }
          scrollThreshold={0.95}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((item: Product) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default JustForYou;
