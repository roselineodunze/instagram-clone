import { useState, useCallback, useEffect } from "react";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";

const useGetUserById = (userId) => {
  const { showToast } = useShowToast();
  const [userProfile, setUserprofile] = useState(null);

  const getUserProfile = useCallback(async () => {
    try {
      const userRef = doc(firestore, "users", userId);
      const qData = await getDoc(userRef);

      if (!qData.exists()) {
        setUserprofile(null);
        return;
      }

      const userDoc = qData.data();
      setUserprofile(userDoc);
    } catch (err) {
      showToast({
        title: "Error.",
        description: err.message || "Something went wrong.",
        status: "error",
      });
    }
  }, [userId, showToast]);

  useEffect(() => {
    if (userId) {
      getUserProfile();
    }
  }, [userId, getUserProfile]);

  return { userProfile };
};

export default useGetUserById;
