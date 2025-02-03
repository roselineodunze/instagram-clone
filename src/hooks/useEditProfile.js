import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/useUserProfileStore";
import useAuthStore from "../store/authStore";
import { storageAPI } from "../appwrite/storage";
import usePreviewImg from "./usePreviewImg";


const useEditProfile = () => {
  const navigate = useNavigate();
  const { setUserprofile, userProfile } = useUserProfileStore();
  const { showToast } = useShowToast();
  const {  setSelectedFile } = usePreviewImg();

  const { login } = useAuthStore();

  const handleProfilePicUpload = async (profilePic) => {
    if (!profilePic) return null;
    console.log(profilePic);

    try {
      const files = await storageAPI.profilePictures.list();
      const existingFile = files.find((file) => file.$id === userProfile.uid);
      if (existingFile) {
        await storageAPI.profilePictures.delete(userProfile.uid);
      }
      const response = await storageAPI.profilePictures.upload2(
        userProfile.uid,
        profilePic
      );

      const profilePicURL = `${
        import.meta.env.VITE_APPWRITE_ENDPOINT
      }/storage/buckets/${
        import.meta.env.VITE_APPWRITE_PROFILEPIC_BUCKET_ID
      }/files/${response.$id}/view?project=${
        import.meta.env.VITE_APPWRITE_PROJECT_ID
      }`;
      setSelectedFile(null)
      console.log("pic uploaded");
      

      return profilePicURL;
    } catch (error) {
      console.error("Profile picture upload error:", error);
      throw new Error("Failed to upload profile picture");
    }
  };

  const updateUserDocument = async (data) => {
    const userRef = doc(firestore, "users", userProfile.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User document not found");
    }

    await setDoc(userRef, data, { merge: true });
    const updatedDoc = await getDoc(userRef);

    if (!updatedDoc.exists()) {
      throw new Error("Failed to fetch updated user data");
    }

    return updatedDoc.data();
  };

  const handleLocalUpdate = (userData, setInputs, onClose) => {
    localStorage.setItem("user-info", JSON.stringify(userData));
    login(userData);
    setUserprofile(userData);

    if (setInputs) {
      setInputs({
        username: userData.username,
        fullname: userData.fullname,
        bio: userData.bio,
      });
    }

    onClose?.();
    navigate(`/${userData.username}`);
  };

  const handleProfileEdit = async (inputs, setInputs, onClose, profilePic) => {
    try {
      // Step 1: Handle profile picture upload if exists
      let updatedInputs = { ...inputs };
      if (profilePic) {
        const profilePicURL = await handleProfilePicUpload(profilePic);
        if (profilePicURL) {
          updatedInputs = {
            ...inputs,
            profilePicURL: profilePicURL,
          };
        }
      }

      // Step 2: Update user document in Firebase
      const userData = await updateUserDocument(updatedInputs);

      // Step 3: Update local state and navigate
      handleLocalUpdate(userData, setInputs, onClose);

      showToast({
        title: "Profile updated successfully.",
        description: "Your profile has been updated.",
        status: "success",
      });
    } catch (error) {
      console.error("Profile edit error:", error);
      showToast({
        title: "Failed to update profile.",
        description: error.message || "Something went wrong. Please try again.",
        status: "error",
      });
    }
  };
  return { handleProfileEdit };
};

export default useEditProfile;
