import { Container, Avatar } from "@chakra-ui/react";
import ProfilePosts from "../../components/profileposts/ProfilePosts";
import ProfileTab from "../../components/Profile/ProfileTab";
import { FiEdit } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import useGetUserByUsername from "../../hooks/useGetUserByUsername";

const Profilepage = () => {
  // const { username } = useParams();
  // console.log("username is :" + username)
  // const {isLoading, userProfile} = useGetUserByUsername(username)
  // const userNotFound = !isLoading && !userProfile
  // if (userNotFound) return (<div>User not found.<Link to={"/"}>Go home</Link></div>)

  return (
    <Container maxW={"container.lg"}>
      <div className="flex items-center gap-10 md:gap-20 md:pl-12 pt-9 md:pt-24">
        <Avatar
          src="/profilepic.png"
          size={{ base: "sm", md: "md" }}
          name="roseline"
        />
        <div className="">
          <div className="flex items-center gap-4">
            <p className="font-semibold">
              {/* {userProfile.username } */}
              roseprogrammer
            </p>
            <button className="bg-white rounded-sm text-black text-sm font-bold px-2 py-1">
              <span className="hidden md:block"> Edit Profile</span>
              <div className="block md:hidden">
                <FiEdit size={20} />
              </div>
            </button>
          </div>
          <div className="flex gap-3 items-center my-2 text-sm">
            <p className="font-bold">
              4 <span>Posts</span>
            </p>
            <p className="font-bold">
              162 <span>Followers</span>
            </p>
            <p className="font-bold">
              145 <span>Following</span>
            </p>
          </div>
          <p className="font-extrabold text-sm my-2">As a Programmer</p>
          <p className="text-md">
            I love to code and i can't wait to start working as a programmer.
          </p>
        </div>
      </div>
      <ProfileTab />

      <ProfilePosts />
    </Container>
  );
};

export default Profilepage;
