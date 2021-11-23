import create from "zustand";
import { persist } from "zustand/middleware";

import { Token } from "@/resources/interfaces";

export type AuthorizationState = {
  token: Token | undefined;
  setToken: (token: Token) => void;
  removeToken: () => void;
};

export const useAuthorizationContext = create(
  persist(
    (set) => {
      const initialState: AuthorizationState = {
        token: undefined,
        setToken: (token) => set({ token }),
        removeToken: () => set({ token: undefined }),
      };
      return initialState;
    },
    {
      name: "auth-storage", // unique name
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    }
  )
);
