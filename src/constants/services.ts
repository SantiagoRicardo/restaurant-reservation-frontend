// services.ts
const BASE_URL = "http://127.0.0.1:8000";

export const RESERVATION_SERVICES = {
  GET_ALL: `${BASE_URL}/reservations`,
  GET_BY_ID: (id: number) => `${BASE_URL}/reservations/${id}`,
  CREATE: `${BASE_URL}/reservations`,
  UPDATE: (id: number) => `${BASE_URL}/reservations/${id}`,
  DELETE: (id: number) => `${BASE_URL}/reservations/${id}`,
};
