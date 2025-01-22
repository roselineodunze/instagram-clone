import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useSignupWIthEmailAndPassword = () => {
  const { showToast } = useShowToast();
  const {login} = useAuthStore();

  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const signup = async (data) => {
    if (!data.email || !data.password || !data.username || !data.fullname) {
      console.log("Please fill all the fields");
      return;
    }

    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", data.username));
    const qData = await getDocs(q);
    if (!qData.empty) {
      showToast({
        title: "Error.",
        description: "Username already exists.",
        status: "error",
      });
      return;
    }
    try {
      const newUser = await createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      if (!newUser) {
        console.log(error);
        showToast({
          title: "Error.",
          description:
            error.message || "Something went wrong. Please try again.",
          status: "error",
        });
      }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: data.email,
          username: data.username,
          fullname: data.fullname,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));

        login(userDoc);

        await showToast({
          title: "Account created successfully.",
          description: "We've created your account for you.",
          status: "success",
        });
      }
    } catch (error) {
      console.log(error);
      showToast({
        title: "Failed to create account.",
        description: error.message || "Something went wrong. Please try again.",
        status: "error",
      });
    }
  };
  return { loading, error, signup };
};

export default useSignupWIthEmailAndPassword;
