import { create } from "zustand";

import { SortDirection } from "@/types";
import { Header, headers } from "@/features/groups/types";

type SortStore = {
  sorts: Header[];
  activeSort: Header | null;
  isActive: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onActive: (sort: Header) => void;
  onRemove: () => void;
  onDirection: (direction: SortDirection) => void;
}

export const useSort = create<SortStore>((set) => ({
  sorts: headers,
  activeSort: null,
  isActive: false,
  isOpen: false,
  onActive: (sort) => set(() => ({
    activeSort: sort,
    sorts: headers.filter((item) => item.label !== sort.label),
    isActive: true,
  })),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
  onRemove: () => set(() => ({
    activeSort: null,
    sorts: headers,
    isActive: false
  })),
  onDirection: (direction) => set((state) => ({
    activeSort: state.activeSort ? {
      ...state.activeSort,
      direction
    } : null
  }))
}))
