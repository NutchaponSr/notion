import { create } from "zustand";
import { Header, headers } from "../features/groups/types";

type FilterPopoverType = "main" | "table";

type FilterStore = {
  type: FilterPopoverType | null;
  isOpen: boolean;
  isActive: boolean;
  isFilter: boolean;
  filters: Header[];
  activeFilters: Header[];
  onActive: (filter: Header) => void;
  onOpen: (type: FilterPopoverType) => void;
  onClose: () => void;
  onToggle: () => void;
  onDelete: (label: string) => void;
}

export const useFilter = create<FilterStore>((set) => ({
  type: null,
  isOpen: false,
  filters: headers,
  activeFilters: [],
  isActive: false,
  isFilter: false,
  onActive: (filter) => set((state) => {
    const newActiveFilters = [...state.activeFilters, filter];
    return {
      activeFilters: newActiveFilters, 
      filters: state.filters.filter((item) => item.label !== filter.label),
      isActive: newActiveFilters.length > 0,
    };
  }),
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: null }),
  onToggle: () => set((state) => ({ isFilter: !state.isFilter })),
  onDelete: (label) => set((state) => {
    const deletedFilter = state.activeFilters.find(item => item.label === label);
    return {
      filters: deletedFilter 
        ? [...state.filters, deletedFilter]
        : state.filters,
      activeFilters: state.activeFilters.filter((item) => item.label !== label),
      isActive: state.activeFilters.length > 1,
    };
  }),
}));
