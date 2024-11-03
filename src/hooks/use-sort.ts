import { create } from "zustand";

export type SortType = "EDITED_ASC" | "EDITED_DESC" | "CREATED_ASC" | "CREATED_DESC" | null;

type SortStore = {
  sort: SortType;
  onSort: (sort: SortType) => void;
}

export const useSort = create<SortStore>((set) => ({
  sort: null,
  onSort: (sort) => set({ sort }),
}));