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
import { useNavigate } from "react-router-dom";

const ReservationsTable: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Omit<Reservation, "id">>({
    customer_name: "",
    reservation_datetime: "",
    age: 0,
    status: "",
  });
  const [cancelReservationId, setCancelReservationId] = useState<string | null>(
    null
  );
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/iniciar-sesión");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/iniciar-sesión");
  };

  useEffect(() => {
    fetchReservations();
  }, []);

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
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        console.error("No se encontró el token de autenticación");
        return;
      }
      try {
        await updateReservation(
          editingId,
          {
            ...editFormData,
            age: Number(editFormData.age),
          },
          storedToken
        );
        fetchReservations();
        setEditingId(null);
      } catch (error) {
        console.error("Error al actualizar la reservación", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró el token. Por favor, inicie sesión nuevamente.");
      return;
    }

    try {
      await deleteReservation(id, token);
      alert("Reservación eliminada exitosamente.");
    } catch (error) {
      console.error("Error al eliminar la reservación:", error);
      return;
    }
  };

  const fetchReservations = async () => {
    try {
      const data = await getReservations();
      setReservations(data);
      setAllReservations(data);
    } catch (error) {
      console.error("Error al obtener las reservaciones", error);
    }
  };

  const handleCancelIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCancelReservationId(value);
  };
  const handleCancelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cancelReservationId) {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        console.error("No se encontró el token de autenticación");
        return;
      }
      const reservationToCancel = allReservations.find(
        (reservation) => reservation.id_reservation === cancelReservationId
      );
      if (!reservationToCancel) {
        console.error(
          `No se encontró la reservación con ID ${cancelReservationId}`
        );
        return;
      }

      try {
        await updateReservation(
          reservationToCancel.id!,
          { ...reservationToCancel, status: "cancelada" },
          storedToken
        );
        fetchReservations();
        setCancelReservationId("");
        alert("Reservación cancelada exitosamente.");
      } catch (error) {
        console.error("Error al cancelar la reservación", error);
      }
    }
  };

  const StyleTable =
    "px-6 py-4 leading-4 tracking-wider text-left text-gray-600 border-b-2 border-gray-200";
  const StyleItemTable = "px-6 py-4 border-b border-gray-200";

  return (
    <div className="justify-between overflow-x-auto md:p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reservaciones</h1>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 mt-4 font-semibold text-white bg-red-500 rounded hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
      <div className="flex items-center mt-4">
        <form onSubmit={handleCancelSubmit}>
          <input
            type="text"
            placeholder="ID de Reservación"
            value={cancelReservationId || ""}
            onChange={handleCancelIdChange}
            className="px-3 py-2 border rounded-l"
          />
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-red-500 rounded-r hover:bg-red-700"
          >
            Cancelar Reservación
          </button>
        </form>
      </div>
      <div className="container mt-28">
        <table className="table w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className={StyleTable}>Cliente</th>
              <th className={StyleTable}>Fecha</th>
              <th className={StyleTable}>Hora</th>
              <th className={StyleTable}>Estado</th>
              <th className={StyleTable}>Edad</th>
              <th className={StyleTable}>Costo Total</th>
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
                        <option value="activa">Activa</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmada">Confirmado</option>
                        <option value="cancelada">Cancelada</option>
                      </select>
                    </td>
                    <td className={StyleItemTable}>
                      <input
                        type="number"
                        name="age"
                        value={editFormData.age}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border rounded"
                      />
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
                    <td className={StyleItemTable}>{reservation.age}</td>
                    <td className={StyleItemTable}>{reservation.total_cost}</td>
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
