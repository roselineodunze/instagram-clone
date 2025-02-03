import {
  Flex,
  GridItem,
  Image,
  useDisclosure,
  
} from "@chakra-ui/react";
import { FaHeart, FaComment } from "react-icons/fa";

import ProfilePostModal from "./ProfilePostModal.jsx";
import useUserProfileStore from "../../store/useUserProfileStore";


const ProfilePost = ({ post }) => {
  const { userProfile, delPost } = useUserProfileStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!post) return;

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
              <p className="font-extrabold text-[22px]">{post.likes.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaComment size={24} />
              <p className="font-extrabold text-[22px]">
                {post.comments.length}
              </p>
            </div>
          </div>
        </Flex>
        <Image src={post.imageURL} alt="Dan Abramov" />
      </GridItem>
      <ProfilePostModal isOpen={isOpen} onClose={onClose} post={post} />
    </>
  );
};

export default ProfilePost;
