import {
  Container,
  Avatar,
  useDisclosure,
 
} from "@chakra-ui/react";
import ProfilePosts from "../../components/profileposts/ProfilePosts";
import ProfileTab from "../../components/Profile/ProfileTab";
import { FiEdit } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import useGetUserByUsername from "../../hooks/useGetUserByUsername";
import useAuthStore from "../../store/authStore";
import EditProfile from "../../components/Profile/EditProfile";
import { useNavigate } from "react-router-dom";


const Profilepage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthStore();
  const { username } = useParams();
  const navigate = useNavigate();
  const { isLoading, userProfile } = useGetUserByUsername(username);
  if (!user) {
    return navigate("/auth");
  }
  if (isLoading) return <div>Loading...</div>;
  const userNotFound = !userProfile;
  if (userNotFound)
    return (
      <div>
        User not found.<Link to={"/"}>Go home</Link>
      </div>
    );
  const showEditprofile = user.uid == userProfile.uid;

  return (
    <Container maxW={"container.lg"}>
      <div className="flex items-center gap-10 md:gap-20 md:pl-12 pt-9 md:pt-24">
        <Avatar
          src={userProfile.profilePicURL || "/profilepic.png"}
          size={{ base: "sm", md: "md" }}
          name="roseline"
        />
        <div className="">
          <div className="flex items-center gap-4">
            <p className="font-semibold">{userProfile?.username}</p>
            {showEditprofile && (
              <button onClick={onOpen} className="bg-white rounded-sm text-black text-sm font-bold px-2 py-1">
                <span className="hidden md:block"> Edit Profile</span>
                <div className="block md:hidden">
                  <FiEdit size={20} />
                </div>
              </button>
            )}
            {!showEditprofile && (
              <button className="bg-blue-500 rounded-sm text-white text-sm font-bold px-2 py-1">
                <span> Follow</span>
              </button>
            )}
          </div>
          <div className="flex gap-3 items-center my-2 text-sm">
            <p className="font-bold">
              {userProfile.posts.length} <span>Posts</span>
            </p>
            <p className="font-bold">
              {userProfile.followers.length} <span>Followers</span>
            </p>
            <p className="font-bold">
              {userProfile.following.length} <span>Following</span>
            </p>
          </div>
          <p className="font-extrabold text-sm my-2">As a Programmer</p>
          <p className="text-md">
            {userProfile.bio ||
              "I love to code and i can't wait to start working as a programmer."}
          </p>
        </div>
      </div>
      <ProfileTab />

      <ProfilePosts />
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose}/>}
    </Container>
  );
};

export default Profilepage;
