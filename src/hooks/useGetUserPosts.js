import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import {
  collection,
  orderBy,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/useUserProfileStore"
import usePostStore from "../store/postStore"

const useGetUserPosts = () => {
  const { userProfile } = useUserProfileStore();
  const { showToast } = useShowToast();
  const {posts, setPosts} = usePostStore()

  useEffect(() => {
    if (!userProfile) return

    const getPosts = async () => {
      try {
        const postsRef = collection(firestore, "posts");
        const q = query(
          postsRef,
          where("createdBy", "==", userProfile.uid),
        );
        const qSnapshot = await getDocs(q);
        const postData = []
        qSnapshot.forEach(doc => {
            postData.push({...doc.data(), id: doc.id})
        })
        postData.sort((a,b) => b.createdAt - a.createdAt)
        setPosts(postData)

      } catch (err) {
        showToast({
          title: "Error.",
          description: err.message || "Couldn't get suggested users.",
          status: "error",
        });
      }

    };
    if (userProfile) getPosts()


  }, [userProfile, showToast, setPosts]);

  return { posts };
};

export default useGetUserPosts;
