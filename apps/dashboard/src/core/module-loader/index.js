import { getModule, registerModule } from '../module-registry';

// Discover modules in two locations:
// 1) App-local modules under src/modules/*/index.*
// 2) Workspace-level modules under modules/*/src/index.* (may require Vite fs allow; best-effort)
const localEntries = import.meta.glob('/src/modules/*/index.{js,jsx,ts,tsx}');
const workspaceEntries = import.meta.glob('/modules/*/src/index.{js,jsx,ts,tsx}', { eager: false });

const availableModuleEntries = { ...workspaceEntries, ...localEntries };

function normalizeLoadedModule(mod) {
  return mod?.default || mod?.module || mod?.Module || mod;
}

export const ModuleLoader = {
  async load(moduleId) {
    const existing = getModule(moduleId);
    if (existing) return existing;

    const entryPaths = Object.keys(availableModuleEntries);

    for (const path of entryPaths) {
      const importer = availableModuleEntries[path];
      try {
        const mod = await importer();
        const def = normalizeLoadedModule(mod);
        if (def && def.id === moduleId) {
          registerModule(def);
          return def;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`[ModuleLoader] Failed loading candidate ${path}:`, e);
      }
    }

    throw new Error(`ModuleLoader: module "${moduleId}" not found`);
  },
};

export default ModuleLoader;