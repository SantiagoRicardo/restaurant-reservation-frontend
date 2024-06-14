import axios from "axios";
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
      console.log("Bearer Token", response.data as Token);
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
  reservation: Omit<Reservation, "id">,
  token: string
) => {
  const updatedReservation = {
    ...reservation,
    age: Number(reservation.age),
  };

  const response = await api.put(`/reservations/${id}`, updatedReservation, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteReservation = async (id: number, token: string) => {
  try {
    const response = await api.delete(`/reservations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      alert("Acceso denegado. Solo el gerente puede eliminar reservaciones.");
      throw new Error("Acceso denegado.");
    } else {
      console.error("Error al eliminar la reservación:", error);
      throw error;
    }
  }
};
