import create from "zustand";
import { persist } from "zustand/middleware";

import { Authorization } from "@/requests/authentication/types";

export type AuthorizationState = {
  token: Authorization.Token | undefined;
  setToken: (token: Authorization.Token) => void;
};

export const useAuthorizationContext = create(
  persist(
    (set, get) => {
      const initialState: AuthorizationState = {
        token: undefined,
        setToken: (token) => set({ token }),
      };
      return initialState;
    },
    {
      name: "auth-storage", // unique name
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    }
  )
);
