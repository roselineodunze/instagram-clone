import {
  Tooltip,
  Link,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { FaImage } from "react-icons/fa6";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useCreatePost from "../../hooks/useCreatePost";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileRef = useRef(null);
  const [caption, setCaption] = useState("");
  const { selectedFile, handleImageChange, setSelectedFile, remoteFile } =
    usePreviewImg();
  const { handlePostCreation } = useCreatePost();

  return (
    <>
      <Tooltip
        hasArrow
        label={"Search"}
        placement="right"
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Link
          display={"flex"}
          cursor="pointer"
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          width={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Link>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        motionPreset="slideInLeft"
        size={{ base: "full", md: "xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} borderTop={"3px solid"}>
            <div className="w-full h-full mt-7 flex flex-col p-3">
              <h3 className="font-semibold text-xl">Create Post</h3>
              <textarea
                placeholder="enter a caption"
                className="my-4 p-2 h-[100px] border border-slate-400 bg-transparent"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <button
                className="bg-transparent"
                onClick={() => fileRef.current.click()}
              >
                <FaImage size={20} />
                <input
                  type="file"
                  ref={fileRef}
                  hidden
                  onChange={handleImageChange}
                />
              </button>
              <div className="flex justify-end mt-3">
                <button
                  className="bg-gray-900 w-20 h-10 font-semibold"
                  onClick={() => handlePostCreation(caption, remoteFile)}
                >
                  Post
                </button>
              </div>
              {selectedFile && (
                <div className=" w-full mt-5 h-[300px] md:[400px] overflow-hidden flex items-center justify-center">
                  <Image
                    src={selectedFile}
                    width={"100%"}
                    objectFit="contain"
                    alt="selected image"
                  />
                </div>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
