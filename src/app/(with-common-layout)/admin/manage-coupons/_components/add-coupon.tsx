import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CREATE_COUPON, GET_ALL_COUPONS } from "@/src/api-endpoints/coupon.api";
import AppForm from "@/src/components/form/app-form";
import AppInput from "@/src/components/form/app-input";
import { usePostData } from "@/src/hooks/mutation.hook";
import { addCouponValidationSchema } from "@/src/schemas/coupon.schema";

const AddCoupon = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const hideModal = () => {
    onClose();
  };

  const { mutateAsync: addCoupon, isPending } = usePostData({
    invalidateQueries: [GET_ALL_COUPONS],
  });

  const handleAddCoupon: SubmitHandler<FieldValues> = async (data) => {
    const res = await addCoupon({
      url: CREATE_COUPON,
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
      <Button variant="shadow" color="primary" onPress={onOpen}>
        Add Coupon
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
          <ModalHeader className="flex flex-col gap-10">Add Coupon</ModalHeader>
          <ModalBody>
            <AppForm
              resolver={zodResolver(addCouponValidationSchema)}
              onSubmit={handleAddCoupon}
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
                  Add
                </Button>
              </div>
            </AppForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCoupon;
