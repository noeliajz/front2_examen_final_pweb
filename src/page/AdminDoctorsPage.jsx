import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import { Link } from "react-router-dom";
import clienteAxios from "./clienteAxios";


const AdminallDoctoresPage = () => {
  const [allDoctores, setAllDoctores] = useState([]);
  const [refreshAllDoctores, setRefreshAllDoctores] = useState(false);

  const getAllDoctores = async () => {
/*     const token = localStorage.getItem("token");
 */
       const res = await clienteAxios.get('/doctor')
      const  {allDoctores}= res.data
      setAllDoctores(allDoctores)} 
  

  const deleteDoctor = async (id) => {
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
            const res = await fetch(`http://localhost:8080/api/doctor/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            if (res.ok) {
              swalWithBootstrapButtons.fire(
                "¡Borrado!",
                "El doctor ha sido borrado.",
                "success"
              );
              setRefreshAllDoctores(true); // Trigger refresh of allDoctores
            } else {
              const errorText = await res.text();
              throw new Error(errorText);
            }
          } catch (error) {
            swalWithBootstrapButtons.fire(
              "Error",
              "Ocurrió un error al intentar borrar el doctor.",
              "error"
            );
            console.error("Error deleting doctor:", error);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "El doctor está a salvo :)",
            "error"
          );
        }
      });
  };

  useEffect(() => {
    getAllDoctores();
    setRefreshAllDoctores(false);
  }, [refreshAllDoctores]);

  return (
    <>
      <NavbarComponentsAdmin/>
      <h3 className="text-center">Doctores</h3>
      <Container>
        <Row>
          <Col>
          <Link to="/newDoctor" className="btn btn-success" style={{margin:"20px"}}>Agregar</Link>
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
                      <Link to={`/editDoctor/${doctor._id}`} className="btn btn-warning"> Editar</Link>
                       <button
                          className="btn btn-danger mx-2"
                          onClick={() => deleteDoctor(doctor._id)}
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
      
    </>
  );
};

export default AdminallDoctoresPage;
