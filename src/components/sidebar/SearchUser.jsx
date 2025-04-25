import {
  Tooltip,
  Link,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { SearchLogo } from "../../assets/constants";
import useSearchUser from "../../hooks/useSearchUser";
import { useState } from "react";
import SearchResponse from "../search/SearchResponse";

const SearchUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUserProfile, isLoading, user } = useSearchUser();
  const [username, setUsername] = useState("");

  return (
    <>
      <Tooltip
        hasArrow
        label={"Search"}
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
          onClick={onOpen}
        >
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Link>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        motionPreset="slideInLeft"
        size={{ base: "full", md: "xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"}>
            <div className="w-full mt-7 flex flex-col">
              <div className=" flex items-center">
                <button onClick={() => getUserProfile(username)}>
                  {" "}
                  <SearchLogo />
                </button>
                <input
                  placeholder="search username..."
                  value={username}
                  type="text"
                  className="border-none p-3 w-full flex-1 bg-transparent hover:border-none"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="flex-1">
                {isLoading && <p>Searching...</p>}
                {user && <SearchResponse user={user} onClose={onClose} />}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchUser;
