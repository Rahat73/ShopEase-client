import { Card, CardBody, Skeleton } from "@nextui-org/react";

const OrderItemSkeleton = () => {
  return (
    <Card className="mb-6 shadow-md">
      <CardBody className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 flex space-x-4">
            <Skeleton className="rounded-lg w-[100px] h-[100px]" />
            <div className="flex-grow">
              <Skeleton className="w-3/4 h-6 rounded-lg mb-2" />
              <Skeleton className="w-full h-4 rounded-lg mb-2" />
              <Skeleton className="w-full h-4 rounded-lg mb-2" />
              <Skeleton className="w-1/2 h-4 rounded-lg mb-1" />
              <Skeleton className="w-1/3 h-4 rounded-lg" />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex mb-2">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="w-6 h-6 rounded-full mr-1" />
              ))}
            </div>
            <Skeleton className="w-full h-24 rounded-lg mb-3" />
            <Skeleton className="w-1/3 h-10 rounded-lg" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderItemSkeleton;
