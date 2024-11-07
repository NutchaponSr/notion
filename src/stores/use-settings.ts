import { create } from "zustand";

import { SettingChild } from "@/types";

type SettingStore = {
  child: SettingChild;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChild: (child: SettingChild) => void;
}

export const useSettings = create<SettingStore>((set) => ({
  child: "account",
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onChild: (child) => set({ child }),
}));
