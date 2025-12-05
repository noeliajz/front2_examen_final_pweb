import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import clienteAxios from "./clienteAxios";
// Se importa el componente de formulario (Form) para usar el Checkbox
import Form from "react-bootstrap/Form";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import "../css/AdminTurnosCss.css";

const AdminTurnos = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  // **********************************************
  // ** FUNCIÓN PRINCIPAL DE CARGA DE DATOS **
  // **********************************************
  const getDoctor = async () => {
    try {
      // Se espera que el backend retorne la estructura completa incluyendo '_id' y 'asistencia'
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

  // **********************************************
  // ** NUEVA FUNCIÓN: MARCAR/DESMARCAR ASISTENCIA **
  // **********************************************
  const handleToggleAsistencia = async (turnoId, currentAsistencia) => {
    const nuevaAsistencia = !currentAsistencia;

    Swal.fire({
      title: "Actualizando Asistencia...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Llama a la ruta PUT que creaste en el backend
      const res = await clienteAxios.put(
        // Usa el ID del doctor y el ID del turno (turnoId) en la URL
        `/doctor/${id}/turnos/${turnoId}/asistencia`,
        { asistencia: nuevaAsistencia }
      );

      Swal.close();
      if (res.status === 200 && res.data.ok) {
        Swal.fire(
          "¡Éxito!",
          `Asistencia ${
            nuevaAsistencia ? "marcada" : "desmarcada"
          } correctamente.`,
          "success"
        );
        // Actualiza el estado local para reflejar el cambio sin recargar toda la página
        setDoctor((prevDoctor) => ({
          ...prevDoctor,
          turnos: prevDoctor.turnos.map((turno) =>
            turno._id === turnoId
              ? { ...turno, asistencia: nuevaAsistencia }
              : turno
          ),
        }));
      } else {
        throw new Error(res.data.msg || "Error al actualizar la asistencia.");
      }
    } catch (error) {
      Swal.close();
      console.error("Error al actualizar la asistencia:", error);
      Swal.fire(
        "Error",
        error.message || "Fallo al actualizar la asistencia del turno.",
        "error"
      );
    }
  };
  // **********************************************

  // **********************************************
  // ** FUNCIÓN PARA ENVIAR WHATSAPP (Se mantiene igual) **
  // **********************************************
  const handleWhatsApp = (telefonoUsuario, fechaTurno) => {
    if (!doctor) return;

    if (!telefonoUsuario) {
      Swal.fire(
        "Error",
        "El usuario no tiene un número de teléfono registrado.",
        "warning"
      );
      return;
    }

    const numeroLimpio = String(telefonoUsuario).replace(/[^0-9]/g, "");
    const fechaTurnoObj = new Date(fechaTurno);
    const fechaFormateada = fechaTurnoObj.toLocaleString("es-AR", {
      dateStyle: "short",
      timeStyle: "short",
    });

    const doctorNombre = `${doctor.nombre} ${doctor.apellido}`;
    const mensajeBase = `Hola, soy el Dr/a ${doctorNombre}. Este es un recordatorio de tu turno programado para el ${fechaFormateada}. Por favor, confírmanos si asistirás.`;
    const mensajeCodificado = encodeURIComponent(mensajeBase);
    const urlWhatsApp = `https://wa.me/${numeroLimpio}?text=${mensajeCodificado}`;

    window.open(urlWhatsApp, "_blank");
  };
  // **********************************************

  // **********************************************
  // ** FUNCIÓN PARA ENVIAR EL RECORDATORIO (EMAIL) (Se mantiene igual) **
  // **********************************************
  const handleSendReminder = async () => {
    // ... (Tu lógica de email reminder aquí)
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      Swal.fire(
        "Error",
        "No se encontró el email del administrador. Vuelve a iniciar sesión.",
        "error"
      );
      return;
    }

    const turnosData = doctor.turnos || [];

    Swal.fire({
      title: "Enviando Recordatorio...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await clienteAxios.post("/doctor/send-reminder", {
        to: userEmail,
        doctorName: `${doctor.nombre} ${doctor.apellido}`,
        doctorSpecialty: doctor.especialidad,
        turns: turnosData,
      });

      Swal.close();
      if (res.data.success) {
        Swal.fire(
          "¡Éxito!",
          "El recordatorio se ha enviado a tu correo.",
          "success"
        );
      } else {
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

  // AdminTurnos.jsx (dentro de la función handleSendWhatsAppBackend)

  const handleSendWhatsAppBackend = async (telefonoUsuario, fechaTurno) => {
    if (!telefonoUsuario) {
      Swal.fire("Error", "El usuario no tiene número registrado.", "warning");
      return;
    }

    const fechaTurnoObj = new Date(fechaTurno);
    const fechaFormateada = fechaTurnoObj.toLocaleDateString("es-AR");

    Swal.fire({
      title: "Enviando mensaje...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await clienteAxios.post("/whatsapp/send", {
        telefono: telefonoUsuario,
        fecha: fechaFormateada,
        doctor: `${doctor.nombre} ${doctor.apellido}`,
      });

      Swal.close();

      if (res.data.ok) {
        Swal.fire(
          "✅ Mensaje enviado",
          "El recordatorio fue enviado por WhatsApp Web.",
          "success"
        );
      } else {
        throw new Error(
          res.data.msg || "Error desconocido al enviar el mensaje."
        );
      }
    } catch (error) {
      Swal.close();
      console.error("Error al enviar mensaje WhatsApp:", error);
      Swal.fire(
        "Error",
        error.message || "No se pudo enviar el mensaje.",
        "error"
      );
    }
  };

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
              {/* BOTONES */}
              <Link
                to={`/AdminNuevoTurnos/${id}`}
                className="btn"
                style={{
                  margin: "20px 10px 20px 0",
                  background: "#0E46A3",
                  color: "#E1F7F5",
                }}
              >
                Agregar Turno
              </Link>

              <Button
                onClick={handleSendReminder}
                className="btn"
                style={{
                  margin: "20px 0 20px 10px",
                  background: "#1679AB",
                  color: "#E1F7F5",
                }}
              >
                Recordatorio 🔔 (Email)
              </Button>
              {/* FIN BOTONES */}

              {/* TABLA PRINCIPAL DE DOCTOR */}
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
                      {/* TABLA DE TURNOS ASIGNADOS */}
                      {doctor.turnos && doctor.turnos.length > 0 ? (
                        <Table
                          striped
                          bordered
                          hover
                          size="sm"
                          className="mb-0"
                        >
                          <thead>
                            <tr>
                              <th>Fecha y Hora</th>
                              <th>WhatsApp</th>
                              <th>Asistencia</th> {/* Nuevo encabezado */}
                            </tr>
                          </thead>
                          <tbody>
                            {doctor.turnos.map((turno) => (
                              // Usamos el _id del turno como key
                              <tr key={turno._id}>
                                <td>
                                  {new Date(turno.fecha).toLocaleString(
                                    "es-AR",
                                    {
                                      dateStyle: "short",
                                      timeStyle: "short",
                                    }
                                  )}
                                </td>
                                <td>
                                  <Link
                                    to="/WhatsappTestPage"
                                    state={{
                                      telefono: turno.telefonoUsuario,
                                      fecha: new Date(
                                        turno.fecha
                                      ).toLocaleDateString("es-AR"),
                                      doctor: `${doctor.nombre} ${doctor.apellido}`,
                                    }}
                                    className="btn btn-primary btn-sm"
                                    style={{
                                      background: "#075E54",
                                      borderColor: "#075E54",
                                      color: "white",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    Enviar WhatsApp (Servidor) 📲
                                  </Link>
                                </td>
                                <td>
                                  <div className="asistencia-container">
                                    <Form.Check
                                      type="checkbox"
                                      checked={turno.asistencia}
                                      onChange={() =>
                                        handleToggleAsistencia(
                                          turno._id,
                                          turno.asistencia
                                        )
                                      }
                                    />

                                    <span className="asistencia-texto">
                                      {turno.asistencia
                                        ? "Asistió"
                                        : "Pendiente"}
                                    </span>
                                  </div>
                                </td>

                                {/* 🛑 NUEVA COLUMNA DE ASISTENCIA */}
                                {/* <td>
                                  <Form.Check
                                    type="checkbox"
                                    label={
                                      turno.asistencia ? "Asistió" : "Pendiente"
                                    }
                                    checked={turno.asistencia}
                                    onChange={() =>
                                      handleToggleAsistencia(
                                        turno._id,
                                        turno.asistencia
                                      )
                                    }
                                  />
                                </td> */}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      ) : (
                        <span className="text-muted">Sin turnos asignados</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
              {/* FIN TABLA PRINCIPAL */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminTurnos;
