import { auth, firestore } from "../firebase/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const useGoogleAuth = () => {
  const { showToast } = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const loginGoogle = async () => {
    try {
      const result = await signInWithGoogle();

      if (result?.user) {
        console.log(result.user);
        const { uid, email } = result.user;
        const userRef = doc(firestore, "users", uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          console.log("acct exists");
          const loggedInUser = userDoc.data();
          localStorage.setItem("user-info", JSON.stringify(loggedInUser));
          loginUser(loggedInUser);
        } else {
          const newUserDoc = {
            uid: uid,
            email: email,
            username: uid,
            fullname: "",
            bio: "",
            profilePicURL: "",
            followers: [],
            following: [],
            posts: [],
            createdAt: Date.now(),
          };
          await setDoc(doc(firestore, "users", uid), newUserDoc);
          localStorage.setItem("user-info", JSON.stringify(newUserDoc));
          loginUser(newUserDoc);
        }
        await showToast({
          title: "Success.",
          description: "You have been logged in successfully.",
          status: "success",
        });
      }
    } catch (err) {
      console.error(err);
      showToast({
        title: "Error.",
        description: error.message || "Something went wrong. Please try again.",
        status: "error",
      });
    }
  };

  return { loginGoogle, loading };
};

export default useGoogleAuth;
