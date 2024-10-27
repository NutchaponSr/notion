import { create } from "zustand";

type GroupItemChildStore = {
  isOpen: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export const useGroupItemChild = create<GroupItemChildStore>((set) => ({
  isOpen: {},
  onToggle: (id) => set((state) => ({
    isOpen: {
      ...state.isOpen,
      [id]: !state.isOpen[id],
    }
  })),
}));