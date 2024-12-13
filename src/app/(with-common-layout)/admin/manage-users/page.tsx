"use client";

import { Card, CardBody, Divider, Tab, Tabs } from "@nextui-org/react";

import CustomerList from "./_components/customer-list";
import VendorList from "./_components/vendor-list";

const AdminManageUsers = () => {
  return (
    <div className="my-1">
      <div className="text-xl font-bold space-x-4 flex justify-between items-center">
        <p>Manage Users</p>
      </div>
      <Divider className="my-4" />
      <div className="flex w-full flex-col">
        <Tabs aria-label="Manage Users tabs">
          <Tab key="customer" title="Customer">
            <Card>
              <CardBody>
                <CustomerList />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="vendor" title="Vendor">
            <Card>
              <CardBody>
                <VendorList />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminManageUsers;
