import { useState } from "react";
import { Input, Button, InputRightElement, InputGroup } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useLogin from "../../hooks/useLogin";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const { login, loading } = useLogin();
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
        variant="solid"
        size="sm"
        width="100%"
        mb={8}
        onClick={() => login(authData)}
        isLoading={loading}
      >
        Login
      </Button>
    </>
  );
};

export default LoginForm;
