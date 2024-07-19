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
  }
  
  

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
            const res = await fetch(`http://localhost:8080/api/hospital/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                'authorization': `Bearer ${token}`,
              },
            });

            if (res.ok) {
              swalWithBootstrapButtons.fire(
                "¡Borrado!",
                "El hospital ha sido borrado.",
                "success"
              );
              setRefreshallhospital(true); // Trigger refresh of allDoctores
            } else {
              const errorText = await res.text();
              throw new Error(errorText);
            }
          } catch (error) {
            swalWithBootstrapButtons.fire(
              "Error",
              "Ocurrió un error al intentar borrar el hospital.",
              "error"
            );
            console.error("Error deleting hospital:", error);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "El hospital está a salvo :)",
            "error"
          );
        }
      });
  };

  useEffect(() => {
    getAllhospital();
    setRefreshallhospital(false);
  }, [refreshallhospital]);

  return (
    <>
      <NavbarComponentsAdmin/>
      <h3 className="text-center">Hospitales </h3>
      <Container>
        <Row>
          <Col>
          <Link to="/newHospital" className="btn btn-success" style={{margin:"20px"}}>Agregar</Link>
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
                        <Link to={`/editHospital/${hospital._id}`} className="btn btn-warning"> Editar</Link>
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
    </>
  );
};

export default AdminHospitalPage;
