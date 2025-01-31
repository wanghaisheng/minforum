type ActionCallback = (...args: any[]) => void;
type FilterCallback<T = any> = (value: T, ...args: any[]) => T;

const actions: { [hookName: string]: ActionCallback[] } = {};
const hooks: { [hookName: string]: FilterCallback[] } = {};

// List of reserved hook names
const RESERVED_HOOK_NAMES = new Set([
  'update',
  'updateExtension',
  'updateExtensions',
  'checkVersion',
  'makePayments',
  // 'paymentModal',
  'deactivate',
  'activate'
]);

// Helper function to check if a hook name is reserved
function isReservedHookName(hookName: string): boolean {
  return RESERVED_HOOK_NAMES.has(hookName);
}

export function addAction(hookName: string, callback: ActionCallback): void {
  if (isReservedHookName(hookName)) {
    throw new Error(`Hook name "${hookName}" is reserved and cannot be used.`);
  }

  if (!actions[hookName]) {
    actions[hookName] = [];
  }
  actions[hookName].push(callback);
}

export function doAction(hookName: string, ...args: any[]): any[] {
  const results: any[] = [];
  if (actions[hookName]) {
    actions[hookName].forEach((callback) => {
      const result = callback(...args);
      results.push(result);
    });
  }
  return results?.[0];
}

export function addFilter<T = any>(
  hookName: string,
  callback: FilterCallback<T>
): void {
  if (isReservedHookName(hookName)) {
    throw new Error(`Hook name "${hookName}" is reserved and cannot be used.`);
  }

  if (!hooks[hookName]) {
    hooks[hookName] = [];
  }
  hooks[hookName].push(callback);
}

export function applyFilters<T = any>(
  hookName: string,
  value: T,
  ...args: any[]
): T {
  if (hooks[hookName]) {
    return hooks[hookName].reduce(
      (result, callback) => callback(result, ...args),
      value
    );
  }
  return value;
}
