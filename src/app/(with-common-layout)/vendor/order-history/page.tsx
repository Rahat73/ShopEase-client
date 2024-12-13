import { Divider } from "@nextui-org/react";
import React from "react";

const VendorOrderHistory = () => {
  return (
    <div className="my-1">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Order History</p>
      </div>
      <Divider className="my-4" />
    </div>
  );
};

export default VendorOrderHistory;
