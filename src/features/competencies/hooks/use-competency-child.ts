import { create } from "zustand";

type CompetencyChildStore = {
  isOpen: boolean;
  onToggle: () => void;
}

export const useCompetencyChild = create<CompetencyChildStore>((set) => ({
  isOpen: false,
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));