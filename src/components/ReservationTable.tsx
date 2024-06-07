import { Reservation } from "@/services/types";
import React from "react";

interface ReservationsTableProps {
  reservations: Reservation[];
  onUpdate: (id: number, updatedReservation: Omit<Reservation, "id">) => void;
  onDelete: (id: number) => void;
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({
  reservations,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 leading-4 tracking-wider text-left text-gray-600 border-b-2 border-gray-200">
              Client
            </th>
            <th className="px-6 py-3 leading-4 tracking-wider text-left text-gray-600 border-b-2 border-gray-200">
              Date
            </th>
            <th className="px-6 py-3 leading-4 tracking-wider text-left text-gray-600 border-b-2 border-gray-200">
              Time
            </th>
            <th className="px-6 py-3 leading-4 tracking-wider text-left text-gray-600 border-b-2 border-gray-200">
              People
            </th>
            <th className="px-6 py-3 leading-4 tracking-wider text-left text-gray-600 border-b-2 border-gray-200">
              Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200"></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td className="px-6 py-4 border-b border-gray-200">
                {reservation.customer_name}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {new Date(
                  reservation.reservation_datetime
                ).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {new Date(
                  reservation.reservation_datetime
                ).toLocaleTimeString()}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {reservation.number_of_people}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {reservation.status}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() =>
                    onUpdate(reservation.id!, {
                      customer_name: reservation.customer_name,
                      number_of_people: reservation.number_of_people,
                      reservation_datetime: reservation.reservation_datetime,
                      status: reservation.status!,
                    })
                  }
                >
                  Update
                </button>
                <button
                  className="ml-4 text-red-600 hover:text-red-900"
                  onClick={() => onDelete(reservation.id!)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsTable;
