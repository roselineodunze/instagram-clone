import { useState } from "react";
import {
  Input,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useSignupWIthEmailAndPassword from "../../hooks/useSignupWIthEmailAndPassword";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });

  const { loading, signup } = useSignupWIthEmailAndPassword();
  return (
    <>
      <Input
        placeholder="Email"
        variant={"outline"}
        size={"sm"}
        mb={4}
        focusBorderColor="gray.400"
        value={authData.email}
        onInput={(e) => setAuthData({ ...authData, email: e.target.value })}
      />
      <Input
        placeholder="Fullname"
        variant={"outline"}
        size={"sm"}
        mb={4}
        focusBorderColor="gray.400"
        value={authData.fullname}
        onInput={(e) => setAuthData({ ...authData, fullname: e.target.value })}
      />
      <Input
        placeholder="Username"
        variant={"outline"}
        size={"sm"}
        mb={4}
        focusBorderColor="gray.400"
        value={authData.username}
        onInput={(e) => setAuthData({ ...authData, username: e.target.value })}
      />

      <InputGroup size="md">
        <Input
          placeholder="Password"
          variant={"outline"}
          size={"sm"}
          mb={4}
          focusBorderColor="gray.400"
          value={authData.password}
          type={showPassword ? "text" : "password"}
          onInput={(e) =>
            setAuthData({ ...authData, password: e.target.value })
          }
        />
        <InputRightElement
          height="full"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Button
            variant={"ghost"}
            size={"sm"}
            isLoading={loading}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      <Button
        colorScheme="cyan"
        mt={4}
        variant="solid"
        size="sm"
        width="100%"
        mb={8}
        onClick={() => signup(authData)}
      >
        Sign Up
      </Button>
    </>
  );
};

export default SignupForm;
