"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { Link } from "@nextui-org/link";

import { Product } from "@/src/types";
import { noImg } from "@/src/constants";
import { usePostData } from "@/src/hooks/mutation.hook";
import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import { ADD_RECENT_PRODUCT } from "@/src/api-endpoints/recent-product.api";
import { ADD_TO_CART, GET_CART } from "@/src/api-endpoints/cart.api";
import { useFetchData } from "@/src/hooks/fetch.hook";

const ProductCard = ({ product }: { product: Product }) => {
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  const { mutate } = usePostData({
    invalidateQueries: [GET_ALL_PRODUCTS],
    doNotShowNotification: true,
  });

  const handleClick = () => {
    mutate({
      url: ADD_RECENT_PRODUCT,
      postData: {
        productId: product.id,
      },
    });
  };

  const { data: cartData, isLoading: cartLoading } = useFetchData(
    GET_CART,
    undefined,
    () => !!product.id
  );

  const { mutate: addToCartMutation, isPending } = usePostData({
    invalidateQueries: [GET_CART],
  });

  const addToCart = () => {
    addToCartMutation({
      url: ADD_TO_CART,
      postData: {
        productId: product.id,
        quantity: 1,
      },
    });
  };

  const confirmAddToCart = () => {
    setIsWarningOpen(false);
    addToCart();
  };

  const handleAddToCart = () => {
    if (cartData && cartData.vendorId !== product.vendorId) {
      setIsWarningOpen(true);

      return;
    }

    addToCart();
  };

  return (
    <>
      <Link className="w-full h-full block" href={`/products/${product.id}`}>
        <Card
          key={product.id}
          isPressable
          shadow="sm"
          className="group w-full h-full"
          radius="sm"
          onPress={handleClick}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              isBlurred
              alt={product.name}
              className="w-full object-cover h-[180px] group-hover:scale-110 transition-all duration-300"
              radius="sm"
              shadow="sm"
              src={product.images?.[0] || noImg}
              width="100%"
            />
          </CardBody>
          <div className="flex flex-col items-center w-full mt-2">
            <div>
              <b>{product.name}</b>
            </div>
            <div className="font-bold text-green-700 text-lg">
              $
              {(
                product.price -
                product.price * (product.discount / 100)
              ).toFixed(2)}
              <div className="text-default-400 space-x-2 text-tiny">
                <span className="line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="bg-red-600 px-1 text-white rounded">
                  {product.discount}%
                </span>
              </div>
            </div>
          </div>
          <CardFooter className="text-small flex-col justify-start">
            <Button
              isDisabled={cartLoading}
              size="sm"
              isLoading={isPending}
              onPress={handleAddToCart}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </Link>
      <Modal
        backdrop="blur"
        aria-labelledby="modal-title"
        isOpen={isWarningOpen}
        onClose={() => setIsWarningOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Vendor Conflict</ModalHeader>
          <ModalBody>
            The product you are trying to add to your cart belongs to a
            different vendor. This action will remove your current cart. Do you
            want to continue?
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setIsWarningOpen(false)}>Cancel</Button>
            <Button color="danger" onPress={confirmAddToCart}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;
