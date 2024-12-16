import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

import AppInput from "@/src/components/form/app-input";
import AppForm from "@/src/components/form/app-form";
import { addCategoryValidationSchema } from "@/src/schemas/category.schema";
import { usePostData } from "@/src/hooks/mutation.hook";
import {
  ADD_CATEGORY,
  GET_ALL_CATEGORIES,
} from "@/src/api-endpoints/category.api";

const AddCategory = () => {
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

  const { mutateAsync: addCategory, isPending } = usePostData({
    invalidateQueries: [GET_ALL_CATEGORIES],
  });

  const handleAddCategory: SubmitHandler<FieldValues> = async (data) => {
    const formdata = new FormData();

    if (imageFiles) {
      formdata.append("file", imageFiles);
    } else {
      toast.error("Please select an image");

      return;
    }

    formdata.append("data", JSON.stringify(data));

    const res = await addCategory({
      url: ADD_CATEGORY,
      postData: formdata,
    });

    if (res?.success) {
      hideModal();
    }
  };

  return (
    <>
      <Button variant="shadow" color="primary" onPress={onOpen}>
        Add Category
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
            Add Category
          </ModalHeader>
          <ModalBody>
            <AppForm
              resolver={zodResolver(addCategoryValidationSchema)}
              onSubmit={handleAddCategory}
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
                  className="hidden"
                  id="image"
                  type="file"
                  accept="image/*"
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

export default AddCategory;
