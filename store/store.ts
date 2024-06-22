import { create } from 'zustand';

type NumberOfChatsState = {
  count: number;
  add: () => void;
  setNumberOfChats: (number: number) => void;
  zero: () => void;
};

type IsMentorState = {
  isMentor: boolean;
  setIsMentor: (isMentor: boolean) => void;
};

type FullNameState = {
  fullName: string;
  setFullName: (fullName: string) => void;
};

export const useNumberOfChatsStore = create<NumberOfChatsState>((set) => ({
  count: 0,
  add: () => set((state) => ({ count: state.count + 1 })),
  setNumberOfChats: (number) => set({ count: number }),
  zero: () => set({ count: 0 }),
}));

export const useIsMentorStore = create<IsMentorState>((set) => ({
  isMentor: false,
  setIsMentor: (isMentor) => set({ isMentor }),
}));

export const useFullNameStore = create<FullNameState>((set) => ({
  fullName: '',
  setFullName: (fullName) => set({ fullName }),
}));
