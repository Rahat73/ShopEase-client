import { Card, CardHeader, CardBody, Skeleton } from "@nextui-org/react";

const VendorCardSkeleton = () => {
  return (
    <Card className="max-w-md mx-auto mt-10 p-2">
      <CardHeader className="justify-between space-x-10">
        <div className="flex gap-5">
          <Skeleton className="rounded-full w-12 h-12" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <Skeleton className="h-3 w-24 rounded-lg" />
            <Skeleton className="h-3 w-16 rounded-lg" />
          </div>
        </div>
        <Skeleton className="rounded-full h-8 w-20" />
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-500">
        <Skeleton className="h-4 w-3/4 rounded-lg mb-2" />
        <Skeleton className="h-4 w-1/2 rounded-lg" />
      </CardBody>
    </Card>
  );
};

export default VendorCardSkeleton;
