import React from "react";
import { Card, CardBody, Skeleton } from "@nextui-org/react";

const ReviewCardSkeleton: React.FC = () => {
  return (
    <Card className="w-full">
      <CardBody className="p-3">
        <div className="flex items-start space-x-4">
          <Skeleton className="rounded-full w-8 h-8" />
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-4 w-24 rounded-lg" />
              <Skeleton className="h-4 w-20 rounded-lg" />
            </div>
            <Skeleton className="h-3 w-32 rounded-lg mb-2" />
            <Skeleton className="h-4 w-full rounded-lg mb-2" />
            <Skeleton className="h-4 w-full rounded-lg mb-2" />
            <div className="bg-default-100 p-2 rounded-lg">
              <div className="flex justify-between mb-2">
                <Skeleton className="h-3 w-24 rounded-lg" />
                <Skeleton className="h-3 w-20 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4 rounded-lg mt-1" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ReviewCardSkeleton;
