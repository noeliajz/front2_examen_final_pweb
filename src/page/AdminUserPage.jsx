import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AdminUserPage = () => {
  const [allUsers, setUsers] = useState([]);
  const [refreshUsers, setRefreshUsers] = useState(false);

  const getAllUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/api/users", {
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

      const { allUsers } = await res.json();
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
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
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await fetch(`http://localhost:3000/api/users/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
            });

            if (res.ok) {
              Swal.fire({      
                position: "top-center",
                icon: "success",
                title: "Borrado",
                text: "El usuario ha sido borrado",
                showConfirmButton: false,
                timer: 1370
              });
              setRefreshUsers(true); // Trigger refresh of users
            } else {
              const errorText = await res.text();
              throw new Error(errorText);
            }
          } catch (error) {
            Swal.fire({
              position: "top",
              title: "Ocurrió un error al intentar borrar el usuario.",
              text: error.message,
              icon: "error",
              showConfirmButton: false,
              timer: 1370,
            });
            console.error("Error deleting user:", error);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({      
            position: "top-center",
            icon: "error",
            title: "Cancelado",
            text: "El usuario está a salvo",
            showConfirmButton: false,
            timer: 1350
          });
        }
      });
  };

  useEffect(() => {
    getAllUsers();
    setRefreshUsers(false);
  }, [refreshUsers]);

  return (
    <>
      <NavbarComponentsAdmin />
      <div style={{ background: "#0E46A3", padding: "20px" }}>
        <Container style={{background:"#E1F7F5"}}>
        <h3 className="text-center pt-3">Usuarios</h3>
          <Row>
            <Col>
              <div>
                <Link to="/newUser" className="btn  m-5" style={{background:"#0E46A3", color:"#E1F7F5"}}>
                  Agregar
                </Link>
              </div>
              <Table responsive striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>USUARIO</th>
                    <th>ROL</th>
                    <th>OBRA SOCIAL</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.usuario}</td>
                      <td>{user.role}</td>
                      <td>{user.obraSocial}</td>
                      <td>
                        <Link
                          to={`/editUser/${user._id}`}
                          className="btn btn-warning"
                        >
                          {" "}
                          Editar
                        </Link>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => deleteUser(user._id)}
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminUserPage;
