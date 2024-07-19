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
import clienteAxios from "./clienteAxios";

const AdminUserPage = () => {
  const [allUsers, setUsers] = useState([]);
  const [refreshUsers, setRefreshUsers] = useState(false);

  const getAllUsers = async () => {
/*     const token = localStorage.getItem("token");
 */ 
try {
  const res = await clienteAxios.get('/users', config)
  const  {allUsers}= res.data
  setUsers(allUsers)
    
} catch (error) {
 
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error!',
        showConfirmButton: false,
        timer: 1300
    });

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
            const res = await fetch(`http://localhost:8080/api/users/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                'authorization': `Bearer ${token}`,
              },
            });

            if (res.ok) {
              swalWithBootstrapButtons.fire(
                "¡Borrado!",
                "El usuario ha sido borrado.",
                "success"
              );
              setRefreshUsers(true); // Trigger refresh of users
            } else {
              const errorText = await res.text();
              throw new Error(errorText);
            }
          } catch (error) {
            swalWithBootstrapButtons.fire(
              "Error",
              "Ocurrió un error al intentar borrar el usuario.",
              "error"
            );
            console.error("Error deleting user:", error);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "El usuario está a salvo :)",
            "error"
          );
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
      <h3 className="text-center">Usuarios</h3>
      <Container fluid>
        <Row>
          <Col>
            <div>
              <Link to="/newUser" className="btn btn-success m-5">
                Agregar
              </Link>
            </div>
            <div>
              <Form className="m-4">
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Ingresar usuario"
                      className=" mr-sm-2"
                    />
                  </Col>
                  <Col xs="auto">
                    <Button type="submit">Buscar</Button>
                  </Col>
                </Row>
              </Form>
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
    </>
  );
};

export default AdminUserPage;
