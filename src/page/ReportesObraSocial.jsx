import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";

const ReportesObraSocial = () => {
  const [busqueda, setBusqueda] = useState("");
  const [doctores, setDoctores] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleBuscar = async () => {
    if (!busqueda.trim()) {
      setMensaje("Ingrese un nombre o apellido para buscar.");
      setDoctores([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/doctor/buscar?q=${busqueda}`
      );
      setDoctores(response.data.doctores);
      setMensaje("");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setMensaje("No se encontraron doctores con ese criterio.");
      } else {
        setMensaje("Error al buscar doctores.");
      }
      setDoctores([]);
    }
  };

  return (
    <>
      <NavbarComponentsAdmin />
      <div className="container mt-4">
        <h2>Buscar Doctor</h2>

        <div className="d-flex gap-2 my-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o apellido..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleBuscar}>
            Buscar
          </button>
        </div>

        {mensaje && <div className="alert alert-info">{mensaje}</div>}

        {doctores.length > 0 && (
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Especialidad</th>
                <th>Consultorio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {doctores.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.nombre}</td>
                  <td>{doc.apellido}</td>
                  <td>{doc.especialidad}</td>
                  <td>{doc.consultorio}</td>
                  <td>
                    <button
                      style={{
                        margin: "5px",
                        background: "#1679AB",
                        color: "#E1F7F5",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate("/VerObrasSociales", { state: { doctor: doc } })
                      }
                    >
                      Ver Obras Sociales
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ReportesObraSocial;
