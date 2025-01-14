import { Card, CardFooter, Skeleton } from "@nextui-org/react";

const CategoryCardSkeleton = () => {
  return (
    <Card isFooterBlurred className="h-48">
      <Skeleton className="z-0 w-full h-full -translate-y-6 rounded-none">
        <div className="w-full h-full" />
      </Skeleton>

      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div className="w-full">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg mt-2">
            <div className="h-3 rounded-lg bg-default-200" />
          </Skeleton>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CategoryCardSkeleton;
