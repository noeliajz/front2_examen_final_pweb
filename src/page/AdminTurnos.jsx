import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import clienteAxios from "./clienteAxios";

const AdminTurnos = () => {
  const { id } = useParams(); // 👈 toma el id del doctor desde la URL
  const [doctor, setDoctor] = useState(null);

  const getDoctor = async () => {
    try {
      const res = await clienteAxios.get(`/doctor/${id}`);
      
      // Lógica robusta para manejar la respuesta del backend
      // Tu backend devuelve { msg: 'Doctor encontrado', getDoctor: {...} }
      if (res.data.getDoctor) {
        setDoctor(res.data.getDoctor); // <--- DEBE SER res.data.getDoctor según tu backend
      } else if (res.data) {
        setDoctor(res.data);
      } else {
        throw new Error("Respuesta de la API vacía o inesperada");
      }
    } catch (error) {
      console.error("Error al obtener el doctor:", error);
      // Muestra una alerta si falla la carga
      Swal.fire("Error", "No se pudo cargar el doctor. Verifica la conexión con el servidor.", "error");
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