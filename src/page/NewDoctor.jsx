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
    nombre: "",
    apellido: "",
    notas: "",
    especialidad: "",
    consultorio: "",
  });

  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    if (ev.target.name === "nombre") {
      setInputCheckName(false);
    }
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    if (
      formValues.nombre === "" ||
      formValues.apellido === "" ||
      formValues.notas === "" ||
      formValues.especialidad === "" ||
      formValues.consultorio === ""
    ) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Formulario incompleto!",
        showConfirmButton: false,
        timer: 1380,
      });
      return;
    }
   
    try {
      const res = await fetch(`http://localhost:8080/api/doctor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formValues.nombre,
          apellido: formValues.apellido,
          notas: formValues.notas,
          especialidad: formValues.especialidad,
          consultorio: formValues.consultorio
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
        nombre: "",
        apellido: "",
        notas: "",
        especialidad: "",
        consultorio: "",
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
                  <Form.Label>Ingresar nombres</Form.Label>
                  <Form.Control
                    name="nombre"
                    onChange={handleChange}
                    className={
                      inputCheckName
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    type="text"
                    value={formValues.nombre}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ingresar apellidos</Form.Label>
                  <Form.Control
                    name="apellido"
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    value={formValues.apellido}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ingresar notas</Form.Label>
                  <Form.Control
                    name="notas"
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    value={formValues.notas}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ingresar especialidad médica</Form.Label>
                  <Form.Control
                    name="especialidad"
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    value={formValues.especialidad}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ingresar dirección de consultorio</Form.Label>
                  <Form.Control
                    name="consultorio"
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    value={formValues.consultorio}
                    placeholder=""
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    onClick={handleClick}
                    style={{margin: "25px", background:"#0E46A3", color:"#E1F7F5"}}
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
