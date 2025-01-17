import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useLogin = () => {
  const { showToast } = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const login = async (data) => {
    if (!data.email || !data.password) {
      console.log("Please fill all the fields");
      return;
    }


    try {
      const userCred = await signInWithEmailAndPassword(
        data.email,
        data.password
      );

      if (!userCred){
        await showToast({
          title: "Error.",
          description: "There was an error. Please try again or sign in with google.",
          status: "error",
        });
      }

      if (userCred) {
        const userRef = doc(firestore, "users", userCred.user.uid);
        const userDoc = await getDoc(userRef);
        console.log("Logged-in user:", userDoc);
        const loggedInUser = userDoc.data();
        console.log("Logged-in user:", loggedInUser);
        localStorage.setItem("user-info", JSON.stringify(loggedInUser));
        loginUser(loggedInUser);
        await showToast({
          title: "Success.",
          description: "You have been logged in successfully.",
          status: "success",
        });
      } 
    } catch (error) {
      console.log(error);
      await showToast({
        title: "Error.",
        description: error?.message || "Something went wrong. Please try again.",
        status: "error",
      });
    }
  };
  return { login, loading };
};

export default useLogin;
