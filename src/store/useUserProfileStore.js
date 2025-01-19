import { create } from "zustand";

const useUserProfileStore = create((set) => ({
    userProfile: null,
    setUserprofile: (userProfile) => set({ userProfile  }),
  }));

export default useUserProfileStore