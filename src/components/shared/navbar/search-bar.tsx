"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { MdOutlineClear } from "react-icons/md";

import { SearchIcon } from "../../icons";

import { useFetchData } from "@/src/hooks/fetch.hook";
import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import { Product } from "@/src/types";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    // Cleanup function to cancel the timeout if the user types again
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data = [] } = useFetchData(
    GET_ALL_PRODUCTS,
    {
      searchTerm: debouncedSearchTerm,
    },
    () => debouncedSearchTerm.length > 0
  );

  return (
    <div className="w-full">
      <Autocomplete
        fullWidth
        isClearable
        size="lg"
        defaultItems={data}
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        endContent={
          <>
            <MdOutlineClear
              className="rounded-full mr-4 cursor-pointer"
              onClick={() => router.push("/products")}
            />

            <Button
              size="sm"
              variant="solid"
              color="success"
              onPress={() => router.push(`/products?searchTerm=${searchTerm}`)}
            >
              <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />{" "}
              Search
            </Button>
          </>
        }
        onInputChange={setSearchTerm}
      >
        {(product: Product) => (
          <AutocompleteItem key={product.id}>{product.name}</AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default SearchBar;
