import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useS3Store = create(
  subscribeWithSelector((set) => ({
    newServiceState: undefined,
    setNewServiceState: (newServiceState) => set(() => ({ newServiceState: newServiceState })),
    removeCurrentUser: () => set({ newServiceState: undefined }),
  }))
);

export default useS3Store;