import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, orderBy, query, where, limit, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetSuggesstedUsers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const { user } = useAuthStore();
  const { showToast } = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      try {
        const usersRef = collection(firestore, "users");
        const q = query(
          usersRef,
          where("uid", "not-in", [user.uid, ...user.following]),
          orderBy("uid"),
          limit(3)
        );
        const qSnapshot = await getDocs(q)
        const users = []
        qSnapshot.forEach(doc => {
            users.push({...doc.data(), id: doc.id})
        })
        setSuggestedUsers(users)
        console.log(users)
      } catch (err) {
        showToast({
          title: "Error.",
          description: err.message || "Couldn't get suggested users.",
          status: "error",
        });
      }
    };
    if (user) getSuggestedUsers()
  }, [user, showToast]);

  return {suggestedUsers};
};

export default useGetSuggesstedUsers;
