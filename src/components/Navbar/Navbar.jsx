import React from "react";
import { Container, Link, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Container maxW={"container.lg"} mt={4} mb={3}>
      <div className="flex justify-between items-center"> 
        <div>
          <Link
            to={"/"}
            as={RouterLink}
            pl={2}
            display={{ base: "none", md: "block" }}
            cursor="pointer"
          >
            <img src="/logo.png" className="h-20" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
            <button className="bg-blue-300 text-black rounded-md font-bold w-20 h-10">Login</button>
            <button className="bg-transparent font-bold">Signup</button>

        </div>
      </div>
    </Container>
  );
};

export default Navbar;
