import { create } from "zustand";

export const useRiderStore = create((set) => ({
    rider: null,
    setRider: (rider) => set({ rider }),
    clearRider: () => set({ rider: null }),
}));