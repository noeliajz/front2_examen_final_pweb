import React, { useState } from 'react';
import NavbarComponentsAdmin from '../components/NavbarComponentsAdmin';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Footer from '../components/Footer'

const NewDoctorUser = () => {
  const [inputCheckName, setInputCheckName] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: '',
    apellido: '',
    notas: '',
    especialidad: '',
    consultorio: ''
  });

  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    if (ev.target.name === 'usuario') {
      setInputCheckName(false);
    }
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    if (
      formValues.nombre === '' ||
      formValues.apellido === '' || 
      formValues.notas === '' || 
      formValues.especialidad === '' || 
      formValues.consultorio === ''  
    ) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Formulario incompleto!',
        showConfirmButton: false,
        timer: 1300
      });
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/doctor`, {
        method: 'POST',
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
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg.map(error => error.msg).join('\n'));
      }

      Swal.fire({
        title: 'Nuevo doctor/a',
        text: 'Se agregó correctamente.',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        reverseButtons: true,
      });

      setFormValues({
        nombre: '',
        apellido: '',
        notas: '',
        especialidad: '',
        consultorio: ''
      });

    } catch (error) {
      console.error('Error al agregar doctor/a:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar doctor/a',
        text: error.message || 'Error interno del servidor',
      });
    }
  };

  return (
    <>
      <NavbarComponentsAdmin />
      <Container fluid style={{background:"#E1F7F5"}}>
        <Row className="justify-content-center" style={{ padding: '25px' }}>
          <Col sm={12} md={5} lg={7}>
          <h3 className='text-center' style={{padding:"20px"}}>Agregar un nuevo doctor/a:</h3>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ingresar nombres</Form.Label>
                <Form.Control
                  name="nombre"
                  onChange={handleChange}
                  className={inputCheckName ? 'form-control is-invalid' : 'form-control'}
                  type="text"
                  value={formValues.nombre}
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ingresar apellidos </Form.Label>
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
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ingresar especialidad médica </Form.Label>
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
                <Form.Label>Ingresar dirección del consultorio </Form.Label>
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
                <Button onClick={handleClick} style={{margin: "5px" ,background:"#0E46A3", color:"#E1F7F5"}}  variant="primary" type="submit">
                  Guardar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default NewDoctorUser;
