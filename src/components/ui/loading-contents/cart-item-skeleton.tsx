import { Card, CardBody, Skeleton } from "@nextui-org/react";

const CartItemSkeleton = () => {
  return (
    <Card className="w-full max-w-lg mx-auto" radius="sm">
      <CardBody className="flex flex-row items-center p-4">
        <Skeleton className="rounded-lg w-[100px] h-[100px]" />
        <div className="ml-4 flex-grow">
          <Skeleton className="h-6 w-3/4 rounded-lg mb-2" />
          <div className="flex items-center mt-1">
            <Skeleton className="h-7 w-24 rounded-lg" />
            <Skeleton className="ml-2 h-4 w-16 rounded-lg" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="rounded-full w-8 h-8" />
            <Skeleton className="w-8 h-6 rounded-lg" />
            <Skeleton className="rounded-full w-8 h-8" />
          </div>
          <Skeleton className="rounded-full w-10 h-10 ml-4" />
        </div>
      </CardBody>
    </Card>
  );
};

export default CartItemSkeleton;
