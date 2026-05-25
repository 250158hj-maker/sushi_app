const DEFAULT_ASSET_BASE_URL = import.meta.env.VITE_ASSET_BASE_URL ?? '/';

export function buildAssetUrl(path) {
  return `${String(DEFAULT_ASSET_BASE_URL).replace(/\/$/, '')}/${String(path ?? '').replace(/^\//, '')}`;
}
