import {
  Flex,
  GridItem,
  Image,
  useDisclosure,
  Avatar,
  InputRightElement,
  InputGroup,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaHeart, FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CommentLogo, UnlikeLogo } from "../../assets/constants";
import { Link as RouterLink } from "react-router-dom";
import Comment from "../Comment/Comment";

const ProfilePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <GridItem
        cursor={"pointer"}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          bg={"blackAlpha.700"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          transition={"all 0.3s ease"}
          zIndex={999}
        >
          <div className="flex items-center gap-10 justify-center w-full">
            <div className="flex items-center gap-2">
              <FaHeart size={24} />
              <p className="font-extrabold text-[22px]">7</p>
            </div>
            <div className="flex items-center gap-2">
              <FaComment size={24} />
              <p className="font-extrabold text-[22px]">3</p>
            </div>
          </div>
        </Flex>
        <Image src="/img1.png" alt="Dan Abramov" />
      </GridItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"}>
            <div className="flex gap-10 w-[90%] sm:w-[80%] md:h-auto  h-[100vh] md:w-full mx-auto p-3">
              <div className="overflow-hidden flex-[0.5] rounded-sm hidden md:block">
                <Image src="/img1.png" />
              </div>

              <div className="flex md:flex-[0.5] flex-col justify-between">
                <div className="w-full">
                  <div className="flex items-center justify-between border-b gap-2 mb-5">
                    <Avatar
                      src={"/profilepic.png"}
                      size={"md"}
                      name="roseline"
                    />
                    <div className="flex-grow">
                      <p className="font-bold text-sm">roseprogrammer</p>
                    </div>
                    <MdDelete size={20} />
                  </div>
                  <div className="flex flex-col gap-2 border-b pb-2 overflow-y-auto max-h-[70%]">
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                  </div>
                </div>
                <div className="flex-1 md:py-0 py-3">
                  <div className="flex gap-2 mb-1">
                    <UnlikeLogo />
                    <CommentLogo />
                  </div>
                  <div className="">
                    <p className="font-semibold mt-2">1000 likes</p>
                    <InputGroup size="md">
                      <Input
                        placeholder="Add a comment..."
                        p={0}
                        variant="flushed"
                      />
                      <InputRightElement>
                        <Button
                          to={"#"}
                          as={RouterLink}
                          display={"flex"}
                          cursor="pointer"
                          _hover={{ bg: "transparent" }}
                          bg={"transparent"}
                        >
                          <p className="hover:font-semibold">Post</p>
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
