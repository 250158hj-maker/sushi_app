const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

export async function findVisitById(visitId, options = {}) {
  const url = `${apiBaseUrl}/api/visit/find?id=${encodeURIComponent(String(visitId))}`;
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? payload.message ?? 'API request failed');
  }

  return payload;
}

export async function joinVisit(seatId, options = {}) {
  const url = `${apiBaseUrl}/api/visit/join`;
  const response = await fetch(url, {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
    body: JSON.stringify({ seat_id: seatId }),
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? payload.message ?? 'API request failed');
  }

  return payload;
}
