import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { FaTrash } from "react-icons/fa";

import { useDeleteData } from "@/src/hooks/mutation.hook";
import { DELETE_COUPON, GET_ALL_COUPONS } from "@/src/api-endpoints/coupon.api";

const DeleteCoupon = ({ couponId }: { couponId: string }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { mutateAsync: deleteCoupon, isPending } = useDeleteData({
    invalidateQueries: [GET_ALL_COUPONS],
  });

  const handleDelete = async () => {
    const res = await deleteCoupon({ url: `${DELETE_COUPON}/${couponId}` });

    if (res?.success) {
      onClose();
    }
  };

  return (
    <>
      <Button isIconOnly aria-label="Edit" variant="light" onPress={onOpen}>
        <FaTrash size={18} className="text-red-500 hover:text-red-700" />
      </Button>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        classNames={{
          closeButton: "right-2 top-2",
        }}
        size="md"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-10">
            Delete Coupon
          </ModalHeader>
          <ModalBody>Do you really want to delete this category?</ModalBody>
          <ModalFooter>
            <Button color="default" onPress={onClose}>
              Cancel
            </Button>
            <Button color="danger" isLoading={isPending} onPress={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteCoupon;
