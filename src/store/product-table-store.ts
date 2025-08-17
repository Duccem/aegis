import { Product } from "@/lib/core/product/domain/product";
import { Primitives } from "@/lib/types/primitives";
import { Column, RowSelectionState, Updater } from "@tanstack/react-table";
import { create } from "zustand";

interface ProductTableStore {
  columns: Column<Primitives<Product>>[];
  setColumns: (columns?: Column<Primitives<Product>>[]) => void;
  setRowSelection: (updater: Updater<RowSelectionState>) => void;
  rowSelection: RowSelectionState;
}

export const useProductTableStore = create<ProductTableStore>((set) => ({
  columns: [],
  setColumns: (columns) => set({ columns }),
  rowSelection: {},
  setRowSelection: (updater) =>
    set((state) => ({
      rowSelection: typeof updater === "function" ? updater(state.rowSelection) : updater,
    })),
}));
