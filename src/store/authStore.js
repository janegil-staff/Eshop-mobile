import { create } from "zustand";
import { tokenStorage } from "../api/client";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  hydrate: async () => {
    const token = await tokenStorage.get();
    set({ token, isAuthenticated: !!token });
  },

  setAuth: async ({ user, token }) => {
    await tokenStorage.set(token);
    set({ user, token, isAuthenticated: true });
  },

  logout: async () => {
    await tokenStorage.clear();
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
