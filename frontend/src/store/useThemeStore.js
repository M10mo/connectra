import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("connectra-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("connectra-theme", theme);
    set({ theme });
  },
}));
