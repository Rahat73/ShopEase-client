import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { IoDuplicateOutline } from "react-icons/io5";

import { usePostData } from "@/src/hooks/mutation.hook";
import {
  DUPLICATE_PRODUCT,
  GET_MY_PRODUCTS,
} from "@/src/api-endpoints/product.api";
const DuplicateProduct = ({ productId }: { productId: string }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { mutate: duplicateProduct } = usePostData({
    invalidateQueries: [GET_MY_PRODUCTS],
  });

  const handleDelete = () => {
    duplicateProduct({ url: DUPLICATE_PRODUCT, postData: { productId } });
    onClose();
  };

  return (
    <>
      <Button isIconOnly aria-label="Edit" variant="light" onPress={onOpen}>
        <IoDuplicateOutline
          size={18}
          className="text-orange-300 hover:text-orange-600"
        />
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
            Duplicate Product
          </ModalHeader>
          <ModalBody>Do you really want to duplicate this product?</ModalBody>
          <ModalFooter>
            <Button color="default" onPress={onClose}>
              Cancel
            </Button>
            <Button color="warning" onPress={handleDelete}>
              Duplicate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DuplicateProduct;
