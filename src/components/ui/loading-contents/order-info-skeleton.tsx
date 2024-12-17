import { Card, CardBody, Skeleton } from "@nextui-org/react";

const OrderInfoSkeleton = () => {
  return (
    <Card className="mb-8 shadow-lg">
      <CardBody className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Skeleton className="w-48 h-7 mb-4 rounded-lg" />
            <div className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center">
                  <Skeleton className="w-24 h-5 rounded-lg mr-2" />
                  <Skeleton className="w-32 h-5 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Skeleton className="w-48 h-7 mb-4 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="w-40 h-5 rounded-lg" />
              <div className="flex items-center">
                <Skeleton className="w-5 h-5 rounded-full mr-2" />
                <Skeleton className="w-48 h-5 rounded-lg" />
              </div>
              <div className="flex items-center">
                <Skeleton className="w-5 h-5 rounded-full mr-2" />
                <Skeleton className="w-32 h-5 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderInfoSkeleton;
