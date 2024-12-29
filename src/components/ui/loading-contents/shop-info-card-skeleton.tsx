import { Skeleton } from "@nextui-org/react";

export default function ShopInfoCardSkeleton() {
  return (
    <div className="w-full max-w-xl mx-auto bg-default-100 shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center">
        <div className="w-1/4 relative">
          <Skeleton className="rounded-l-lg h-full aspect-square" />
        </div>
        <div className="w-3/4 p-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <Skeleton className="w-32 h-6 rounded-lg mb-1" />
              <Skeleton className="w-24 h-4 rounded-lg" />
            </div>
            <Skeleton className="w-20 h-8 rounded-full" />
          </div>
          <Skeleton className="w-24 h-4 rounded-lg mb-2" />
          <Skeleton className="w-28 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
