import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/useUserProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useFollowUser = (userId) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, setUser } = useAuthStore();
  const { userProfile, setUserprofile } = useUserProfileStore();
  const { showToast } = useShowToast();

  useEffect(() => {
    if (user) {
      const isFollowing = user.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [user, userId]);

  const handleFollowUser = async () => {
    try {
        const currentUserRef = doc(firestore, "users", user.uid)
        const userToFollowOrUnfollow = doc(firestore, "users", userId)

        const currentUserUpdatedDoc = {
            following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
        }

        const secondaryUserUpdatedDoc = {
            followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid)
        }

        await setDoc(currentUserRef, currentUserUpdatedDoc, { merge: true });
        await setDoc(userToFollowOrUnfollow, secondaryUserUpdatedDoc, { merge: true });

        if (isFollowing){
            setUser({
                ...user,
                following: user.following.filter(id => id !== userId)
            })
            setUserprofile({
                ...userProfile,
                followers: userProfile.followers.filter(id => id !== user.uid)
            })
            localStorage.setItem("user-info", JSON.stringify({
                ...user,
                following: user.following.filter(id => id !== userId)
            }));
            setIsFollowing(false)

        }else{
            setUser({
                ...user,
                following: [...user.following, userId]
            })
            setUserprofile({
                ...userProfile,
                followers: [...userProfile.followers, user.uid]
            })
            localStorage.setItem("user-info", JSON.stringify({
                ...user,
                following: [...user.following, userId]
            }));

            setIsFollowing(true)
        }


    } catch (err) {
      showToast({
        title: "Failed to follow user.",
        description: err.message || "Something went wrong. Please try again.",
        status: "error",
      });
    }
  };


  return { isFollowing, handleFollowUser };
};

export default useFollowUser;
