import { Skeleton } from "@nextui-org/react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="w-full h-full flex justify-center items-center">
        <Skeleton className="rounded-lg">
          <div className="h-[400px] w-full" />
        </Skeleton>
      </div>

      <div>
        <Skeleton className="w-3/4 h-8 mb-4" />
        <Skeleton className="w-full h-20 mb-2" />

        <div className="flex items-center space-x-4 mb-4">
          <Skeleton className="w-24 h-8" />
          <Skeleton className="w-20 h-6" />
        </div>

        <Skeleton className="w-32 h-6 mb-4" />

        <div className="flex items-center space-x-4 mb-4">
          <Skeleton className="w-28 h-6" />
          <Skeleton className="w-24 h-6" />
        </div>

        <div className="mb-4">
          <Skeleton className="w-40 h-6 mb-2" />
          <Skeleton className="w-32 h-6" />
        </div>

        <div className="mb-4">
          <Skeleton className="w-36 h-6" />
        </div>

        <div className="flex items-center justify-between my-3">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>

        <div className="flex space-x-4">
          <Skeleton className="w-32 h-10 rounded-full" />
          <Skeleton className="w-32 h-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
