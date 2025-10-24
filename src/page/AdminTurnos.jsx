import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button"; // Importamos Button
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import clienteAxios from "./clienteAxios";

const AdminTurnos = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  // **********************************************
  // ** FUNCIÓN PARA ENVIAR EL RECORDATORIO **
  // **********************************************
  const handleSendReminder = async () => {
    // 1. Obtener el email del usuario logueado (admin)
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      Swal.fire(
        "Error",
        "No se encontró el email del administrador. Vuelve a iniciar sesión.",
        "error"
      );
      return;
    }

    // Recopilar los datos de los turnos
    const turnosData = doctor.turnos || [];

    Swal.fire({
      title: 'Enviando Recordatorio...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    try {
      // 2. Llamada al Backend para el envío de correo
      // CORRECCIÓN: Se añade '/doctor' a la ruta para evitar el 404
      const res = await clienteAxios.post("/doctor/send-reminder", {
        to: userEmail, // Email del administrador logueado
        doctorName: `${doctor.nombre} ${doctor.apellido}`,
        doctorSpecialty: doctor.especialidad,
        turns: turnosData,
      });

      Swal.close();
      if (res.data.success) {
        Swal.fire("¡Éxito!", "El recordatorio se ha enviado a tu correo.", "success");
      } else {
        // En caso de que el backend responda con un error no 500/404
        throw new Error(res.data.message || "Error al enviar el correo.");
      }
    } catch (error) {
      Swal.close();
      console.error("Error al enviar el recordatorio:", error);
      Swal.fire(
        "Error",
        "Fallo al enviar el recordatorio. Verifica el servidor de correos.",
        "error"
      );
    }
  };
  // **********************************************

  const getDoctor = async () => {
    try {
      const res = await clienteAxios.get(`/doctor/${id}`);
      if (res.data.getDoctor) {
        setDoctor(res.data.getDoctor);
      } else if (res.data) {
        setDoctor(res.data);
      } else {
        throw new Error("Respuesta de la API vacía o inesperada");
      }
    } catch (error) {
      console.error("Error al obtener el doctor:", error);
      Swal.fire(
        "Error",
        "No se pudo cargar el doctor. Verifica la conexión con el servidor.",
        "error"
      );
    }
  };

  useEffect(() => {
    getDoctor();
  }, [id]);

  if (!doctor) {
    return (
      <>
        <NavbarComponentsAdmin />
        <div className="text-center mt-5">Cargando datos del médico...</div>
      </>
    );
  }

  return (
    <>
      <NavbarComponentsAdmin />
      <div style={{ background: "#0E46A3", padding: "20px" }}>
        <Container style={{ background: "#E1F7F5" }}>
          <h3 className="text-center pt-3">
            Turnos del Dr/a {doctor.nombre} {doctor.apellido}
          </h3>
          <Row>
            <Col>
              {/* BOTÓN AGREGAR TURNO */}
              <Link
                to={`/AdminNuevoTurnos/${id}`} // <-- Ruta dinámica
                className="btn"
                style={{
                  margin: "20px 10px 20px 0",
                  background: "#0E46A3",
                  color: "#E1F7F5",
                }}
              >
                Agregar Turno
              </Link>
              {/* FIN BOTÓN AGREGAR TURNO */}

              {/* NUEVO BOTÓN RECORDATORIO */}
              <Button
                onClick={handleSendReminder} // <-- Función para enviar el mail
                className="btn"
                style={{
                  margin: "20px 0 20px 10px",
                  background: "#1679AB",
                  color: "#E1F7F5",
                }}
              >
                Recordatorio 🔔
              </Button>
              {/* FIN NUEVO BOTÓN RECORDATORIO */}

              {/* Resto de la tabla */}
              <Table responsive striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>Especialidad</th>
                    <th>Consultorio</th>
                    <th>Turnos Asignados</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{doctor.especialidad}</td>
                    <td>{doctor.consultorio}</td>
                    <td>
                      {doctor.turnos && doctor.turnos.length > 0 ? (
                        <ul className="list-unstyled mb-0">
                          {doctor.turnos.map((turno, index) => (
                            <li key={index}>
                              {new Date(turno).toLocaleString("es-AR", {
                                dateStyle: "short",
                                timeStyle: "short",
                              })}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-muted">Sin turnos</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminTurnos;