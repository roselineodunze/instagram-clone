import { Avatar, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

Avatar;
const SearchResponse = ({ user }) => {
    if(!user) return <p className="text-white">No user found.</p>
  return (
    <div className="my-5 text-white">
      <Link to={`/${user.username}`} as={RouterLink} cursor={"pointer"} display={"flex"} alignItems={"center"} gap={2}>
        <Avatar src={user.profilePicURL || ""} size={"md"} />
        <div className="flex flex-col flex-grow gap-1">
          <p className="font-bold">{user.fullname}</p>
          <p className="font-light">@{user.username}</p>
        </div>
      </Link>
    </div>
  );
};

export default SearchResponse;
