import { MdDelete } from "react-icons/md";
import { CommentLogo, UnlikeLogo } from "../../assets/constants";
import { Link as RouterLink } from "react-router-dom";
import Comment from "../Comment/Comment";
import {
  Image,
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
import { FaRegHeart } from "react-icons/fa";

import useUserProfileStore from "../../store/useUserProfileStore";
import { storageAPI } from "../../appwrite/storage.js";
import useShowToast from "../../hooks/useShowToast.js";
import usePostStore from "../../store/postStore";
import { useRef, useState } from "react";
import useCreateComment from "../../hooks/useCreateComment.js";
import useAddLikes from "../../hooks/useAddLikes.js";
import {
  arrayRemove,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase.js";
import useAuthStore from "../../store/authStore.js";
import { timeAgo } from "../../utils/timeAgo.js";


const ProfilePostModal = ({ isOpen, onClose, post }) => {
  const { userProfile, setUserprofile } = useUserProfileStore();
  const { showToast } = useShowToast();
  const { deletePost } = usePostStore();
  const [comment, setComment] = useState("");
  const { createComment } = useCreateComment();
  const { isLiked, handleLike } = useAddLikes(post.id);
  const { user } = useAuthStore();
  const commentInputRef = useRef(null);
  const date = timeAgo(post.createdAt);

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post")) return;
    try {
      const url = post.imageURL;
      const match = url.match(/files\/(.*?)\/view/);
      console.log(match[1]);
      await storageAPI.posts.delete(match[1]);
      const postRef = doc(firestore, "posts", post.id);
      await deleteDoc(postRef);

      const userRef = doc(firestore, "users", user.uid);
      const currentUserUpdatedDoc = {
        posts: arrayRemove(post.id),
      };
      await updateDoc(userRef, currentUserUpdatedDoc);

      setUserprofile({
        ...userProfile,
        posts: userProfile.posts.filter((id) => id !== post.id),
      });

      deletePost(post.id);
      showToast({
        title: "Post Deleted Successfully",
        description: "Your post has been deleted.",
        status: "success",
      });
    } catch (err) {
      console.log(err);
      showToast({
        title: "Failed to update profile.",
        description: err.message || "Something went wrong. Please try again.",
        status: "error",
      });
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "xl", md: "4xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            border={0}
            _hover={{
              bg: "gray.900", // Change background color on hover
            }}
          />
          <ModalBody bg={"black"} borderTop={"2px solid"} padding={4}>
            <div className="flex gap-10 mt-5  h-full md:h-[70vh] min-h-[70vh]">
              <div className="overflow-hidden w-[50%]  border rounded-sm hidden md:flex justify-center items-center">
                <Image src={post.imageURL} w={"full"} />
              </div>

              <div className="flex flex-grow flex-col max-w-[95vw] justify-between min-h-[70vh]">
                <div className="w-full">
                  <div className="flex items-center justify-between pb-3 border-b gap-2 mb-5">
                    <Avatar src={userProfile?.profilePicURL} size={"md"} />
                    <div className="flex-grow">
                      <p className="font-bold text-sm">
                        {userProfile.username}
                      </p>
                    </div>
                    <button onClick={handleDeletePost}>
                      <MdDelete size={20} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 pb-2 overflow-y-auto max-h-[70%]">
                    {post.caption && (
                      <div className="flex items-center justify-between gap-2">
                        <Avatar src={userProfile.profilePicURL} size={"md"} />
                        <div className="flex-grow">
                          <p className="font-bold text-sm">
                            {userProfile.username}{" "}
                            <span className="font-medium">{post.caption}</span>
                          </p>
                          <p className="text-sm">{date}</p>
                        </div>
                      </div>
                    )}
                    {post.comments?.length === 0 && (
                      <p className="w-full text-center mt-5 text-gray-300 text-sm">
                        No comments yet. 📖
                      </p>
                    )}
                    {post.comments?.map((c) => (
                      <Comment key={c.id} comment={c} />
                    ))}
                  </div>
                </div>
                <div className="md:py-0 py-3">
                  <div className="flex gap-2 mb-1">
                    <button onClick={handleLike}>
                      {isLiked ? <UnlikeLogo /> : <FaRegHeart size={24} />}
                    </button>
                    <button
                      onClick={() => {
                        if (commentInputRef.current) {
                          commentInputRef.current.focus();
                        }
                      }}
                    >
                      <CommentLogo />
                    </button>
                  </div>
                  <div className="">
                    <p className="font-semibold mt-2">
                      {post.likes?.length} likes
                    </p>
                    <InputGroup size="md">
                      <Input
                        placeholder="Add a comment..."
                        p={0}
                        ref={commentInputRef}
                        variant="flushed"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <InputRightElement>
                        <Button
                          to={"#"}
                          as={RouterLink}
                          display={"flex"}
                          cursor="pointer"
                          _hover={{ bg: "transparent" }}
                          bg={"transparent"}
                          onClick={() => {
                            createComment(comment, post.id);
                            setComment("");
                          }}
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

export default ProfilePostModal;
