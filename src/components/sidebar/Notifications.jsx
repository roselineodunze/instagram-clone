import { Tooltip, Link, Box } from "@chakra-ui/react"
import { NotificationsLogo } from "../../assets/constants"


const Notifications = () => {
  return (
    <>
    <Tooltip
            hasArrow
            label={"Notifications"}
            placement="right"
            openDelay={500}
            display={{ base: "block", md: "none" }}
          >
            <Link
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
              <NotificationsLogo />
              <Box display={{ base: "none", md: "block" }}>Notifications</Box>
            </Link>
          </Tooltip>
    </>
  )
}

export default Notifications