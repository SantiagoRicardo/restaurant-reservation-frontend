import api from "../constants/services";
import { Reservation, Token, UserToken } from "./types";

export const getTokenLogin = async (
  userToken: UserToken
): Promise<Token | null> => {
  try {
    const params = new URLSearchParams();
    params.append("username", userToken.username);
    params.append("password", userToken.password);

    const response = await api.post("/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      console.log("Bearrer Token", response.data as Token);
      return response.data as Token;
    } else {
      console.error("Error en la respuesta del servidor:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return null;
  }
};

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
