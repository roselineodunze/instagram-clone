import React from "react";
import SuggestedUser from "./SuggestedUser";
import { Avatar, Box, Button } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedUsers = () => {
  const { loading, handlelogout } = useLogout();
  const authUser = useAuthStore((state) => state.user);
  if (!authUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pr-7 py-8 overflow-hidden h-screen">
      <div className="flex w-full items-center justify-between gap-4 mb-5">
        <Link to={authUser.username}>
          <Avatar src={authUser.profilePicURL} size={"md"} />
        </Link>
        <div className="flex-grow">
          <p className="font-bold text-sm">{authUser.username}</p>
        </div>
        <Button
          onClick={handlelogout}
          color="gray.400"
          bg="transparent" // Remove background
          _hover={{ bg: "transparent" }} // Remove hover background
          _active={{ bg: "transparent" }}
          isLoading={loading}
        >
          Log Out
        </Button>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-gray-400">Suggested for you</p>
        <button className="font-bold text-sm">See All</button>
      </div>
      <div>
        <SuggestedUser />
        <SuggestedUser />
        <SuggestedUser />
      </div>
    </div>
  );
};

export default SuggestedUsers;
