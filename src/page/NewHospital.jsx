import React, { useState } from "react";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const NewHospital = () => {
  const [inputCheckName, setInputCheckName] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    guardia: "",
    notas: "",
  });

  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    if (ev.target.name === "usuario") {
      setInputCheckName(false);
    }
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    const token = localStorage.getItem("token");

    if (
      formValues.nombre === "" ||
      formValues.direccion === "" ||
      formValues.telefono === "" ||
      formValues.guardia === "" ||
      formValues.notas === ""
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
    try {
      const res = await fetch(`http://localhost:3000/api/hospital`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: formValues.nombre,
          direccion: formValues.direccion,
          telefono: formValues.telefono,
          guardia: formValues.guardia,
          notas: formValues.notas,
        }),
      });
      const data = await res.json();

      Swal.fire({
        title: "Nuevo hospital o sanatorio",
        text: "Se agregó correctamente.",
        icon: "success",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      });

      setFormValues({
        nombre: "",
        direccion: "",
        telefono: "",
        guardia: "",
        notas: "",
      });
    } catch (error) {
      console.error("Error al agregar hospital o sanatorio:", error);
      Swal.fire({
        icon: "error",
        title: "Error al agregar hospital o sanatorio",
        text: error.message || "Error interno del servidor",
      });
    }
  };

  return (
    <>
      <NavbarComponentsAdmin />
      <div style={{ background: "#0E46A3", padding: "20px" }}>
        <Container style={{ background: "#E1F7F5" , margin:"35px"}}>
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
                  <Form.Label>Ingresar dirección </Form.Label>
                  <Form.Control
                    name="direccion"
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    value={formValues.direccion}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ingresar teléfono </Form.Label>
                  <Form.Control
                    name="telefono"
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    value={formValues.telefono}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Ingresar especialidad médica de guardia{" "}
                  </Form.Label>
                  <Form.Control
                    name="guardia"
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    value={formValues.guardia}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ingresar notas </Form.Label>
                  <Form.Control
                    name="notas"
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    value={formValues.notas}
                    placeholder=""
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    onClick={handleClick}
                    style={{
                      margin: "5px",
                      background: "#0E46A3",
                      color: "#E1F7F5",
                    }}
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

export default NewHospital;
