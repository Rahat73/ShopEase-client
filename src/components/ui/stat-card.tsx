import { Card, CardBody, Skeleton } from "@nextui-org/react";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  isLoading?: boolean;
}
const StatCard = ({
  title,
  value = 0,
  icon: Icon,
  isLoading = false,
}: StatCardProps) => {
  return (
    <Card className="max-w-xs w-full">
      <CardBody className="overflow-hidden p-4 relative">
        <div className="relative z-10">
          <p className="text-default-600 font-semibold text-lg md:text-xl mb-2">
            {title}
          </p>
          {isLoading ? (
            <Skeleton className="w-20 h-6 rounded" />
          ) : (
            <p className="text-default-600 font-semibold text-base md:text-lg lg:text-xl">
              {value}
            </p>
          )}
        </div>
        <div className="absolute bottom-0 right-0 transform translate-y-1/4 translate-x-1/4">
          <Icon className="text-4xl md:text-5xl lg:text-8xl text-default-500 opacity-30" />
        </div>
      </CardBody>
    </Card>
  );
};

export default StatCard;
