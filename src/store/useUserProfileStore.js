import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  userProfile: null,
  setUserprofile: (userProfile) => set({ userProfile }),
  addPost: (postDoc) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: [postDoc.id, ...state.userProfile.posts],
      },
    })),
}));

export default useUserProfileStore;
