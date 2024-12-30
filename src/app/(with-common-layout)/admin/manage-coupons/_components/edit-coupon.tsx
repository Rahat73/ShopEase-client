import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import { FieldValues, SubmitHandler } from "react-hook-form";

import { Coupon } from "@/src/types";
import { useUpdateData } from "@/src/hooks/mutation.hook";
import { GET_ALL_COUPONS, UPDATE_COUPON } from "@/src/api-endpoints/coupon.api";
import AppForm from "@/src/components/form/app-form";
import { addCouponValidationSchema } from "@/src/schemas/coupon.schema";
import AppInput from "@/src/components/form/app-input";

const EditCoupon = ({ coupon }: { coupon: Coupon }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const hideModal = () => {
    onClose();
  };

  const { mutateAsync: updateCoupon, isPending } = useUpdateData({
    invalidateQueries: [GET_ALL_COUPONS],
  });

  const handleUpdateCoupon: SubmitHandler<FieldValues> = async (data) => {
    const res = await updateCoupon({
      url: UPDATE_COUPON + "/" + coupon.id,
      postData: {
        ...data,
        discount: Number(data.discount),
      },
    });

    if (res?.success) {
      hideModal();
    }
  };

  return (
    <>
      <Button isIconOnly aria-label="Edit" variant="light" onPress={onOpen}>
        <FaEdit size={18} className="text-blue-500 hover:text-blue-700" />
      </Button>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        classNames={{
          closeButton: "right-2 top-2",
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-10">
            Update Coupon
          </ModalHeader>
          <ModalBody>
            <AppForm
              defaultValues={coupon}
              resolver={zodResolver(addCouponValidationSchema)}
              onSubmit={handleUpdateCoupon}
            >
              <div className="mb-3">
                <AppInput label="Coupon Code" name="code" />
              </div>
              <div className="mb-3">
                <AppInput label="Discount (%)" name="discount" />
              </div>

              <div className="flex justify-end my-3">
                <Button color="danger" variant="light" onPress={hideModal}>
                  Close
                </Button>
                <Button type="submit" color="primary" isLoading={isPending}>
                  Update
                </Button>
              </div>
            </AppForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCoupon;
