// api.ts
import { RESERVATION_SERVICES } from "@/constants/services";
import axios, { AxiosResponse } from "axios";

interface Reservation {
  customer_name: string;
  number_of_people: number;
  reservation_datetime: string;
  status: string;
}

export function getAllReservations(): Promise<AxiosResponse> {
  return axios.get(RESERVATION_SERVICES.GET_ALL);
}

export function getReservationById(id: number): Promise<AxiosResponse> {
  return axios.get(RESERVATION_SERVICES.GET_BY_ID(id));
}

export function createReservation(
  newReservation: Reservation
): Promise<AxiosResponse> {
  return axios.post(RESERVATION_SERVICES.CREATE, newReservation);
}

export function updateReservation(
  id: number,
  updatedReservation: Reservation
): Promise<AxiosResponse> {
  return axios.put(RESERVATION_SERVICES.UPDATE(id), updatedReservation);
}

export function deleteReservation(id: number): Promise<AxiosResponse> {
  return axios.delete(RESERVATION_SERVICES.DELETE(id));
}
