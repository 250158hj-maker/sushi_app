const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL ?? "").replace(
  /\/+$/,
  "",
);

export async function loadCategories(options = {}) {
  const url = `${apiBaseUrl}/api/category/fetch`;
  const response = await fetch(url, options);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error ?? payload.message ?? "API request failed");
  }

  return payload.categories ?? [];
}
