import React from "react";
import { Button } from "@chakra-ui/react";
import useGoogleAuth from "../../hooks/useGoogleAuth";

const Googleauth = ({ prefix }) => {
  const {loginGoogle, loading} = useGoogleAuth()
  return (
    <Button
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      width={"80%"}
      mx={"auto"}
      bg={"transparent"}
      _hover={{bg: "transparent"}}
      onClick={loginGoogle}
      isLoading={loading}
    >
      <img src="/google.png" className="h-6" />
      <p className="text-[18px] text-gray-500">{prefix} with Google</p>
    </Button>
  );
};

export default Googleauth;
