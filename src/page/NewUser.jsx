import React, { useState } from "react";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const NewUser = () => {
  const [inputCheckName, setInputCheckName] = useState(false);
  const [formValues, setFormValues] = useState({
    usuario: "",
    obraSocial: "",
    role: "",
    pass: "",
    repeatPass: "",
  });

  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    if (ev.target.name === "usuario") {
      setInputCheckName(false);
    }
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    if (
      formValues.usuario === "" ||
      formValues.obraSocial === "" ||
      formValues.role === "" ||
      formValues.pass === "" ||
      formValues.repeatPass === ""
    ) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Formulario incompleto!",
        showConfirmButton: false,
        timer: 1300,
      });
      return;
    }
    if (formValues.pass !== formValues.repeatPass) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Error en contraseñas",
        text: "Las contraseñas deben coincidir",
        showConfirmButton: false,
        timer: 1300
      });
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: formValues.usuario,
          obraSocial: formValues.obraSocial,
          role: formValues.role,
          pass: formValues.pass,
          repeatPass: formValues.repeatPass,
        }),
      });

      const data = await res.json(); 
      Swal.fire({      
        position: "top-center",
        icon: "success",
        title: "Nuevo usuario",
        text: "El usuario se agregó correctamente.",
        showConfirmButton: false,
        timer: 1350
      });
      setFormValues({
        usuario: "",
        obraSocial: "",
        role: "",
        pass: "",
        repeatPass: "",
      });
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      Swal.fire({
        position: "top",
        title: "Error al agregar usuario",
        text: error.message || "Error interno del servidor",
        icon: "error",
        showConfirmButton: false,
        timer: 1300,
      });
    }
  };

  return (
    <>
      <NavbarComponentsAdmin />
      <div style={{ background: "#0E46A3", padding:"20px" }}>
        <Container  style={{ background: "#E1F7F5" }}>
          <Row
            className="justify-content-center"
            style={{ paddingTop: "25px" }}
          >
            <Col sm={12} md={5} lg={8}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ingresar usuario</Form.Label>
                  <Form.Control
                    name="usuario"
                    onChange={handleChange}
                    className={
                      inputCheckName
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    type="text"
                    value={formValues.usuario}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ingresar obra social</Form.Label>
                  <Form.Control
                    name="obraSocial"
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    value={formValues.obraSocial}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ingresar rol</Form.Label>
                  <Form.Control
                    name="role"
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    value={formValues.role}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ingresar contraseña</Form.Label>
                  <Form.Control
                    name="pass"
                    onChange={handleChange}
                    className="form-control"
                    type="password"
                    value={formValues.pass}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Repetir contraseña</Form.Label>
                  <Form.Control
                    name="repeatPass"
                    onChange={handleChange}
                    className="form-control"
                    type="password"
                    value={formValues.repeatPass}
                    placeholder=""
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    onClick={handleClick}
                    style={{ margin: "5px" }}
                    variant="primary"
                    type="submit"
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

export default NewUser;
