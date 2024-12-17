import { Button, Card, CardBody, Image, Link } from "@nextui-org/react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

import {
  GET_CART,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM,
} from "@/src/api-endpoints/cart.api";
import { noImg } from "@/src/constants";
import { useDeleteData, useUpdateData } from "@/src/hooks/mutation.hook";

interface CartItemProps {
  product: {
    id: string;
    name: string;
    price: number;
    discount: number;
    inventoryCount: number;
    images: string[];
  };
  quantity: number;
  //   handleSelectedCartItems: (product: Product) => void;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const discountedPrice = product.price * (1 - product.discount / 100);

  const { mutate: updateCartItem, isPending: isUpdatePending } = useUpdateData({
    invalidateQueries: [GET_CART],
    doNotShowNotification: true,
  });

  const { mutate: removeCartItem, isPending: isRemovePending } = useDeleteData({
    invalidateQueries: [GET_CART],
  });

  const handleUpdateQuantity = (value: number) => {
    updateCartItem({
      url: `${UPDATE_CART_ITEM}/${product.id}`,
      postData: {
        quantity: value,
      },
    });
  };

  const handleRemoveCartItem = () => {
    removeCartItem({
      url: `${REMOVE_CART_ITEM}/${product.id}`,
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto" radius="sm">
      <CardBody className="flex flex-row items-center p-4">
        <Image
          alt={product.name}
          className="object-cover rounded-lg"
          src={product.images[0] || noImg}
          width={100}
          height={100}
        />
        <div className="ml-4 flex-grow">
          <Link href={`/products/${product.id}`} className="text-default-900">
            <h3 className="text-lg font-semibold">{product.name}</h3>
          </Link>
          <div className="flex items-center mt-1">
            <span className="text-xl font-bold text-green-600">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="ml-2 text-sm line-through text-gray-500">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              isDisabled={quantity === 1}
              isLoading={isUpdatePending}
              onPress={() => handleUpdateQuantity(quantity - 1)}
            >
              <FaMinus size={16} />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              isDisabled={quantity === product.inventoryCount}
              isLoading={isUpdatePending}
              onPress={() => handleUpdateQuantity(quantity + 1)}
            >
              <FaPlus size={16} />
            </Button>
          </div>
          <Button
            isIconOnly
            color="danger"
            variant="light"
            isLoading={isRemovePending}
            onPress={() => handleRemoveCartItem()}
          >
            <FaTrash size={20} />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CartItem;
