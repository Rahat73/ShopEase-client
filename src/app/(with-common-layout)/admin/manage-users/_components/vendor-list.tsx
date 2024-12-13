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

import { CHANGE_STATUS, GET_VENDORS } from "@/src/api-endpoints/user.api";
import { useFetchData } from "@/src/hooks/fetch.hook";
import { TVendor } from "@/src/types";
import { noImg } from "@/src/constants";
import { useUpdateData } from "@/src/hooks/mutation.hook";

const columns = [
  {
    key: "shopLogo",
    label: "Shop Logo",
  },
  {
    key: "shopName",
    label: "Shop Name",
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
    key: "isBlacklisted",
    label: "Blacklisted",
  },
  {
    key: "isSuspended",
    label: "Suspended",
  },
];

const VendorList = () => {
  const { data: vendorsData = [] } = useFetchData(GET_VENDORS) as {
    data: TVendor[];
  };

  const { mutate: updateVendor } = useUpdateData({
    invalidateQueries: [GET_VENDORS],
  });

  const handleBlacklist = (vendorId: string, isBlacklisted: boolean) => {
    updateVendor({
      url: `${GET_VENDORS}/${vendorId}`,
      postData: {
        isBlacklisted,
      },
    });
  };

  const handleSuspend = (userId: string) => {
    updateVendor({
      url: `${CHANGE_STATUS}/${userId}`,
    });
  };

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={vendorsData} emptyContent={"No rows to display."}>
        {(item: TVendor) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "shopLogo" ? (
                  <Image
                    src={item.shopLogo || noImg}
                    alt={item.shopName}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                ) : columnKey === "isBlacklisted" ? (
                  <Tooltip
                    content={
                      item.isBlacklisted
                        ? "Remove From Blacklist?"
                        : "Add To Blacklist?"
                    }
                  >
                    {item.isBlacklisted ? (
                      <Button
                        variant="light"
                        color="danger"
                        size="sm"
                        onPress={() => handleBlacklist(item.id, false)}
                      >
                        Yes
                      </Button>
                    ) : (
                      <Button
                        variant="light"
                        color="success"
                        size="sm"
                        onPress={() => handleBlacklist(item.id, true)}
                      >
                        No
                      </Button>
                    )}
                  </Tooltip>
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

export default VendorList;
