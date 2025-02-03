import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { useState, useEffect } from "react";
import usePostStore from "../store/postStore";


const useAddLikes = (postId) => {
  const [isLiked, setIsLiked] = useState(false);
  const { user, setUser } = useAuthStore();
  const { showToast } = useShowToast();
  const { posts, setPosts } = usePostStore();

  useEffect(() => {
    if (user) {
      const post = posts.find((post) => post.id === postId);
      const isLiked = post.likes.includes(user.uid);
      setIsLiked(isLiked);
    }
  }, [isLiked, postId, posts, user]);

  const handleLike = async () => {
    try {
      const currentPostRef = doc(firestore, "posts", postId);

      const currentPostUpdatedDoc = {
        likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      };

      await setDoc(currentPostRef, currentPostUpdatedDoc, { merge: true });
      if (isLiked) {
        const updatedPosts = posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: post.likes.filter((uid) => uid !== user.uid),
              }
            : post
        );
        setPosts(updatedPosts);
        setIsLiked(false);
      } else {
        const updatedPosts = posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: [...post.likes, user.uid],
              }
            : post
        );
        setPosts(updatedPosts);
        setIsLiked(true);
      }
    } catch (err) {
      console.log(err);
      showToast({
        title: "Couldn't update like.",
        description: err.message || "Something went wrong. Please try again.",
        status: "error",
      });
    }
  };

  return { isLiked, handleLike };
};

export default useAddLikes;
