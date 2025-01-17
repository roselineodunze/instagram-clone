import { Avatar } from "@chakra-ui/react";

const Comment = () => {
  return (
    <div className="flex items-center justify-between gap-2">
      <Avatar src={"/profilepic.png"} size={"md"} name="roseline" />
      <div className="flex-grow">
        <p className="font-bold text-sm">
          roseprogrammer <span className="font-medium">Looking good</span>
        </p>
        <p className="text-sm">17h ago</p>
      </div>
    </div>
  );
};

export default Comment;
