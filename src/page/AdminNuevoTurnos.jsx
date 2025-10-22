import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import clienteAxios from "./clienteAxios";

const AdminNuevoTurnos = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [doctor, setDoctor] = useState(null);
  const [newTurnoDate, setNewTurnoDate] = useState("");
  const [loading, setLoading] = useState(false);

  // --------------------------------
  // 1. OBTENER DOCTOR (Para mostrar el nombre)
  // --------------------------------
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
      Swal.fire("Error", "No se pudo cargar el doctor.", "error");
    }
  };

  useEffect(() => {
    getDoctor();
  }, [id]);

  // --------------------------------
  // 2. FUNCIÓN PARA AGREGAR TURNO
  // --------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTurnoDate) {
      return Swal.fire("Advertencia", "Debe seleccionar una fecha y hora para el turno.", "warning");
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    
    // El backend espera el turno en el cuerpo como { turno: "fecha-hora-iso" }
    const data = {
      turno: new Date(newTurnoDate).toISOString(),
    };

    try {
        // RUTA AJUSTADA: Cambiamos a '/doctor/turnos/:id' o la ruta que uses en tu router.
        // **Verifica en tu archivo de rutas (router) del backend la URL exacta para agregar un turno.**
        const rutaAPI = `/doctor/${id}/turnos`; // <-- RUTA CORREGIDA (Probabilidad 1)
        
        // Si tu ruta es solo POST a /doctor/:id, usa:
        // const rutaAPI = `/doctor/${id}`; // <-- RUTA CORREGIDA (Probabilidad 2)

        // Si tu ruta es POST a /doctor/agregar-turno/:id, usa:
        // const rutaAPI = `/doctor/agregar-turno/${id}`; // <-- RUTA CORREGIDA (Probabilidad 3)


        const res = await clienteAxios.post(rutaAPI, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      
      Swal.fire("Éxito", "Turno agregado correctamente.", "success");
      navigate(`/AdminTurnos/${id}`); 
    } catch (error) {
      console.error("Error al agregar turno:", error);
      
      // Añadimos detalles del error para depurar
      const errorMsg = error.response?.data?.msg || "Verifique si el servidor está corriendo o si la ruta de la API es correcta.";
      Swal.fire("Error", `No se pudo agregar el turno. Detalle: ${errorMsg}`, "error");
    } finally {
      setLoading(false);
    }
  };

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
        <Container style={{ background: "#E1F7F5", padding: "20px", borderRadius: "8px" }}>
          <h3 className="text-center pt-3">
            Agregar Nuevo Turno al Dr/a {doctor.nombre} {doctor.apellido}
          </h3>
          <hr/>
          <Row className="justify-content-center">
            <Col md={6}>
              <Form onSubmit={handleSubmit} className="p-4">
                <Form.Group className="mb-3" controlId="formNewTurno">
                  <Form.Label>Seleccionar Fecha y Hora del Turno</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={newTurnoDate}
                    onChange={(e) => setNewTurnoDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={loading}
                  style={{ background: "#0E46A3", borderColor: "#0E46A3" }}
                >
                  {loading ? 'Agregando...' : 'Guardar Turno'}
                </Button>

                <Button 
                  variant="secondary" 
                  onClick={() => navigate(`/AdminTurnos/${id}`)}
                  className="ms-2"
                >
                  Cancelar
                </Button>

              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminNuevoTurnos;