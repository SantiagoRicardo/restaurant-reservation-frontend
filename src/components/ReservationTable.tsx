import React, { useEffect, useState } from "react";
import { Reservation } from "@/services/types";
import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  getReservations,
  updateReservation,
  deleteReservation,
} from "../services/reservation.services";

const ReservationsTable: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Omit<Reservation, "id">>({
    customer_name: "",
    reservation_datetime: "",
    age: 0,
    status: "",
  });

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const data = await getReservations();
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleEditClick = (reservation: Reservation) => {
    if (reservation.id !== undefined) {
      setEditingId(reservation.id);
      setEditFormData({
        customer_name: reservation.customer_name,
        reservation_datetime: reservation.reservation_datetime,
        age: reservation.age,
        status: reservation.status,
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

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      try {
        await updateReservation(editingId, editFormData);
        fetchReservations(); // Refetch reservations after update
        setEditingId(null);
      } catch (error) {
        console.error("Error updating reservation:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteReservation(id);
      fetchReservations(); // Refetch reservations after delete
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const StyleTable =
    "px-6 py-4 leading-4 tracking-wider text-left text-gray-600 border-b-2 border-gray-200";
  const StyleItemTable = "px-6 py-4 border-b border-gray-200";

  return (
    <div className="justify-between overflow-x-auto md:p-10">
      <div>
        <h1 className="text-2xl font-bold">Reservaciones</h1>
      </div>
      <div className="container mt-28">
        <table className="table w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className={StyleTable}>Cliente</th>
              <th className={StyleTable}>Fecha</th>
              <th className={StyleTable}>Hora</th>
              <th className={StyleTable}>Estado</th>
              <th className={StyleTable}>Acciones</th>
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
                      <select
                        name="status"
                        value={editFormData.status}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border rounded"
                      >
                        <option value="Active">Activa</option>
                        <option value="Pending">Pendiente</option>
                        <option value="Confirmed">Confirmado</option>
                        <option value="Cancelled">Cancelada</option>
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
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            reservation.status === "confirmada"
                              ? "bg-green-100 text-green-800"
                              : reservation.status === "cancelada"
                              ? "bg-red-100 text-red-800"
                              : reservation.status === "pendiente"
                              ? "bg-yellow-100 text-yellow-800"
                              : reservation.status === "pagada"
                              ? "bg-green-700 text-white"
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
                        onClick={() => handleDelete(reservation.id!)}
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
