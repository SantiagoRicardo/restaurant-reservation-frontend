import "./index.css";
import Login from "./pages/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import ReservationForm from "./pages/ReservationForm";
import ReservationsTable from "./pages/ReservationTable";

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center p-4 space-x-4 item-center">
        <button
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => navigate("/reservar")}
        >
          Crear Reservas
        </button>
        <button
          className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700"
          onClick={() => navigate("/iniciar-sesión")}
        >
          Admin
        </button>
      </div>
      <div className="flex justify-center">
        <Routes>
          <Route path="/reservar" element={<ReservationForm />} />
          <Route path="/iniciar-sesión" element={<Login />} />
          <Route path="/reservas" element={<ReservationsTable />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
