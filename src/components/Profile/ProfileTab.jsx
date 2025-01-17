import { BsGrid3X3 } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

const ProfileTab = () => {
  return (
    <div className="flex justify-center md:gap-16 gap-3 mt-20 mb-3">
        <div className="flex items-center gap-1 border-t-2 pt-3 border-white">
          <BsGrid3X3 size={22} />
          <p className="font-extrabold text-sm">POSTS</p>
        </div>
        <div className="flex items-center gap-1 pt-3">
          <FaRegBookmark size={22} />
          <p className="font-extrabold text-sm">SAVED</p>
        </div>
        <div className="flex items-center gap-1 pt-3">
          <FaRegHeart size={22} />
          <p className="font-extrabold text-sm">LIKES</p>
        </div>
      </div>
  )
}

export default ProfileTab