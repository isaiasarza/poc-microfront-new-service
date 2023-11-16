// import { createStore } from "redux";
// import { GlobalStore } from "redux-micro-frontend";
// import { userReducer } from "./login.reducers";

// const store = createStore(userReducer);

// const globalStore = GlobalStore.Get();

// globalStore.RegisterStore("loginApp", store);

// export default store;

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
