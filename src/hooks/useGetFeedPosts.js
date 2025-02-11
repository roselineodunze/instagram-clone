import { useEffect } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";


const useGetFeedPosts = () => {
    const {posts, setPosts} = usePostStore()
    const { showToast } = useShowToast();
    const {user} = useAuthStore()

    useEffect(() => {
        if (user?.following.length === 0){
            setPosts([])
            return
        } 
    
        const getPosts = async () => {
          try {
            const postsRef = collection(firestore, "posts");
            const q = query(
              postsRef,
              where("createdBy", "in", user.following),
                
            );
            
            const qSnapshot = await getDocs(q);
            const postData = []
            qSnapshot.forEach(doc => {
                postData.push({...doc.data(), id: doc.id})
            })
            postData.sort((a,b) => b.createdAt - a.createdAt)
            setPosts(postData)
    
          } catch (err) {
            showToast({
              title: "Error.",
              description: err.message || "Couldn't get feed posts.",
              status: "error",
            });
          }
    
        };
        if (user) getPosts()
    
    
      }, [user, showToast, setPosts]);

  return {posts}
}

export default useGetFeedPosts