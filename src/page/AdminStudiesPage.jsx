import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import { Link } from "react-router-dom";
import clienteAxios from "./clienteAxios";

const AdminStudiesPage = () => {
  const [allestudioMedico, setallestudioMedico] = useState([]);
  const [refreshallestudioMedico, setRefreshallestudioMedico] = useState(false);

  const getallestudioMedico = async () => {
    /*     const token = localStorage.getItem("token");
     */
    const res = await clienteAxios.get("/estudioMedico");
    const { allestudioMedico } = res.data;
    setallestudioMedico(allestudioMedico);
  };

  const deleteEstudioMedico = async (id) => {
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
        confirmButtonText: "Sí, bórralo!",
        cancelButtonText: "No, cancela!",
        reverseButtons: true,
      })

      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await fetch(
              `http://localhost:8080/api/estudioMedico/${id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (res.ok) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Borrado",
                text: "El estudio ha sido borrado",
                showConfirmButton: false,
                timer: 1350,
              });
              setRefreshallestudioMedico(true);
            } else {
              const errorText = await res.text();
              throw new Error(errorText);
            }
          } catch (error) {
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: "Error",
              text: "Ocurrió un error al intentar borrar el estudio.",
              showConfirmButton: false,
              timer: 1350,
            });
            console.error("Error eliminando estudio:", error);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Cancelado",
            showConfirmButton: false,
            timer: 1300,
          });
        }
      });
  };

  useEffect(() => {
    getallestudioMedico();
    setRefreshallestudioMedico(false);
  }, [refreshallestudioMedico]);

  return (
    <>
      <NavbarComponentsAdmin />
      <div style={{ background: "#0E46A3", padding: "20px" }}>
        <Container style={{ background: "#E1F7F5" }}>
          <h3 className="text-center">Estudios médicos</h3>
          <Row>
            <Col>
              <Link
                to="/newStudy"
                className="btn btn-success"
                style={{ margin: "20px" }}
              >
                Agregar
              </Link>
              <Table responsive striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>NÚMERO DE ESTUDIO</th>
                    <th>PÁGINA WEB</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(allestudioMedico) &&
                  allestudioMedico.length > 0 ? (
                    allestudioMedico.map((estudioMedico) => (
                      <tr key={estudioMedico._id}>
                        <td>{estudioMedico.numeroEstudio}</td>
                        <td>{estudioMedico.paginaWeb}</td>
                        <td>
                          <Link
                            to={`/editStudies/${estudioMedico._id}`}
                            className="btn btn-warning"
                          >
                            {" "}
                            Editar
                          </Link>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() =>
                              deleteEstudioMedico(estudioMedico._id)
                            }
                          >
                            Borrar
                          </button>
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

export default AdminStudiesPage;
