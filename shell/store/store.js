import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const globalStore = create(
  subscribeWithSelector((set) => ({
    newServiceState: undefined,
    setNewServiceState: (newServiceState) =>
      set(() => ({ newServiceState: newServiceState })),
    removeCurrentUser: () => set({ newServiceState: undefined }),
    accountInfo: undefined,
    setAccountInfo: (accountInfo) => set(() => ({ accountInfo: accountInfo })),
  }))
);

export default globalStore;
