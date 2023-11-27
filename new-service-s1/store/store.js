import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useS1Store = create(
  subscribeWithSelector((set) => ({
    newServiceState: undefined,
    setNewServiceState: (newServiceState) => set(() => ({ newServiceState: newServiceState })),
    removeCurrentUser: () => set({ newServiceState: undefined }),
  }))
);

export default useS1Store;