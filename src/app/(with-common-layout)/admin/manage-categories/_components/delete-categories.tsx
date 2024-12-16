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

import {
  DELETE_CATEGORY,
  GET_ALL_CATEGORIES,
} from "@/src/api-endpoints/category.api";
import { useDeleteData } from "@/src/hooks/mutation.hook";

const DeleteCategories = ({ categoryId }: { categoryId: string }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { mutate: deleteProduct } = useDeleteData({
    invalidateQueries: [GET_ALL_CATEGORIES],
  });

  const handleDelete = () => {
    deleteProduct({ url: `${DELETE_CATEGORY}/${categoryId}` });
    onClose();
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
            Delete Category
          </ModalHeader>
          <ModalBody>Do you really want to delete this category?</ModalBody>
          <ModalFooter>
            <Button color="default" onPress={onClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteCategories;
