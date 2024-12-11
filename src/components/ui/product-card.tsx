import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { Product } from "@/src/types";
import { noImg } from "@/src/constants";
import { usePostData } from "@/src/hooks/mutation.hook";
import { GET_ALL_PRODUCTS } from "@/src/api-endpoints/product.api";
import { ADD_RECENT_PRODUCT } from "@/src/api-endpoints/recent-product.api";

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  const { mutate } = usePostData({
    invalidateQueries: [GET_ALL_PRODUCTS],
    doNotShowNotification: true,
  });

  const handleClick = () => {
    router.push(`/products/${product.id}`);
    mutate({
      url: ADD_RECENT_PRODUCT,
      postData: {
        productId: product.id,
      },
    });
  };

  return (
    <Card
      key={product.id}
      isPressable
      shadow="sm"
      className="group"
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
      <CardFooter className="text-small flex-col justify-start">
        <div>
          <b>{product.name}</b>
        </div>
        <div className="font-bold text-green-700 text-lg">
          $
          {(product.price - product.price * (product.discount / 100)).toFixed(
            2
          )}
          <span className="bg-red-600 px-1 text-white rounded ml-2 text-sm">
            {product.discount}%
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
