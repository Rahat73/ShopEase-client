import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import { addCategoryValidationSchema } from "@/src/schemas/category.schema";
import AppInput from "@/src/components/form/app-input";
import AppForm from "@/src/components/form/app-form";
import {
  GET_ALL_CATEGORIES,
  UPDATE_CATEGORY,
} from "@/src/api-endpoints/category.api";
import { useUpdateData } from "@/src/hooks/mutation.hook";
import { Category } from "@/src/types";

const UpdateCategory = ({ category }: { category: Category }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [imageFiles, setImageFiles] = useState<File | undefined>();
  const [imagePreviews, setImagePreviews] = useState<string | undefined>();

  const hideModal = () => {
    onClose();
    setImageFiles(undefined);
    setImagePreviews(undefined);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const { mutateAsync: updateCategory, isPending } = useUpdateData({
    invalidateQueries: [GET_ALL_CATEGORIES],
  });

  const handleUpdateCategory: SubmitHandler<FieldValues> = async (data) => {
    const formdata = new FormData();

    if (imageFiles) {
      formdata.append("file", imageFiles);
    }

    formdata.append("data", JSON.stringify(data));

    const res = await updateCategory({
      url: UPDATE_CATEGORY + "/" + category.id,
      postData: formdata,
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
            Update Category
          </ModalHeader>
          <ModalBody>
            <AppForm
              defaultValues={category}
              resolver={zodResolver(addCategoryValidationSchema)}
              onSubmit={handleUpdateCategory}
            >
              <div className="mb-3">
                <AppInput label="Category Name" name="name" />
              </div>
              <div className="mb-3">
                <AppInput label="Description" name="description" />
              </div>
              <div className="min-w-fit flex-1">
                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                  htmlFor="image"
                >
                  Upload Category Icon
                </label>
                <input
                  multiple
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
                {imagePreviews && (
                  <div className="flex gap-5 my-5 flex-wrap">
                    <div
                      key={imagePreviews}
                      className="relative size-40 rounded-xl border-2 border-dashed border-default-300 p-2 flex justify-center items-center"
                    >
                      <Image
                        alt="item"
                        className="size-36 object-cover"
                        src={imagePreviews}
                      />
                    </div>
                  </div>
                )}
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

export default UpdateCategory;
