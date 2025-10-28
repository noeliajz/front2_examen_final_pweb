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
  const { id } = useParams(); // ID del doctor
  const navigate = useNavigate(); 
  
  // Estados necesarios
  const [doctor, setDoctor] = useState(null);
  const [users, setUsers] = useState([]); // Lista de pacientes/usuarios
  const [newTurnoDate, setNewTurnoDate] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(""); // ID del usuario seleccionado
  const [loading, setLoading] = useState(false);

  // --------------------------------
  // 1. OBTENER DOCTOR Y USUARIOS (CORREGIDO)
  // --------------------------------
  const fetchData = async () => {
    try {
      // Cargar Doctor
      const doctorRes = await clienteAxios.get(`/doctor/${id}`);
      setDoctor(doctorRes.data.getDoctor || doctorRes.data);

      // Cargar Usuarios (Pacientes)
      const usersRes = await clienteAxios.get("/users"); 
      
      // CORRECCIÓN CLAVE: La API está devolviendo un array de usuarios directamente (usersRes.data),
      // NO anidado en 'allUsers'. Usamos usersRes.data si es un array, o usersRes.data.allUsers como respaldo.
      const loadedUsers = usersRes.data.allUsers || usersRes.data;

      if (Array.isArray(loadedUsers)) {
        setUsers(loadedUsers); // Ahora los usuarios deberían cargarse
      } else {
        console.warn("La respuesta de /users no es un array válido. Se asume lista vacía.");
        setUsers([]); 
      }

    } catch (error) {
      console.error("Error al cargar datos:", error);
      Swal.fire("Error", "No se pudo cargar el doctor o la lista de pacientes. Revisa la consola para más detalles.", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // --------------------------------
  // 2. FUNCIÓN PARA AGREGAR TURNO
  // --------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDACIÓN: selectedUserId ahora debe contener un ID válido (no "")
    if (!newTurnoDate || !selectedUserId) {
      return Swal.fire("Advertencia", "Debe seleccionar una **fecha** y un **paciente** para el turno.", "warning");
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    
    // PAYLOAD: Enviamos los dos campos requeridos por el backend: turno (fecha ISO) y usuarioId.
    const payload = {
      turno: new Date(newTurnoDate).toISOString(),
      usuarioId: selectedUserId, 
    };

    try {
      // Ruta de la API
      const rutaAPI = `/doctor/${id}/turnos`; 
      
      await clienteAxios.post(rutaAPI, payload, { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      Swal.fire("Éxito", "Turno agregado correctamente.", "success");
      // Redirigir a la lista de turnos del doctor
      navigate(`/AdminTurnos/${id}`); 
    } catch (error) {
      console.error("Error al agregar turno:", error.response?.data);
      
      // Muestra el mensaje de error del backend (el 400 Bad Request)
      const errorMsg = error.response?.data?.msg || "Error de red o ruta de API incorrecta.";
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
      <div style={{ background: "#0E46A3", padding: "20px", minHeight: "90vh" }}>
        <Container style={{ background: "#E1F7F5", padding: "20px", borderRadius: "8px" }}>
          <h3 className="text-center pt-3">
            Agregar Nuevo Turno al Dr/a {doctor.nombre} {doctor.apellido}
          </h3>
          <hr/>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form onSubmit={handleSubmit} className="p-4">
                
                <Row className="mb-4">
                    <Col md={6}>
                        {/* Campo de Fecha y Hora */}
                        <Form.Group controlId="formNewTurno">
                            <Form.Label>Seleccionar Fecha y Hora del Turno</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={newTurnoDate}
                                onChange={(e) => setNewTurnoDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                        {/* Selector de Paciente */}
                        <Form.Group controlId="formPaciente">
                            <Form.Label>Seleccionar Paciente</Form.Label>
                            <Form.Select 
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                required
                            >
                                <option value="">-- Seleccione un paciente --</option>
                                {users.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.usuario} {/* Muestra el campo 'usuario' (username/email) ya que 'nombre'/'apellido' no existen en tu modelo */}
                                    </option>
                                ))}
                            </Form.Select>
                            {users.length === 0 && (
                                <Form.Text className="text-danger">
                                    No se encontraron pacientes para asignar.
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                </Row>


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