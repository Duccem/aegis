import { create } from "zustand";

interface ChatStore {
  isOpen: boolean;
  message?: string;
  chats?: any[];
  setOpen: (message?: string) => void;
}

export const useChatStore = create<ChatStore>()((set) => ({
  isOpen: false,
  message: undefined,
  chats: [],
  setOpen: (message) => set((state) => ({ isOpen: !state.isOpen, message })),
  setChats: (chats: any[]) => set({ chats }),
}));
