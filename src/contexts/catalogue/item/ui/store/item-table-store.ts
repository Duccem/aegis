import { Primitives } from "@/contexts/shared/domain/primitives";
import { Column, RowSelectionState, Updater } from "@tanstack/react-table";
import { create } from "zustand";
import { Item } from "../../domain/item";

interface ItemTableStore {
  columns: Column<Primitives<Item>>[];
  setColumns: (columns?: Column<Primitives<Item>>[]) => void;
  setRowSelection: (updater: Updater<RowSelectionState>) => void;
  rowSelection: RowSelectionState;
}

export const useItemTableStore = create<ItemTableStore>((set) => ({
  columns: [],
  setColumns: (columns) => set({ columns }),
  rowSelection: {},
  setRowSelection: (updater) =>
    set((state) => ({
      rowSelection: typeof updater === "function" ? updater(state.rowSelection) : updater,
    })),
}));
