import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import NavbarComponents from "../components/NavbarComponents";
import { Link } from "react-router-dom";
import clienteAxios from "./clienteAxios";
import Footer from '../components/Footer'

const HospitalUser = () => {
  const [allhospital, setallhospital] = useState([]);
  const [refreshallhospital, setRefreshallhospital] = useState(false);

  const getAllhospital = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/api/hospital", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const { allhospital } = await res.json();
      setallhospital(allhospital);
    } catch (error) {
      console.error("Error fetching hospital:", error);
    }
  };

 

  useEffect(() => {
    getAllhospital();
    setRefreshallhospital(false);
  }, [refreshallhospital]);

  return (
    <>
      <NavbarComponents />
      <div style={{ background:"#E1F7F5", padding: "20px" }}>
        <Container >
        <h3 className="text-center">Hospitales y Sanatorios</h3>
          <Row>
            <Col>
              <Table responsive striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>NOMBRE</th>
                    <th>DIRECCIÓN</th>
                    <th>TELÉFONO</th>
                    <th>GUARDIA</th>
                    <th>NOTAS</th>
                    <th>MAPA</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(allhospital) && allhospital.length > 0 ? (
                    allhospital.map((hospital) => (
                      <tr key={hospital._id}>
                        <td>{hospital.nombre}</td>
                        <td>{hospital.direccion}</td>
                        <td>{hospital.telefono}</td>
                        <td>{hospital.guardia}</td>
                        <td>{hospital.notas}</td>
                        <td>
                          <Link
                            to={`/moreInformation5`}
                            className="btn "
                            style={{background:"#0E46A3", color:"#E1F7F5"}}
                          >
                            {" "}
                            Ver
                          </Link>
                          <Link
                            to="https://www.google.com/maps/dir/-26.8583057,-65.2282051/Cl%C3%ADnica+Mayo,+9+de+Julio+279,+T4000IHE+San+Miguel+de+Tucum%C3%A1n,+Tucum%C3%A1n/@-26.8439233,-65.2162165,14z/data=!3m1!4b1!4m19!1m8!3m7!1s0x94225dcb49a15ff9:0x6a2c27a3b096078b!2sCl%C3%ADnica+Mayo!8m2!3d-26.834413!4d-65.205725!15sChdjbGluaWNhIGRlIG1heW8gdHVjdW1hbpIBDm1lZGljYWxfY2xpbmlj4AEA!16s%2Fg%2F11g230dt7m!4m9!1m1!4e1!1m5!1m1!1s0x94225dcb49a15ff9:0x6a2c27a3b096078b!2m2!1d-65.2057477!2d-26.8344084!3e3?entry=ttu"
                            className="btn "
                            style={{margin:"10px" ,background:"#0E46A3", color:"#E1F7F5"}}
                          >
                            {" "}
                            Cómo llegar
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No hay hospitales disponibles.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer/> 
    </>
  );
};

export default HospitalUser;
