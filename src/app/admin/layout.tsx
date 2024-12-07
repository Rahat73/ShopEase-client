import { ReactNode } from "react";

import { Navbar } from "@/src/components/shared/navbar/navbar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default AdminLayout;
