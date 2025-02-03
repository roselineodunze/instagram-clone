import React from "react";
import useAuthStore from "../../store/authStore";
import SearchUser from "./SearchUser";
import CreatePost from "./CreatePost";

const SidebarItems = () => {
  const { user } = useAuthStore();
  return (
    <>
      <CreatePost />

      <SearchUser />
    </>
  );
};

export default SidebarItems;
