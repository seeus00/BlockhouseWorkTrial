import { create } from 'zustand';

// State types
interface States {
  coinsData: any
}

// Action types
interface Actions {
  setCoinsData: (newCoinsData: any) => void;
}

export const useCoinsDataStore = create<States & Actions>((set) => ({
  // States
  coinsData: [],

  // Actions
  setCoinsData: (newCoinsData) => set((state) => ({ coinsData: [...newCoinsData] })),
}));