const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

// 注文データ取得 API
export async function loadOrders(visitId, options = {}) {
  if (Number(visitId) <= 0) {
    return { orders: [], total: 0 };
  }

  // TODO: エンドポイント: api/order/fetch?visit_id={visitId}
  let url = `${apiBaseUrl}`;
  // クエリパラメータを URL に追加
  url += `?visit_id=${encodeURIComponent(String(visitId))}`;

  // Fetch API で注文データを取得
  const response = await fetch(url, options);
  // レスポンスの JSON をパースして、payload 変数に格納
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? payload.message ?? 'API request failed');
  }

  return { orders: payload.orders ?? [], total: payload.total ?? 0 };
}

// 注文追加 API
export async function submitOrder(visitId, product, quantity, options = {}) {
  const productId = Number(product.id);
  // TODO: エンドポイント: api/order/add
  const url = `${apiBaseUrl}`;
  // TODO: Fetch API で注文データを送信
  // 1. method: POST
  // 2. headers: 'Content-Type': 'application/json'
  // 3. body: JSON　で { product_id, quantity, visit_id }
  const response = await fetch(url, {
    ...options,
    method: '',
    headers: { 'Content-Type': '', ...(options.headers ?? {}) },
    body: JSON.stringify(),
  });
  // レスポンスの JSON をパースして、payload 変数に格納
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? payload.message ?? 'API request failed');
  }

  return payload;
}

// 注文確定 API
export async function checkoutOrder(visitId, options = {}) {
  // エンドポイント: api/order/billed
  const url = `${apiBaseUrl}/api/order/billed`;
  const response = await fetch(url, {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
    body: JSON.stringify({ visit_id: Number(visitId) }),
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? payload.message ?? 'API request failed');
  }

  return payload;
}
