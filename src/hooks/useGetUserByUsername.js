import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/useUserProfileStore";
import { firestore } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const useGetUserByUsername = (username) => {
  console.log("func user: " + username)
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useShowToast();
  const { userProfile, setUserprofile } = useUserProfileStore();
  console.log("func user is: " + username)

  useEffect(() => {
    console.log("getting user profile" + username)
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("username", "==", username));
        const qData = await getDocs(q);
        if (!qData.empty) {
          setUserprofile(null);
          return;
        }
        let userDoc;
        qData.forEach((doc) => {
          userDoc = doc.data();
        });
        console.log(userDoc)
        setUserprofile(userDoc);
      } catch (err) {
        showToast({
          title: "Error.",
          description: err.message || "Something went wrong..",
          status: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [setUserprofile, username, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserByUsername;
