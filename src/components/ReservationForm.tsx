import React, { useState } from "react";
import { createReservation } from "../services/reservation.services";
import { Reservation } from "@/services/types";

const ReservationForm: React.FC = () => {
  const [customer_name, setCustomerName] = useState<string>("");
  //const [number_of_people, setNumberOfPeople] = useState<number | "">("");
  const [reservation_datetime, setReservationDatetime] = useState<string>("");
  //const [status, setStatus] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  //const [total_cost, setTotalCost] = useState<number | "">("");
  //const [id_reservation, setIdReservation] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newReservation: Reservation = {
        customer_name,
        reservation_datetime,
        age: age as number,
      };

      const response = await createReservation(newReservation);
      if (response.id_reservation) {
        setSuccess(true);
        setCustomerName("");
        setReservationDatetime("");
        setAge("");
        setError(null);
        console.log(
          "Resumen de la reserva",
          response.customer_name,
          response.reservation_datetime,
          response.age,
          response.id_reservation
        );
      }
    } catch (error) {
      setError("Error creating reservation");
      console.error("Error creating reservation:", error);
      setSuccess(false);
    }
  };

  return (
    <form
      className="px-8 pb-8 mt-6 mb-4 md:w-1/3 md:mt-12"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4 text-xl font-bold">Crea una nueva reserva</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <p className="text-green-500">Reservación Creada Satisfactoriamente!</p>
      )}
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="customer_name"
        >
          Nombre
        </label>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="customer_name"
          type="text"
          placeholder="Escribe tu nombre"
          value={customer_name}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="reservation_datetime"
        >
          Selecciona fecha y hora de tu reserva
        </label>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="reservation_datetime"
          type="datetime-local"
          value={reservation_datetime}
          onChange={(e) => setReservationDatetime(e.target.value)}
          required
        />
      </div>
      {/* <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="number_of_people"
        >
          Number of People
        </label>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="number_of_people"
          type="number"
          placeholder="e.g. 2"
          value={number_of_people}
          onChange={(e) => setNumberOfPeople(e.target.valueAsNumber || "")}
          required
        />
      </div> */}

      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="age"
        >
          Edad
        </label>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="age"
          type="number"
          placeholder="Coloca tu edad aqui"
          value={age}
          onChange={(e) => setAge(e.target.valueAsNumber || "")}
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Crear
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <div className="text-green-500">Resumen</div>}
      </div>
    </form>
  );
};

export default ReservationForm;
