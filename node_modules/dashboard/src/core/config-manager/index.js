const STORAGE_PREFIX = 'chimera:module-config:';

function getStorageKey(moduleId) {
  return `${STORAGE_PREFIX}${moduleId}`;
}

export function saveConfig(moduleId, config) {
  if (typeof moduleId !== 'string' || !moduleId) {
    throw new Error('saveConfig: moduleId must be a non-empty string');
  }
  try {
    const serialized = JSON.stringify(config ?? {});
    localStorage.setItem(getStorageKey(moduleId), serialized);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('saveConfig failed:', error);
    throw error;
  }
}

export function loadConfig(moduleId, fallback = {}) {
  if (typeof moduleId !== 'string' || !moduleId) {
    throw new Error('loadConfig: moduleId must be a non-empty string');
  }
  try {
    const raw = localStorage.getItem(getStorageKey(moduleId));
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('loadConfig failed, returning fallback:', error);
    return fallback;
  }
}