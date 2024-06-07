import React, { useState } from "react";

interface ReservationFormProps {
  onCreate: (reservation: Omit<Reservation, "id" | "status">) => void;
}

interface Reservation {
  id?: number;
  customer_name: string;
  number_of_people: number;
  reservation_datetime: string;
  status?: string;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onCreate }) => {
  const [customer_name, setCustomerName] = useState("");
  const [number_of_people, setNumberOfPeople] = useState<number | "">("");
  const [reservation_datetime, setReservationDatetime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      customer_name,
      number_of_people: Number(number_of_people),
      reservation_datetime,
    });
    setCustomerName("");
    setNumberOfPeople("");
    setReservationDatetime("");
  };

  return (
    <form
      className="px-8 pb-8 mt-6 mb-4 bg-white md:w-1/3 md:mt-12"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4 text-xl font-bold">New Reservation</h2>
      <div className="mb-4">
        <label
          className="block mt-12 mb-2 text-sm font-bold text-gray-700"
          htmlFor="customer_name"
        >
          Client's Name
        </label>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="customer_name"
          type="text"
          placeholder="e.g. Jane Smith"
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
          Date
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
      <div className="mb-4">
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
      </div>
      <div className="flex items-center justify-between">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
