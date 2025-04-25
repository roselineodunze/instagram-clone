import React, { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [remoteFile, setRemoteFile] = useState(null)
  const maxFileSize = 5 * 1024 * 1024;
  const { showToast } = useShowToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSize) {
        showToast({
          title: "Error",
          description: "File size must be less than 5MB.",
          status: "error",
        });
        setSelectedFile(null);
        return;
      }
      setRemoteFile(file)
      console.log("remote file", file)
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedFile(reader.result)
      }
      reader.readAsDataURL(file)

    } else {
      showToast({
        title: "Error",
        description: "Please select an image file..",
        status: "error",
      });
      setSelectedFile(null);
    }
  };

  return {selectedFile, handleImageChange, setSelectedFile, remoteFile};
};

export default usePreviewImg;
