import { create } from "zustand";

type RequestModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRequestModal = create<RequestModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))