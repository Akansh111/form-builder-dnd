import { create } from 'zustand';

interface IActiveElement {
  id: string;
  type: string;
}

interface IDragContext {
  activeElement: IActiveElement | null;
  setActiveElement: (activeElement: IActiveElement | null) => void;

  addComponentVisible: boolean;
  setAddComponentVisible: (addComponentVisible: boolean) => void;
}

export const useDragContext = create<IDragContext>((set) => ({
  activeElement: null,
  setActiveElement: (activeElement) => set({ activeElement }),

  addComponentVisible: true,
  setAddComponentVisible: (addComponentVisible) => set({ addComponentVisible }),
}));
