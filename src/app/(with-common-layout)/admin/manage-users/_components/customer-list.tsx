import {
  getKeyValue,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";

import { CHANGE_STATUS, GET_CUSTOMERS } from "@/src/api-endpoints/user.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { useUpdateData } from "@/src/hooks/mutation.hook";
import { Customer } from "@/src/types";
import { noImg } from "@/src/constants";

const columns = [
  {
    key: "profilePhoto",
    label: "Profile Photo",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "phone",
    label: "Phone",
  },
  {
    key: "address",
    label: "Address",
  },
  {
    key: "isSuspended",
    label: "Suspended",
  },
];

const CustomerList = () => {
  const { data: customersData = [] } = useFetchData(GET_CUSTOMERS) as {
    data: Customer[];
  };

  const { mutate: updateCustomer } = useUpdateData({
    invalidateQueries: [GET_CUSTOMERS],
  });

  const handleSuspend = (userId: string) => {
    updateCustomer({
      url: `${CHANGE_STATUS}/${userId}`,
    });
  };

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={customersData} emptyContent={"No rows to display."}>
        {(item: Customer) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "profilePhoto" ? (
                  <Image
                    src={item.profilePhoto || noImg}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                ) : columnKey === "isSuspended" ? (
                  <Tooltip
                    content={item.user.isSuspended ? "Unsuspend?" : "Suspend?"}
                  >
                    {item.user.isSuspended ? (
                      <Button
                        variant="light"
                        color="danger"
                        size="sm"
                        onPress={() => handleSuspend(item.user.id)}
                      >
                        Yes
                      </Button>
                    ) : (
                      <Button
                        variant="light"
                        color="success"
                        size="sm"
                        onPress={() => handleSuspend(item.user.id)}
                      >
                        No
                      </Button>
                    )}
                  </Tooltip>
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomerList;
