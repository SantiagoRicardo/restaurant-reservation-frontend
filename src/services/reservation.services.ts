import api from "@/constants/services";

interface Reservation {
  id?: number;
  customer_name: string;
  number_of_people: number;
  reservation_datetime: string;
  status?: string;
}

export const getReservations = async () => {
  const response = await api.get("/reservations/");
  return response.data;
};

export const createReservation = async (reservation: Reservation) => {
  const response = await api.post("/reservations/", reservation);
  return response.data;
};

export const updateReservation = async (
  id: number,
  reservation: Omit<Reservation, "id">
) => {
  const response = await api.put(`/reservations/${id}`, reservation);
  return response.data;
};

export const deleteReservation = async (id: number) => {
  const response = await api.delete(`/reservations/${id}`);
  return response.data;
};
