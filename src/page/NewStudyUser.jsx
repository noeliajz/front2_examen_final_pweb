import React, { useState } from 'react';
import NavbarComponentsAdmin from '../components/NavbarComponentsAdmin';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Footer from '../components/Footer';

const NewStudyUser = () => {
  const [inputCheckName, setInputCheckName] = useState(false);
  const [formValues, setFormValues] = useState({
    numeroEstudio: '',
    paginaWeb: ''
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
      formValues.numeroEstudio === '' ||
      formValues.paginaWeb === ''  
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
      const res = await fetch(`http://localhost:8080/api/estudioMedico`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numeroEstudio: formValues.numeroEstudio,
          paginaWeb: formValues.paginaWeb
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg.map(error => error.msg).join('\n'));
      }

      Swal.fire({
        title: 'Nuevo estudio médico',
        text: 'El estudio se agregó correctamente.',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        reverseButtons: true,
      });

      setFormValues({
        numeroEstudio: '',
        paginaWeb: ''
      });

    } catch (error) {
      console.error('Error al agregar estudio médico:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar estudio médico',
        text: error.message || 'Error interno del servidor',
      });
    }
  };

  return (
    <>
      <NavbarComponentsAdmin />
      <Container fluid style={{paddingTop:"40px", background:"#E1F7F5"}}>
        <Row className="justify-content-center" style={{ paddingTop: '25px' }}>
          <Col sm={12} md={5} lg={6} className='py-3'>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ingresar número de estudio médico</Form.Label>
                <Form.Control
                  name="numeroEstudio"
                  onChange={handleChange}
                  className={inputCheckName ? 'form-control is-invalid' : 'form-control'}
                  type="text"
                  value={formValues.numeroEstudio}
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ingresar página web donde se visualiza el estudio </Form.Label>
                <Form.Control
                  name="paginaWeb"
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                  value={formValues.paginaWeb}
                  placeholder=""
                />
              </Form.Group>
              <div className="text-center">
                <Button onClick={handleClick} style={{ margin: '5px' }} variant="primary" type="submit">
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

export default NewStudyUser;
