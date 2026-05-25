const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

export async function loadCategories(options = {}) {
  const url = `${apiBaseUrl}/api/category/fetch`;
  // TODO: Fetch API でカテゴリデータを取得
  // const response = await fetch(url, options);
  // TODO: レスポンスの JSON をパースして、payload 変数に格納
  // const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? payload.message ?? 'API request failed');
  }

  return payload.categories ?? [];
}
