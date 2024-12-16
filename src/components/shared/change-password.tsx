"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FaLock } from "react-icons/fa";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateData } from "@/src/hooks/mutation.hook";
import { CHANGE_PASSWORD } from "@/src/api-endpoints/auth.api";
import AppForm from "@/src/components/form/app-form";
import AppInput from "@/src/components/form/app-input";
import { changePasswordValidationSchema } from "@/src/schemas/auth.schema";

const ChangePassword = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { mutateAsync: changePassword, isPending } = useUpdateData({
    invalidateQueries: [],
  });

  const handleChangePassword: SubmitHandler<FieldValues> = async (postData) => {
    const res = await changePassword({
      url: CHANGE_PASSWORD,
      postData,
    });

    if (res?.success) {
      onClose();
    }
  };

  return (
    <>
      <Button
        color="default"
        startContent={<FaLock />}
        className="absolute right-0 bottom-0"
        onPress={onOpen}
      >
        Change Password
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
            Change Password
          </ModalHeader>
          <ModalBody>
            <AppForm
              resolver={zodResolver(changePasswordValidationSchema)}
              onSubmit={handleChangePassword}
            >
              <div className="my-3">
                <AppInput
                  type="password"
                  label="Current Password"
                  name="oldPassword"
                />
              </div>
              <div className="my-3">
                <AppInput
                  type="password"
                  label="New Password"
                  name="newPassword"
                />
              </div>
              <div className="flex justify-end gap-3 mb-3">
                <Button color="default" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" type="submit" isLoading={isPending}>
                  Confirm
                </Button>
              </div>
            </AppForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePassword;
