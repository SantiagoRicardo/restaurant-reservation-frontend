import { Reservation } from "@/services/types";
import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
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
  const StyleTable =
    "px-6 py-4 leading-4 tracking-wider text-left text-gray-600 border-b-2 border-gray-200";
  const StyleItemTable = "px-6 py-4 border-b border-gray-200";
  return (
    <div className="justify-between overflow-x-auto md:p-10">
      <div>
        <h1 className="text-2xl font-bold">Reservations</h1>
        <p>Manage your upcoming reservations!</p>
      </div>
      <div className="container mt-28">
        <table className="table w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className={StyleTable}>Client</th>
              <th className={StyleTable}>Date</th>
              <th className={StyleTable}>Time</th>
              <th className={StyleTable}>People</th>
              <th className={StyleTable}>Status</th>
              <th className={StyleTable}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className={StyleItemTable}>{reservation.customer_name}</td>
                <td className={StyleItemTable}>
                  {new Date(
                    reservation.reservation_datetime
                  ).toLocaleDateString()}
                </td>
                <td className={StyleItemTable}>
                  {new Date(
                    reservation.reservation_datetime
                  ).toLocaleTimeString()}
                </td>
                <td className={StyleItemTable}>
                  {reservation.number_of_people}
                </td>
                <td className={StyleItemTable}>{reservation.status}</td>
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
                    className="p-2 ml-4 text-white bg-red-500 rounded hover:bg-red-900"
                    onClick={() => onDelete(reservation.id!)}
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsTable;
