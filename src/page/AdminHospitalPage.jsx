import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import { Link } from "react-router-dom";
import clienteAxios from "./clienteAxios";

const AdminHospitalPage = () => {
  const [allhospital, setallhospital] = useState([]);
  const [refreshallhospital, setRefreshallhospital] = useState(false);

  const getAllhospital = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/api/hospital", {
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

  const deletehospital = async (id) => {
    const token = localStorage.getItem("token");

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await fetch(
              `http://localhost:3000/api/hospital/${id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${token}`,
                },
              }
            );
            if (res.ok) {
              Swal.fire({
                position: "top",
                title: "¡Borrado!",
                text: "El hospital ha sido borrado.",
                icon: "success",
                showConfirmButton: false,
                timer: 1370,
              });
              setRefreshallhospital(true); // Trigger refresh of allDoctores
            } else {
              const errorText = await res.text();
              throw new Error(errorText);
            }
          } catch (error) {
            Swal.fire({
              position: "top",
              title: "Error",
              text: "Ocurrió un error al intentar borrar el hospital.",
              icon: "error",
              showConfirmButton: false,
              timer: 1370,
            });
            console.error("Error deleting hospital:", error);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            position: "top",
            title: "Cancelado",
            text: "El hospital está a salvo",
            icon: "error",
            showConfirmButton: false,
            timer: 1370,
          });
        }
      });
  };

  useEffect(() => {
    getAllhospital();
    setRefreshallhospital(false);
  }, [refreshallhospital]);

  return (
    <>
      <NavbarComponentsAdmin />
      <div style={{ background: "#0E46A3", padding: "20px" }}>
        <Container style={{ background: "#E1F7F5" , margin:"35px"}}>
        <h3 className="text-center">Hospitales </h3>
          <Row>
            <Col>
              <Link
                to="/newHospital"
                className="btn "
                style={{margin: "20px", background:"#0E46A3", color:"#E1F7F5"}}
              >
                Agregar
              </Link>
              <Table responsive striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>NOMBRE</th>
                    <th>DIRECCIÓN</th>
                    <th>TELÉFONO</th>
                    <th>GUARDIA</th>
                    <th>NOTAS</th>
                    <th>ACCIONES</th>
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
                            to={`/editHospital/${hospital._id}`}
                            className="btn btn-warning"
                          >
                            {" "}
                            Editar
                          </Link>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() => deletehospital(hospital._id)}
                          >
                            Borrar
                          </button>
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
    </>
  );
};

export default AdminHospitalPage;
