import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import useUserProfileStore from "../../store/useUserProfileStore";



const EditProfile = ({ isOpen, onClose }) => {
  const fileRef = useRef(null);
  const { selectedFile, setSelectedFile, handleImageChange, remoteFile } = usePreviewImg();
  const {userProfile} = useUserProfileStore()
  const [inputs, setInputs] = useState({
    username: userProfile.username,
    fullname: userProfile.fullname,
    bio: userProfile.bio,
  });
  const { handleProfileEdit } = useEditProfile();

  

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} borderTop={"4px solid"}>
            <Flex minH={"60vh"} align={"center"} justify={"center"}>
              <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                rounded={"xl"}
                boxShadow={"lg"}
                my={4}
                mt={4}
              >
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                  Edit Profile
                </Heading>
                <FormControl id="userName">
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar
                        size="xl"
                        src={selectedFile || userProfile.profilePicURL}
                      >
                        <AvatarBadge
                          as={IconButton}
                          size="sm"
                          rounded="full"
                          top="-10px"
                          colorScheme="red"
                          aria-label="remove Image"
                          icon={<SmallCloseIcon />}
                        />
                      </Avatar>
                    </Center>
                    <Center w="full">
                      <Button w="full" onClick={() => fileRef.current.click()}>
                        Edit Profile Picture
                      </Button>
                    </Center>
                    <Input
                      type="file"
                      ref={fileRef}
                      hidden
                      onChange={handleImageChange}
                    />
                  </Stack>
                </FormControl>
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder="Username"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={inputs.username}
                    onInput={(e) =>
                      setInputs({ ...inputs, username: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl id="fullname">
                  <FormLabel>Fullname</FormLabel>
                  <Input
                    placeholder="Fullname"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={inputs.fullname}
                    onInput={(e) =>
                      setInputs({ ...inputs, fullname: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl id="bio">
                  <FormLabel>Bio</FormLabel>
                  <Input
                    placeholder="tell your friends about yourself.."
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={inputs.bio}
                    onInput={(e) =>
                      setInputs({ ...inputs, bio: e.target.value })
                    }
                  />
                </FormControl>

                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "red.500",
                    }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={() =>
                      handleProfileEdit(inputs, setInputs, onClose, remoteFile)
                    }
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
