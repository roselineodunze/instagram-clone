import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import {
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const useCreateComment = () => {
  const { user } = useAuthStore();
  const { showToast } = useShowToast();
  // const { addComment } = useCommentStore();
  const { addComment } = usePostStore();

  const createComment = async (comment, postId) => {
    console.log(comment);
    const newCommentDoc = {
      comment: comment,
      likes: [],
      createdAt: Date.now(),
      createdBy: user.uid,
      postId: postId,
    };
    try {
      const postRef = doc(firestore, "posts", postId);
      await updateDoc(postRef, { comments: arrayUnion(newCommentDoc) });
      addComment(newCommentDoc, postId);
    } catch (err) {
      console.log(err);
      showToast({
        title: "Failed to add comment.",
        description: err.message || "Something went wrong. Please try again.",
        status: "error",
      });
    }
  };
  return { createComment };
};

export default useCreateComment;
