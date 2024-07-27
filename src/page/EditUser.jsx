import React, { useEffect, useState } from "react";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const EditStudies = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [formValues, setFormValues] = useState({
    usuario: "",
    pass: "",
    obraSocial: "",
    role: "",
  });

  useEffect(() => {
    getUser();
  }, [params.id]);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/users/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error("No se pudo obtener el usuario");
      }
      const data = await res.json();
      setUser(data.getUser); // Asegúrate de que `getUser` sea el objeto de usuario devuelto por el servidor
      setFormValues({
        usuario: data.getUser.usuario || "",
        pass: data.getUser.pass || "",
        obraSocial: data.getUser.obraSocial || "",
        role: data.getUser.role || "",
      });
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      Swal.fire({
        position: "top",
        title: "Error al obtener estudio",
        text: error.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1370,
      });
    }
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    if (
      formValues.usuario === "" ||
      formValues.pass === "" ||
      formValues.obraSocial === "" ||
      formValues.role === ""
    ) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Formulario incompleto!",
        showConfirmButton: false,
        timer: 1300,
      });
    } else {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:3000/api/users/${params.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              usuario: formValues.usuario,
              pass: formValues.pass,
              obraSocial: formValues.obraSocial,
              role: formValues.role,
            }),
          }
        );
        if (!res.ok) {
          throw new Error("Error al actualizar el usuario");
        }
        Swal.fire({
          position: "top",
          title: "Usuario actualizado",
          text: "El usuario se actualizó correctamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1300,
        });
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
        Swal.fire({
          position: "top",
          title: "Error al actualizar usuario",
          text: error.message,
          icon: "error",
          showConfirmButton: false,
          timer: 1370,
        });
      }
    }
  };

  return (
    <>
      <NavbarComponentsAdmin />
      <div style={{ background: "#0E46A3", padding: "20px" }}>
        <Container style={{ background: "#E1F7F5"}}>
          <Row
            className="justify-content-center"
            style={{ paddingTop: "25px" }}
          >
            <Col sm={12} md={5} lg={8}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicUsuario">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    name="usuario"
                    value={formValues.usuario}
                    onChange={handleChange}
                    type="text"
                    placeholder="Ingresar usuario"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPass">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    name="pass"
                    value={formValues.pass}
                    onChange={handleChange}
                    type="password"
                    placeholder="Ingresar contraseña"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicObraSocial">
                  <Form.Label>Obra Social</Form.Label>
                  <Form.Control
                    name="obraSocial"
                    value={formValues.obraSocial}
                    onChange={handleChange}
                    type="text"
                    placeholder="Ingresar obra social"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRole">
                  <Form.Label>Rol (user o admin)</Form.Label>
                  <Form.Control
                    name="role"
                    value={formValues.role}
                    onChange={handleChange}
                    type="text"
                    placeholder="Ingresar rol"
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    
                    style={{margin: "5px", background:"#0E46A3", color:"#E1F7F5"}}
                    variant="primary"
                    onClick={handleClick}
                  >
                    Guardar
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EditStudies;
