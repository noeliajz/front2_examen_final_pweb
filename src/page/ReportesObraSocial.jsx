import React, { useState } from "react";
import axios from "axios";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";

const ReportesObraSocial = () => {
  const [busqueda, setBusqueda] = useState("");
  const [doctores, setDoctores] = useState([]);
  const [mensaje, setMensaje] = useState("");

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
              </tr>
            </thead>
            <tbody>
              {doctores.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.nombre}</td>
                  <td>{doc.apellido}</td>
                  <td>{doc.especialidad}</td>
                  <td>{doc.consultorio}</td>
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
