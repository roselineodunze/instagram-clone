import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/useUserProfileStore";
import useAuthStore from "../store/authStore";

const useEditProfile = () => {
  const navigate = useNavigate();
  const { setUserprofile } = useUserProfileStore();
  const { showToast } = useShowToast();
  const { user, login } = useAuthStore();

  const handleProfileEdit = async (inputs, setInputs, onClose) => {
    try {
      const userRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        await setDoc(userRef, inputs, { merge: true });
        showToast({
          title: "Profile updated successfully.",
          description: "Your profile has been updated.",
          status: "success",
        });
        const updatedDoc = await getDoc(userRef);

        if (updatedDoc.exists()) {
          localStorage.setItem("user-info", JSON.stringify(updatedDoc.data()));
          login(updatedDoc.data());
          setUserprofile(updatedDoc.data());
          setInputs({
            username: updatedDoc.data().username,
            fullname: updatedDoc.data().fullname,
            bio: updatedDoc.data().bio,
          });
          onClose();
          navigate(`/${updatedDoc.data().username}`);
        }
      }
    } catch (err) {
      showToast({
        title: "Failed to update profile.",
        description: err.message || "Something went wrong. Please try again.",
        status: "error",
      });
    }
  };
  return { handleProfileEdit };
};

export default useEditProfile;
