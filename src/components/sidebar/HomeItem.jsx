import { Tooltip, Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const HomeItem = () => {
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
          to={"/"}
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
          <AiFillHome size={25} />
          <Box display={{ base: "none", md: "block" }}>Home</Box>
        </Link>
      </Tooltip>
    </>
  );
};

export default HomeItem;
