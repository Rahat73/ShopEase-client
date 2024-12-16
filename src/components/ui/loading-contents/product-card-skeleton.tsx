import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <Card shadow="sm" className="group" radius="sm">
      <CardBody className="overflow-visible p-0">
        <Skeleton className="w-full h-[180px] rounded-md" />
      </CardBody>
      <div className="flex flex-col items-center w-full mt-2 space-y-2">
        <Skeleton className="h-4 w-3/5 rounded-md" />
        <Skeleton className="h-4 w-2/5 rounded-md" />
        <Skeleton className="h-3 w-3/5 rounded-md" />
      </div>
      <CardFooter className="text-small flex-col justify-center mt-2">
        <Skeleton className="h-8 w-3/5 rounded-md" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;
