import { useEffect, useState, useCallback } from "react";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/useUserProfileStore";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const useGetUserByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useShowToast();
  const { userProfile, setUserprofile } = useUserProfileStore();

  const getUserProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("username", "==", username));
      const qData = await getDocs(q);

      if (qData.empty) {
        setUserprofile(null); // No user found, set it once.
        return;
      }

      const userDoc = qData.docs[0]?.data(); // Get the first matching document.
      setUserprofile(userDoc);
    } catch (err) {
      showToast({
        title: "Error.",
        description: err.message || "Something went wrong.",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [username, setUserprofile, showToast]);

  useEffect(() => {
    if (username) {
      getUserProfile();
    }
  }, [username, getUserProfile]);

  return { isLoading, userProfile };
};

export default useGetUserByUsername;
