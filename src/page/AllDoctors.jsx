import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import { Link } from "react-router-dom";
import clienteAxios from "./clienteAxios";

const AllDoctors = () => {
  const [allDoctores, setAllDoctores] = useState([]);
  const [refreshAllDoctores, setRefreshAllDoctores] = useState(false);

  const getAllDoctores = async () => {
    const res = await clienteAxios.get("/doctor");
    const { allDoctores } = res.data;
    setAllDoctores(allDoctores);
  };

 

  useEffect(() => {
    getAllDoctores();
    setRefreshAllDoctores(false);
  }, [refreshAllDoctores]);

  return (
    <>
      <NavbarComponentsAdmin />
      <div style={{ background: "#E1F7F5" }} >
        <Container >
          <h3 className="text-center pt-3">Doctores</h3>
          <Row>
            <Col>
              <Table responsive striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>NOMBRE</th>
                    <th>APELLIDO</th>
                    <th>NOTAS</th>
                    <th>ESPECIALIDAD MÉDICA</th>
                    <th>CONSULTORIO</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(allDoctores) && allDoctores.length > 0 ? (
                    allDoctores.map((doctor) => (
                      <tr key={doctor._id}>
                        <td>{doctor.nombre}</td>
                        <td>{doctor.apellido}</td>
                        <td>{doctor.notas}</td>
                        <td>{doctor.especialidad}</td>
                        <td>{doctor.consultorio}</td>
                        <td>
                          <Link
                            to="/newDoctorUser"
                            className="btn "
                            style={{
                              margin: "20px",
                              background: "#0E46A3",
                              color: "#E1F7F5",
                            }}
                          >
                            Agregar
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No hay doctores disponibles.</td>
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

export default AllDoctors;
