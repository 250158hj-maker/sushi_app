const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

export async function loadProducts(categoryId, options = {}) {
  const query = new URLSearchParams();

  if (Number(categoryId) > 0) {
    query.set('category_id', String(categoryId));
  }

  const queryString = query.toString();
  // TODO: エンドポイント: api/product/fetch?category_id={categoryId}
  // let url = `${apiBaseUrl}`;
  let url = `${apiBaseUrl}/api/product/fetch`;
  // クエリパラメータを URL に追加
  url += queryString ? `?${queryString}` : '';
  // Fetch API で商品データを取得
  const response = await fetch(url, options);
  // レスポンスの JSON をパースして、payload 変数に格納
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? payload.message ?? 'API request failed');
  }

  return payload.products ?? payload.data ?? [];
}
