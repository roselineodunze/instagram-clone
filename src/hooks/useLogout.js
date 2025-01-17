import { auth } from "../firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useLogout = () => {
  const [ signOut, loading, error ] = useSignOut(auth);
  const { showToast } = useShowToast();
  const logoutUser = useAuthStore((state) => state.logout);

  const handlelogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      console.log("logged out");
      logoutUser();
    } catch (error) {
      console.log(error);
      showToast({
        title: "Logout failed.",
        description:
          error.message || "Failed to logout, please try again later.",
        status: "error",
      });
    }
  };
  return { handlelogout, loading, error };
};

export default useLogout;
