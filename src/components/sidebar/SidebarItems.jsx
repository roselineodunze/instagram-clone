import SearchUser from "./SearchUser";
import CreatePost from "./CreatePost";
import HomeItem from "./HomeItem";
import Notifications from "./Notifications";
import ProfileItem from "./ProfileItem";

const SidebarItems = () => {
  return (
    <>
      <HomeItem />
      <SearchUser />
      <Notifications />

      <CreatePost />
      <ProfileItem />
    </>
  );
};

export default SidebarItems;
