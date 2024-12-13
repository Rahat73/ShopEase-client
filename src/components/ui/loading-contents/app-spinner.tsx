import { Spinner } from "@nextui-org/react";

const AppSpinner = () => {
  return (
    <div className=" bg-black/10 z-[999] backdrop-blur-md w-full h-full flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
};

export default AppSpinner;
