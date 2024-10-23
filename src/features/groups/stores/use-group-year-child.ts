import { create } from "zustand";

type GroupYearChildStore = {
  isOpen: Record<string, boolean>;
  onToggle: (year: string) => void;
}

export const useGroupYearChild = create<GroupYearChildStore>((set) => ({
  isOpen: {},
  onToggle: (year) => set((state) => ({
    isOpen: {
      ...state.isOpen,
      [year]: !state.isOpen[year],
    }
  })),
}));