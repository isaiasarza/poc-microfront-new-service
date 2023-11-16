import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useLoginStore = create(
  subscribeWithSelector((set) => ({
    currentUser: undefined,
    setCurrentUser: (currentUser) => set(() => ({ currentUser: currentUser })),
    removeCurrentUser: () => set({ currentUser: undefined }),
  }))
);

export default useLoginStore;
