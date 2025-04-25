import { Avatar, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useFollowUser from "../../hooks/useFollowUser";

Avatar;
const SearchResponse = ({ user, onClose }) => {
  const { user: authUser } = useAuthStore();
  const { isFollowing, handleFollowUser } = useFollowUser(user?.uid);
  if (!user) return <p className="text-white">No user found.</p>;
  console.log(user);
  const isAuthUserProfile = authUser.uid === user.uid;

  return (
    <div className="my-5 text-white flex justify-between items-center">
      <Link
        to={`/${user.username}`}
        as={RouterLink}
        cursor={"pointer"}
        display={"flex"}
        alignItems={"center"}
        gap={2}
        onClick={() => onClose()}
      >
        <Avatar src={user.profilePicURL || ""} size={"md"} />
        <div className="flex flex-col flex-grow gap-1">
          <p className="font-bold">{user.fullname}</p>
          <p className="font-light">@{user.username}</p>
        </div>
      </Link>
      {!isAuthUserProfile && (
        <button onClick={handleFollowUser} className=" text-sm">
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default SearchResponse;
