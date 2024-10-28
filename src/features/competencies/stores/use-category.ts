import { create } from "zustand";

type CategoryStore = {
  isOpen: Record<string, boolean>;
  onToggle: (category: string) => void;
}

export const useCategory = create<CategoryStore>((set) => ({
  isOpen: {},
  onToggle: (category) => set((state) => ({
    isOpen: {
      ...state.isOpen,
      [category]: !state.isOpen[category],
    }
  })),
}));