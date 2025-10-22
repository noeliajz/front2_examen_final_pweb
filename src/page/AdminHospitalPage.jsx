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
  const [allhospital, setAllHospital] = useState([]);
  const [refreshAllHospital, setRefreshAllHospital] = useState(false);

  // =====================
  // GET: obtener todos los hospitales
  // =====================
  const getAllHospital = async () => {
  const token = localStorage.getItem("token"); // 🔐 tomar token guardado
  try {
    const res = await clienteAxios.get("/hospital", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { allhospital } = res.data;
    console.log("✅ Hospitales recibidos:", allhospital);
    setAllHospital(allhospital);
  } catch (error) {
    console.error("❌ Error al obtener hospitales:", error);
  }
};


  // =====================
  // DELETE: eliminar hospital
  // =====================
  const deleteHospital = async (id) => {
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
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await clienteAxios.delete(`/hospital/${id}`);
            Swal.fire({
              position: "top",
              title: "¡Borrado!",
              text: "El hospital ha sido eliminado.",
              icon: "success",
              showConfirmButton: false,
              timer: 1300,
            });
            setRefreshAllHospital(true); // 🔄 refresca lista
          } catch (error) {
            Swal.fire({
              position: "top",
              title: "Error",
              text: "Ocurrió un error al eliminar el hospital.",
              icon: "error",
              showConfirmButton: false,
              timer: 1300,
            });
            console.error("Error al borrar hospital:", error);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            position: "top",
            title: "Cancelado",
            text: "El hospital está a salvo",
            icon: "error",
            showConfirmButton: false,
            timer: 1300,
          });
        }
      });
  };

  // =====================
  // useEffect: cargar hospitales al montar
  // =====================
  useEffect(() => {
    getAllHospital();
    setRefreshAllHospital(false);
  }, [refreshAllHospital]);

  // =====================
  // Render
  // =====================
  return (
    <>
      <NavbarComponentsAdmin />
      <div style={{ background: "#0E46A3", padding: "20px" }}>
        <Container style={{ background: "#E1F7F5", margin: "35px" }}>
          <h3 className="text-center">Hospitales</h3>
          <Row>
            <Col>
              <Link
                to="/newHospital"
                className="btn"
                style={{
                  margin: "20px",
                  background: "#0E46A3",
                  color: "#E1F7F5",
                }}
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
                            Editar
                          </Link>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() => deleteHospital(hospital._id)}
                          >
                            Borrar
                          </button>
                          <a href="https://www.google.com/maps/@-26.85868,-65.2263447,15z?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
                            className="btn btn-success m-2"
                          >
                            Ubicación
                          </a>
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
