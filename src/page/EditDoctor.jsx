import React, { useEffect, useState } from 'react';
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';

const EditDoctor = () => {
  const params = useParams();
  const [doctor, setDoctor] = useState({});
  const [inputCheckName, setInputCheckName] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: '',
    apellido: '',
    notas: '',
    especialidad: '',
    consultorio: ''
  });

  useEffect(() => {
    getDoctor();
  }, [params.id]);

  const getDoctor = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/doctor/${params.id}`);
      if (!res.ok) {
        throw new Error('No se pudo obtener el médico');
      }
      const data = await res.json();
      setDoctor(data.getDoctor);
      setFormValues({
        nombre: data.getDoctor.nombre || '',
        apellido: data.getDoctor.apellido || '',
        notas: data.getDoctor.notas || '',
        especialidad: data.getDoctor.especialidad || '',
        consultorio: data.getDoctor.consultorio || ''
      });
    } catch (error) {
      console.error('Error al obtener doctor/a:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener doctor/a',
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
    if (formValues.nombre === '' || formValues.apellido === '' || formValues.notas === '' || formValues.especialidad === '' || formValues.consultorio === '') {
      Swal.fire({
        position: "top", // Cambiado de "top-center" a "top"
        icon: "error",
        title: "Formulario incompleto!",
        showConfirmButton: false,
        timer: 1300
      });
    } else {
      try {
        const res = await fetch(`http://localhost:8080/api/doctor/${params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: formValues.nombre,
            apellido: formValues.apellido,
            notas: formValues.notas,
            especialidad: formValues.especialidad,
            consultorio: formValues.consultorio
          })
        });
        if (!res.ok) {
          throw new Error('Error al actualizar el doctor/a');
        }
        const resUpdateDoctor = await res.json();

        Swal.fire({
          position: "top",
          title: "doctor actualizado",
          text: "El doctor/a se actualizó correctamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1300  
        });

      } catch (error) {
        console.error('Error al actualizar el doctor/a:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar doctor/a',
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
                <Form.Label>Ingresar nombres</Form.Label>
                <Form.Control
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleChange}
                  className={inputCheckName ? 'form-control is-invalid' : 'form-control'}
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicApellido">
                <Form.Label>Ingresar apellidos</Form.Label>
                <Form.Control
                  name="apellido"
                  value={formValues.apellido}
                  onChange={handleChange}
                  className={inputCheckName ? 'form-control is-invalid' : 'form-control'}
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicApellido">
                <Form.Label>Ingresar notas</Form.Label>
                <Form.Control
                  name="notas"
                  value={formValues.notas}
                  onChange={handleChange}
                  className={inputCheckName ? 'form-control is-invalid' : 'form-control'}
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicApellido">
                <Form.Label>Ingresar especialidad médica</Form.Label>
                <Form.Control
                  name="especialidad"
                  value={formValues.especialidad}
                  onChange={handleChange}
                  className={inputCheckName ? 'form-control is-invalid' : 'form-control'}
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicApellido">
                <Form.Label>Ingresar dirección del consultorio</Form.Label>
                <Form.Control
                  name="consultorio"
                  value={formValues.consultorio}
                  onChange={handleChange}
                  className={inputCheckName ? 'form-control is-invalid' : 'form-control'}
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

export default EditDoctor;
