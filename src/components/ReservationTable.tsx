import { Reservation } from "@/services/types";
import React, { useState } from "react";
import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Omit<Reservation, "id">>({
    customer_name: "",
    number_of_people: 0,
    reservation_datetime: "",
    status: "",
  });

  const handleEditClick = (reservation: Reservation) => {
    if (reservation.id !== undefined) {
      setEditingId(reservation.id);
      setEditFormData({
        customer_name: reservation.customer_name,
        number_of_people: reservation.number_of_people,
        reservation_datetime: reservation.reservation_datetime,
        status: reservation.status || "",
      });
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: name === "number_of_people" ? Number(value) : value,
    }));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      onUpdate(editingId, editFormData);
      setEditingId(null);
    }
  };

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
              <React.Fragment key={reservation.id}>
                {editingId === reservation.id ? (
                  <tr className="items-center">
                    <td className={StyleItemTable}>
                      <input
                        type="text"
                        name="customer_name"
                        value={editFormData.customer_name}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </td>
                    <td className={StyleItemTable}>
                      <input
                        type="date"
                        name="reservation_datetime_date"
                        value={new Date(editFormData.reservation_datetime)
                          .toISOString()
                          .substring(0, 10)}
                        onChange={(e) =>
                          setEditFormData((prevData) => ({
                            ...prevData,
                            reservation_datetime: new Date(
                              e.target.value +
                                "T" +
                                new Date(editFormData.reservation_datetime)
                                  .toISOString()
                                  .substring(11, 19)
                            ).toISOString(),
                          }))
                        }
                        className="w-full px-3 py-2 border rounded"
                      />
                    </td>
                    <td className={StyleItemTable}>
                      <input
                        type="time"
                        name="reservation_datetime_time"
                        value={editFormData.reservation_datetime.substring(
                          11,
                          16
                        )}
                        onChange={(e) =>
                          setEditFormData((prevData) => ({
                            ...prevData,
                            reservation_datetime:
                              prevData.reservation_datetime.substring(0, 10) +
                              "T" +
                              e.target.value +
                              ":00",
                          }))
                        }
                        className="w-full px-3 py-2 border rounded"
                      />
                    </td>
                    <td className={StyleItemTable}>
                      <input
                        type="number"
                        name="number_of_people"
                        value={editFormData.number_of_people}
                        onChange={handleEditChange}
                        className="px-3 py-2 border rounded max-w-16 min-w-10"
                      />
                    </td>

                    <td className={StyleItemTable}>
                      <select
                        name="status"
                        value={editFormData.status}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border rounded"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className={StyleItemTable}>
                      <button
                        className="text-green-600 hover:text-green-900"
                        onClick={handleEditSubmit}
                      >
                        <CheckIcon className="w-6 h-6" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => setEditingId(null)}
                      >
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td className={StyleItemTable}>
                      {reservation.customer_name}
                    </td>
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
                    <td className={StyleItemTable}>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            reservation.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : reservation.status === "Cancelled"
                              ? "bg-red-100 text-red-800"
                              : reservation.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {reservation.status}
                      </span>
                    </td>
                    <td className="flex px-6 py-4 border-b border-gray-200">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => handleEditClick(reservation)}
                      >
                        <PencilSquareIcon className="w-6 h-6" />
                      </button>
                      <button
                        className="p-2 ml-4 text-white bg-red-500 rounded hover:bg-red-900"
                        onClick={() => onDelete(reservation.id!)}
                      >
                        <TrashIcon className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsTable;
