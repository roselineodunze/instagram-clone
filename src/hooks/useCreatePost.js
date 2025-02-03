import {
  setDoc,
  doc,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { storageAPI } from "../appwrite/storage";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/useUserProfileStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";
import { useLocation } from "react-router-dom";

const useCreatePost = () => {
  const { addPost } = useUserProfileStore();
  const location = useLocation();
  const { showToast } = useShowToast();
  const { user } = useAuthStore();
  const { createPost } = usePostStore();

  const uploadPostImg = async (picture) => {
    if (!picture) return null;

    try {
      const response = await storageAPI.posts.upload(picture);

      const postImageURL = `${
        import.meta.env.VITE_APPWRITE_ENDPOINT
      }/storage/buckets/${
        import.meta.env.VITE_APPWRITE_POSTS_BUCKET_ID
      }/files/${response.$id}/view?project=${
        import.meta.env.VITE_APPWRITE_PROJECT_ID
      }`;

      return postImageURL;
    } catch (error) {
      console.error("Profile picture upload error:", error);
      throw new Error("Failed to upload profile picture");
    }
  };

  const handlePostCreation = async (caption, picture) => {
    if(!picture){
      return showToast({
        title: "Failed to upload post.",
        description: "Please insert a picture.",
        status: "error",
      });
    }
    console.log("creating posts");
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: user.uid,
    };
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", user.uid);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

      const imageURL = await uploadPostImg(picture);
      await updateDoc(postDocRef, { imageURL });

      newPost.imageURL = imageURL;
      createPost({ ...newPost, id: postDocRef.id });

      addPost(postDocRef);

      showToast({
        title: "Post Created Successfully",
        description: "Your post was uploaded successfully.",
        status: "success",
      });
    } catch (err) {
      console.log(err);
      showToast({
        title: "Failed to create post.",
        description: err.message || "Something went wrong. Please try again.",
        status: "error",
      });
    }
  };

  return { handlePostCreation };
};

export default useCreatePost;
