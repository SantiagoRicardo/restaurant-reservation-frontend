import React from "react";

const ReservationsTable = () => {
  // Datos de ejemplo para las filas de la tabla
  const reservations = [
    {
      cliente: "John Smith",
      fecha: "Junio 10, 2024",
      hora: "4:00 PM",
      personas: 4,
      estado: "Confirmado",
    },
    {
      cliente: "Robert Doe",
      fecha: "Junio 11, 2024",
      hora: "6:00 PM",
      personas: 2,
      estado: "Pendiente",
    },
    // Puedes añadir más reservaciones aquí
  ];

  fetch("http://127.0.0.1:8000/reservations/")
    .then((response) => response.json())
    .then((data) => console.log(data));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-collapse border-gray-200 table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-200">Cliente</th>
            <th className="px-4 py-2 border border-gray-200">Fecha</th>
            <th className="px-4 py-2 border border-gray-200">Hora</th>
            <th className="px-4 py-2 border border-gray-200">Personas</th>
            <th className="px-4 py-2 border border-gray-200">Estado</th>
            <th className="px-4 py-2 border border-gray-200">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-200">
                {reservation.cliente}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {reservation.fecha}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {reservation.hora}
              </td>
              <td className="px-4 py-2 text-center border border-gray-200">
                {reservation.personas}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {reservation.estado}
              </td>
              <td className="px-4 py-2 text-blue-500 border border-gray-200 cursor-pointer hover:text-blue-800">
                Actualizar
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsTable;
