import { Avatar, Box, Link, Tooltip, Flex, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  InstagramLogo,
  InstagramMobileLogo,
  SearchLogo,
  NotificationsLogo,
  CreatePostLogo,
} from "../../../assets/constants";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../../hooks/useLogout";

const Sidebar = () => {
  const menuLinks = [
    {
      icon: <AiFillHome size={25} />,
      text: "Home",
      link: "/",
    },
    {
      icon: <SearchLogo />,
      text: "Search",
    },
    {
      icon: <NotificationsLogo />,
      text: "Notifications",
    },
    {
      icon: <CreatePostLogo />,
      text: "Create",
    },
    {
      icon: <Avatar src="/profilepic.png" size={"sm"} name="roseline" />,
      text: "Profile",
      link: "/:username",
    },
  ];
  const { handlelogout, loading, error } = useLogout();

  return (
    <div className="h-full px-2 md:px-4 sticky top-0 left-0">
      <div className="flex flex-col w-full h-full py-4 md:py-8 gap-6 md:gap-12">
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor="pointer"
        >
          <InstagramLogo />
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          p={2}
          display={{ base: "flex", md: "none" }}
          cursor="pointer"
          width="100%"
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          w={10}
        >
          <InstagramMobileLogo />
        </Link>
        <div className="flex flex-col gap-5 h-full cursor-pointer">
          {menuLinks.map((item, index) => (
            <Tooltip
              key={index}
              hasArrow
              label={item.text}
              placement="right"
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                to={item.link || "#"}
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
                {item.icon}
                <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
              </Link>
            </Tooltip>
          ))}
        </div>
        <div>
          <Tooltip
            hasArrow
            label="Logout"
            placement="right"
            openDelay={500}
            display={{ base: "block", md: "none" }}
          >
            <Flex
              onClick={handlelogout}
              display={"flex"}
              cursor="pointer"
              alignItems={"center"}
              gap={4}
              _hover={{ bg: "whiteAlpha.400" }}
              borderRadius={6}
              p={2}
              width={{ base: 10, md: "full" }}
            >
              <BiLogOut size={25} />
              <Button
                display={{ base: "none", md: "block" }}
                variant={"ghost"}
                _hover={{ bg: "transparent" }}
                isLoading={loading}
              >
                Logout
              </Button>
            </Flex>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
