// Module Registry: manages lifecycle-less module definitions

const moduleRegistry = new Map();

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validateModuleDefinition(moduleDefinition) {
  const requiredFields = ['id', 'name', 'component', 'defaultConfig'];

  for (const field of requiredFields) {
    if (!(field in moduleDefinition)) {
      throw new Error(`Module definition missing required field: ${field}`);
    }
  }

  if (typeof moduleDefinition.id !== 'string' || moduleDefinition.id.trim() === '') {
    throw new Error('Module id must be a non-empty string');
  }
  if (typeof moduleDefinition.name !== 'string' || moduleDefinition.name.trim() === '') {
    throw new Error('Module name must be a non-empty string');
  }

  // component can be a React component (function/class) or a lazy component object
  const componentType = typeof moduleDefinition.component;
  if (componentType !== 'function' && !isObject(moduleDefinition.component)) {
    throw new Error('Module component must be a function or an object (e.g., React.lazy)');
  }

  if (!isObject(moduleDefinition.defaultConfig)) {
    throw new Error('Module defaultConfig must be an object');
  }

  if (
    'configSchema' in moduleDefinition &&
    moduleDefinition.configSchema !== undefined &&
    !isObject(moduleDefinition.configSchema)
  ) {
    throw new Error('Module configSchema must be an object when provided');
  }
}

export function registerModule(moduleDefinition) {
  validateModuleDefinition(moduleDefinition);

  const id = moduleDefinition.id;
  if (moduleRegistry.has(id)) {
    // If already registered with the same reference, ignore; otherwise throw
    const existing = moduleRegistry.get(id);
    if (existing !== moduleDefinition) {
      throw new Error(`Module with id "${id}" is already registered`);
    }
    return existing;
  }

  moduleRegistry.set(id, moduleDefinition);
  return moduleDefinition;
}

export function getModule(moduleId) {
  return moduleRegistry.get(moduleId) || null;
}

export function getAllModules() {
  return Array.from(moduleRegistry.values());
}

export function clearRegistry() {
  moduleRegistry.clear();
}