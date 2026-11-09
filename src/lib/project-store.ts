import { create } from 'zustand';
import { buildEstimate, defaultModifiers, defaultProject, type ProjectInput, type ProjectSettings } from '@/engine';

export type RateOverrideMap = Record<string, number>;

type ProjectStore = {
  project: ProjectInput;
  modifiers: ProjectSettings;
  overrides: RateOverrideMap;
  estimate: ReturnType<typeof buildEstimate>;
  setField: <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) => void;
  setModifier: <K extends keyof ProjectSettings>(key: K, value: ProjectSettings[K]) => void;
  setOverride: (materialKey: string, value: number) => void;
  setProject: (patch: Partial<ProjectInput>) => void;
  resetDefault: () => void;
};

const refreshEstimate = (project: ProjectInput, overrides: RateOverrideMap, modifiers: ProjectSettings) =>
  buildEstimate(project, overrides, modifiers);

export const useProjectStore = create<ProjectStore>((set, get) => ({
  project: { ...defaultProject },
  modifiers: { ...defaultModifiers },
  overrides: {},
  estimate: refreshEstimate({ ...defaultProject }, {}, { ...defaultModifiers }),

  setField: (key, value) => {
    const project = { ...get().project, [key]: value };
    set({ project, estimate: refreshEstimate(project, get().overrides, get().modifiers) });
  },

  setModifier: (key, value) => {
    const modifiers = { ...get().modifiers, [key]: value };
    set({ modifiers, estimate: refreshEstimate(get().project, get().overrides, modifiers) });
  },

  setOverride: (materialKey, value) => {
    const overrides = { ...get().overrides, [materialKey]: Number(value) || 0 };
    set({ overrides, estimate: refreshEstimate(get().project, overrides, get().modifiers) });
  },

  setProject: (patch) => {
    const project = { ...get().project, ...patch };
    set({ project, estimate: refreshEstimate(project, get().overrides, get().modifiers) });
  },

  resetDefault: () => {
    const project = { ...defaultProject };
    const modifiers = { ...defaultModifiers };
    const overrides: RateOverrideMap = {};
    set({ project, modifiers, overrides, estimate: refreshEstimate(project, overrides, modifiers) });
  },
}));
