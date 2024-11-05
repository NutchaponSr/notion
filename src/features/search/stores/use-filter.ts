import { create } from "zustand";
import { Category } from "@/types";

type FilterStore = {
  peoples: string[];
  categories: Category[];
  onPeoples: (peoples: string[]) => void;
  onCategories: (categories: string[]) => void;
}

export const useFilter = create<FilterStore>((set) => ({
  peoples: [],
  categories: [],
  onPeoples: (peoples) => set({ peoples }),
  onCategories: (categories) => set({ categories: categories as Category[] }),
}));