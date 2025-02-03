import React from "react";
import { Avatar, Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const SuggestedUser = ({ user }) => {
  return (
    <div className="flex items-center gap-2 my-4">
      <Link to={`/${user.username}`}>
        <Avatar src={user.profilePicURL || ""} size={"md"} />
      </Link>
      <div className="flex flex-col flex-grow gap-1 max-w-[200px]">
        <p className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
          {user.username}
        </p>
        <p className="font-light">{user.followers.length} followers</p>
      </div>
      <button className=" text-sm">Follow</button>
    </div>
  );
};

export default SuggestedUser;
