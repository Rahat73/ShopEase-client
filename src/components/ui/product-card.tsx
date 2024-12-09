import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import { Product } from "@/src/types";
import { noImg } from "@/src/constants";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card
      key={product.id}
      isPressable
      shadow="sm"
      className="group"
      radius="sm"
      onPress={() => console.log(product.images?.[0])}
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
