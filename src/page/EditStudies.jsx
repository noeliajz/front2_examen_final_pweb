import React, { useEffect, useState } from 'react';
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';

const EditStudies = () => {
  const params = useParams();
  const [estudio, setEstudio] = useState({}); // Estado para almacenar el estudio médico
  const [inputCheckName, setInputCheckName] = useState(false);
  const [formValues, setFormValues] = useState({
    numeroEstudio: '',
    paginaWeb: ''
  });

  useEffect(() => {
    getestudioMedico(); // Llamar a la función para obtener el estudio médico al cargar el componente
  }, [params.id]); // Dependencia params.id para que useEffect se ejecute cuando cambie el ID en la URL

  const getestudioMedico = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/estudioMedico/${params.id}`);
      if (!res.ok) {
        throw new Error('No se pudo obtener el estudio médico');
      }
      const data = await res.json();
      setEstudio(data.getestudioMedico); // Actualizar el estado con los datos del estudio médico obtenidos
      setFormValues({
        numeroEstudio: data.getestudioMedico.numeroEstudio || '',
        paginaWeb: data.getestudioMedico.paginaWeb || ''
      });
    } catch (error) {
      console.error('Error al obtener estudio:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener estudio',
        text: error.message 
      });
    }
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormValues({ ...formValues, [name]: value });
    if (name === 'numeroEstudio') {
      setInputCheckName(false);
    }
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    if (formValues.numeroEstudio === '' || formValues.paginaWeb === ''  ) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Formulario incompleto!",
        showConfirmButton: false,
        timer: 1300
      });
    } else {
      try {
        const res = await fetch(`http://localhost:8080/api/estudioMedico/${params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            numeroEstudio: formValues.numeroEstudio,
            paginaWeb: formValues.paginaWeb
          })
        });
        if (!res.ok) {
          throw new Error('Error al actualizar el estudio médico');
        }
        const resUpdateEstudio = await res.json();

        Swal.fire({
          title: "Estudio actualizado",
          text: "El estudio se actualizó correctamente.",
          icon: "success",
          confirmButtonText: "Confirmar",
          reverseButtons: true,
        });

      } catch (error) {
        console.error('Error al actualizar estudio:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar estudio',
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
                <Form.Label>Ingresar número de estudio</Form.Label>
                <Form.Control
                  name="numeroEstudio"
                  value={formValues.numeroEstudio}
                  onChange={handleChange}
                  className={inputCheckName ? 'form-control is-invalid' : 'form-control'}
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicApellido">
                <Form.Label>Ingresar página web donde ver resultados</Form.Label>
                <Form.Control
                  name="paginaWeb"
                  value={formValues.paginaWeb}
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

export default EditStudies;
