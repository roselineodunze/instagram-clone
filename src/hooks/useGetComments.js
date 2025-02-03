import useCommentStore from "../store/commentStore";
import { useEffect } from "react";
import useShowToast from "./useShowToast";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetComments = (postId) => {
  const { showToast } = useShowToast();
  const { comments, setComments } = useCommentStore();

  useEffect(() => {
    if (!postId) return;

    const getComments = async () => {
      try {
        const commentsRef = collection(firestore, "comments");
        const q = query(commentsRef, where("postId", "==", postId));
        const qSnapshot = await getDocs(q);
        if (qSnapshot.empty) {
          setComments([]);
          return;
        }
        const commentData = [];
        qSnapshot.forEach((doc) => {
          commentData.push({ ...doc.data(), id: doc.id });
        });
        console.log(commentData)
        setComments(commentData);
      } catch (err) {
        showToast({
          title: "Error.",
          description: err.message || "Couldn't get comments.",
          status: "error",
        });
      }
    };
    if (postId) getComments();
  }, [showToast, setComments, postId]);

  return { comments };
};

export default useGetComments;
