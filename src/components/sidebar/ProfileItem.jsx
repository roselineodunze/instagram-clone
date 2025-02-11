import { Tooltip, Box, Link, Avatar } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProfileItem = () => {
  const { user } = useAuthStore();
  if (!user) return;
  return (
    <>
      <Tooltip
        hasArrow
        label={"Home"}
        placement="right"
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Link
          to={`/${user.username}`}
          as={RouterLink}
          display={"flex"}
          cursor="pointer"
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          width={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <Avatar src={user.profilePicURL} size={"sm"} />

          <Box display={{ base: "none", md: "block" }}>Profile</Box>
        </Link>
      </Tooltip>
    </>
  );
};

export default ProfileItem;
