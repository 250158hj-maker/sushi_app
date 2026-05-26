const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL ?? "").replace(
  /\/+$/,
  "",
);

// 注文データ取得 API
export async function loadOrders(visitId, options = {}) {
  if (Number(visitId) <= 0) {
    return { orders: [], total: 0 };
  }

  let url = `${apiBaseUrl}/api/order/fetch`;
  url += `?visit_id=${encodeURIComponent(String(visitId))}`;

  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? payload.message ?? "API request failed");
  }

  return { orders: payload.orders ?? [], total: payload.total ?? 0 };
}

// 注文追加 API
export async function submitOrder(visitId, product, quantity, options = {}) {
  const productId = Number(product.id);
  const url = `${apiBaseUrl}/api/order/add`;
  // 3. body: JSON　で { product_id, quantity, visit_id }
  const response = await fetch(url, {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
    body: JSON.stringify({
      product_id: productId,
      quantity,
      visit_id: visitId,
    }),
  });
  // レスポンスの JSON をパースして、payload 変数に格納
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? payload.message ?? "API request failed");
  }

  return payload;
}

// 注文確定 API
export async function checkoutOrder(visitId, options = {}) {
  // エンドポイント: api/order/billed
  const url = `${apiBaseUrl}/api/order/billed`;
  const response = await fetch(url, {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
    body: JSON.stringify({ visit_id: Number(visitId) }),
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? payload.message ?? "API request failed");
  }

  return payload;
}
