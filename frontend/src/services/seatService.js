const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

export async function loadSeats(selectedSeatId, selectedSeatNumber, options = {}) {
  const url = `${apiBaseUrl}/api/seat/fetch`;
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? payload.message ?? 'API request failed');
  }

  const seats = payload.seats ?? [];
  const selectedSeat = resolveSeatSelection(seats, selectedSeatId, selectedSeatNumber);
  return { seats, selectedSeat };
}

export function findSeatById(seats, seatId) {
  return seats.find((seat) => Number(seat.id) === Number(seatId)) ?? null;
}

export function resolveSeatSelection(seats, selectedSeatId, fallbackSeatNumber = '-') {
  const matchedSeat = findSeatById(seats, selectedSeatId);

  if (matchedSeat) {
    return {
      seatId: Number(matchedSeat.id),
      seatNumber: matchedSeat.number,
      shouldPersist: false,
    };
  }

  if (seats.length === 1) {
    return {
      seatId: Number(seats[0].id),
      seatNumber: seats[0].number,
      shouldPersist: true,
    };
  }

  return {
    seatId: Number(selectedSeatId ?? 0),
    seatNumber: fallbackSeatNumber,
    shouldPersist: false,
  };
}
