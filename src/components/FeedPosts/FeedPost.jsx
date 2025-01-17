import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Link,
  Avatar,
  Input,
  Image,
  InputGroup,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import { CommentLogo, UnlikeLogo } from "../../assets/constants";

const FeedPost = ({ username, avatar, comment }) => {
  return (
    <div className="mb-7">
      <div className="flex gap-3 items-center">
        <Avatar src={avatar} size={"sm"} name="roseline" />
        <Box w="full">
          <p className="font-bold text-sm">{username} .1m</p>
        </Box>
        <Link
          to={"#"}
          as={RouterLink}
          display={"flex"}
          cursor="pointer"
          alignItems={"center"}
          gap={3}
          _hover={{ textDecoration: "none" }}
        >
          <p className="text-blue-400 hover:text-white ">Unfollow</p>
        </Link>
      </div>
      <div className="overflow-hidden rounded-[4px] my-2">
        <Image src={avatar} />
      </div>
      <div className="flex gap-2 my-4">
        <UnlikeLogo />
        <CommentLogo />
      </div>
      <div className="">
        <p className="font-semibold">1000 likes</p>
        <div className="flex gap-1 items-center my-2">
          <p className="font-bold text-sm">{username}</p>
          <p className="">{comment}</p>
        </div>
        <p className="font-light mb-3">View all 1,123 comments</p>
        <InputGroup size="md">
          <Input placeholder="Add a comment..." p={0} variant="flushed" />
          <InputRightElement>
            <Button
              to={"#"}
              as={RouterLink}
              display={"flex"}
              cursor="pointer"
              _hover={{ bg: "transparent" }}
              bg={"transparent"}
            >
              <p className="hover:font-semibold">Post</p>
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>
    </div>
  );
};

export default FeedPost;
