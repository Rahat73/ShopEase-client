"use client";

import { Divider } from "@nextui-org/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

import ProductCard from "../../../../components/ui/product-card";

import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { Product } from "@/src/types";

const ProductsSection = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const limit = 10;

  const { data = [], meta } = useFetchData(GET_ALL_PRODUCTS, {
    page,
    limit,
  });

  useEffect(() => {
    if (data.length > 0) {
      setProducts((prev) => [...prev, ...data]);
    }
    if (meta?.total) {
      if (page * limit < meta.total) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
  }, [meta]);

  // Function to fetch the next page
  const fetchMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="p-5 bg-default-100 rounded-lg shadow-lg">
      <p className="text-2xl font-bold ">Just For You</p>
      <Divider className="my-4" />

      <InfiniteScroll
        dataLength={data.length}
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {products.map((item: Product) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ProductsSection;
