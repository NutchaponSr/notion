import { create } from "zustand";

type UserStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useUser = create<UserStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));