import React, { useState, useEffect } from "react";
import { Reservation } from "./services/types";
import {
  createReservation,
  deleteReservation,
  getReservations,
  updateReservation,
} from "./services/reservation.services";
import ReservationsTable from "./components/ReservationTable";
import ReservationForm from "./components/ReservationForm";

const App: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const data = await getReservations();
    setReservations(data);
  };

  const handleCreate = async (
    newReservation: Omit<Reservation, "id" | "status">
  ) => {
    const createdReservation = await createReservation({
      ...newReservation,
      status: "active",
    });
    setReservations([...reservations, createdReservation]);
  };

  const handleUpdate = async (
    id: number,
    updatedReservation: Omit<Reservation, "id">
  ) => {
    await updateReservation(id, updatedReservation);
    fetchReservations();
  };

  const handleDelete = async (id: number) => {
    await deleteReservation(id);
    fetchReservations();
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Reservations</h1>
      <ReservationsTable
        reservations={reservations}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <h2 className="mt-8 mb-4 text-xl font-bold">New Reservation</h2>
      <ReservationForm onCreate={handleCreate} />
    </div>
  );
};

export default App;
