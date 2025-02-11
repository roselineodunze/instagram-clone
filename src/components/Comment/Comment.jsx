import { Avatar } from "@chakra-ui/react";

import useUserProfileStore from "../../store/useUserProfileStore";
import useGetUserById from "../../hooks/useGetUserById";
import { timeAgo } from "../../utils/timeAgo";


const Comment = ({ comment }) => {
  const { userProfile } = useGetUserById(comment.createdBy);
  const date = timeAgo(comment.createdAt)
  if (!userProfile) return
  return (
    <div className="flex items-center justify-between gap-2 mt-2">
      <Avatar src={userProfile.profilePicURL} size={"md"} />
      <div className="flex-grow">
        <p className="font-bold text-sm">
          {userProfile.username} <span className="font-medium">{comment.comment}</span>
        </p>
        <p className="text-sm">{date}</p>

      </div>
    </div>
  );
};

export default Comment;
