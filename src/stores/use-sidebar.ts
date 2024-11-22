import { create } from "zustand";

type SidebarStore = {
  isCollapsed: boolean;
  setCollapse: (collapse: boolean) => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  isCollapsed: false,
  setCollapse: (collapse: boolean) => set({ isCollapsed: collapse }),
}));