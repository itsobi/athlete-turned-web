import { create } from 'zustand';

type NumberOfChatsState = {
  count: number;
  add: () => void;
  setNumberOfChats: (number: number) => void;
  zero: () => void;
};

export const useNumberOfChatsStore = create<NumberOfChatsState>((set) => ({
  count: 0,
  add: () => set((state) => ({ count: state.count + 1 })),
  setNumberOfChats: (number) => set({ count: number }),
  zero: () => set({ count: 0 }),
}));
