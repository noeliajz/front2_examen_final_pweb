import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import clienteAxios from "./clienteAxios";

const AdminTurnos = () => {
  const [doctores, setDoctores] = useState([]);

  // 🔹 Traer todos los doctores con sus turnos
  const getDoctores = async () => {
    try {
      const res = await clienteAxios.get("/doctor");
      setDoctores(res.data.allDoctores);
    } catch (error) {
      console.error("Error al obtener doctores:", error);
      Swal.fire("Error", "No se pudieron cargar los turnos", "error");
    }
  };

  useEffect(() => {
    getDoctores();
  }, []);

  return (
    <>
      <NavbarComponentsAdmin />
      <div style={{ background: "#0E46A3", padding: "20px" }}>
        <Container style={{ background: "#E1F7F5" }}>
          <h3 className="text-center pt-3">Turnos de Médicos</h3>
          <Row>
            <Col>
              <Table responsive striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Especialidad</th>
                    <th>Consultorio</th>
                    <th>Turnos Asignados</th>
                  </tr>
                </thead>
                <tbody>
                  {doctores.length > 0 ? (
                    doctores.map((doctor) => (
                      <tr key={doctor._id}>
                        <td>{doctor.nombre}</td>
                        <td>{doctor.apellido}</td>
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No hay turnos disponibles.</td>
                    </tr>
                  )}
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
