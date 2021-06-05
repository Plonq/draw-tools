export function getQueryParam(key: string, fallback?: any) {
  const params = new URLSearchParams(window.location.search);
  if (params.has(key)) {
    return params.get(key);
  }
  if (fallback !== undefined) {
    return fallback;
  }
  throw new Error(`Key error: key '${key}' does not exist in params`);
}

export function setQueryParam(key: string, value: string | number) {
  const params = new URLSearchParams(window.location.search);
  params.set(key, String(value));
  window.history.replaceState(null, null, `?${params.toString()}`);
}
