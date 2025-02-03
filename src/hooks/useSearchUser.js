import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchUser = () => {
  const { showToast } = useShowToast();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUserProfile = async (username) => {
    setIsLoading(true);
    try {
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username)
      );
      const qSnapshot = await getDocs(q);

      if (qSnapshot.empty)
        return showToast({
          title: "User not found.",
          description: "There was no user found with this username ehh",
          status: "error",
        });
      console.log(qSnapshot.docs[0].data());
      setUser(qSnapshot.docs[0].data());
    } catch (err) {
      console.log(err);
      showToast({
        title: "User not found.",
        description:
          err.message || "There was no user found with this username",
        status: "error",
      });
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { getUserProfile, isLoading, user };
};

export default useSearchUser;
