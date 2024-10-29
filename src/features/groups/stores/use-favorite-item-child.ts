import { create } from "zustand";

type FavoriteItemChildStore = {
  isOpen: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export const useFavoriteItemChild = create<FavoriteItemChildStore>((set) => ({
  isOpen: {},
  onToggle: (id) => set((state) => ({
    isOpen: {
      ...state.isOpen,
      [id]: !state.isOpen[id],
    }
  })),
}));