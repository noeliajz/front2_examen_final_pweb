import React, { useEffect, useState } from 'react';
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';

const EditHospital = () => {
  const params = useParams();
  const [hospital, setHospital] = useState({});
  const [inputCheckName, setInputCheckName] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    guardia: '',
    notas: ''
  });

  useEffect(() => {
    // Fetch hospital data on component mount
    getHospital();
  }, [params.id]);

  const getHospital = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/hospital/${params.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error('No se pudo obtener el hospital');
      }
      const data = await res.json();
      setHospital(data.gethospital); // Set hospital data
      setFormValues({
        nombre: data.gethospital.nombre || '',
        direccion: data.gethospital.direccion || '',
        telefono: data.gethospital.telefono || '',
        guardia: data.gethospital.guardia || '',
        notas: data.gethospital.notas || ''
      });
    } catch (error) {
      console.error('Error al obtener hospital:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener hospital',
        text: error.message
      });
    }
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormValues({ ...formValues, [name]: value });
    if (name === 'nombre') {
      setInputCheckName(false);
    }
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    if (formValues.nombre === '' || formValues.direccion === '' || formValues.telefono === '' || formValues.guardia === '' || formValues.notas === '') {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Formulario incompleto!",
        showConfirmButton: false,
        timer: 1300
      });
    } else {
      try {
        const res = await fetch(`http://localhost:8080/api/hospital/${params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(formValues)
        });
        if (!res.ok) {
          throw new Error('Error al actualizar el hospital');
        }
        await res.json(); 
        Swal.fire({
          position: "top",
          title: "Hospital actualizado",
          text: "El hospital se actualizó correctamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1300  
        });

      } catch (error) {
        console.error('Error al actualizar el hospital:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar hospital',
          text: error.message
        });
      }
    }
  };

  return (
    <>
      <NavbarComponentsAdmin />
      <Container>
        <Row className="justify-content-center" style={{ paddingTop: "25px" }}>
          <Col sm={12} md={5} lg={8}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicNombre">
                <Form.Label>Ingresar nombre</Form.Label>
                <Form.Control
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDireccion">
                <Form.Label>Ingresar dirección</Form.Label>
                <Form.Control
                  name="direccion"
                  value={formValues.direccion}
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicTelefono">
                <Form.Label>Ingresar teléfono</Form.Label>
                <Form.Control
                  name="telefono"
                  value={formValues.telefono}
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicGuardia">
                <Form.Label>Ingresar especialidad de guardia</Form.Label>
                <Form.Control
                  name="guardia"
                  value={formValues.guardia}
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNotas">
                <Form.Label>Ingresar notas</Form.Label>
                <Form.Control
                  name="notas"
                  value={formValues.notas}
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <div className="text-center">
                <Button style={{ margin: "5px" }} variant="primary" onClick={handleClick}>
                  Guardar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditHospital;
