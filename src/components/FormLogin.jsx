import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormLogin = () => {
  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
    user: '',
    pass: ''
  });

  const [userInput, setUserInput] = useState(false);
  const [passInput, setPassInput] = useState(false);

  const handleChange = (ev) => {
    setFormInputs({ ...formInputs, [ev.target.name]: ev.target.value });
    
    if (ev.target.name === 'user' && ev.target.value) {
      setUserInput(false);
    } else if (ev.target.name === 'pass' && ev.target.value) {
      setPassInput(false);
    }
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    if (formInputs.user) {
      if (formInputs.pass) {
        setUserInput(false);
        setPassInput(false);

        try {      
           const res = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              usuario: formInputs.user, 
              pass: formInputs.pass
            })
          });

          const data = await res.json();
          if (data.userExist) {
            localStorage.setItem('token', data.userExist.token);
            localStorage.setItem('role', data.userExist.role);
            localStorage.setItem('idAgenda', data.userExist.idAgenda);
            console.log(data.userExist)
            if (data.userExist.role === 'admin') {
              navigate('/adminPage');
            } else if (data.userExist.role === 'user') {
              navigate('/amedicalspecialty');
            }
          } else {
            console.error("Usuario no encontrado o credenciales incorrectas");
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Error en la solicitud de login",
              text: "Usuario no encontrado o credenciales incorrectas" ,
              showConfirmButton: false,
              timer: 1380,
            });
          }
        } catch (error) {
          console.error("Error en la solicitud de login:", error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error",
            text: "Error en la solicitud de login: ", error ,
            showConfirmButton: false,
            timer: 1380,
          });
        }
      } else {
        setPassInput(true);
      }
    } else {
      setUserInput(true);
      setPassInput(true);
    }
  };

  useEffect(() => {
    console.log(formInputs);
  }, [formInputs]);

  return (
    <Container fluid style={{ background: "#E1F7F5" }}>
      <Row>
        <Col className="d-flex justify-content-center">
          <Form className="p-5 w-50 text-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ingresar correo electrónico</Form.Label>
              <Form.Control
                name="user"
                onChange={handleChange}
                className={userInput ? ' form-control is-invalid' : 'form-control'}
                type="email"
                placeholder=""
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Ingresar contraseña</Form.Label>
              <Form.Control
                name="pass"
                onChange={handleChange}
                className={passInput ? 'form-control is-invalid' : 'form-control'}
                type="password"
                placeholder=""
              />
            </Form.Group>
            <Button  style={{background:"#0E46A3", color:"#E1F7F5"}}  onClick={handleClick} type="submit">
              Ingresar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormLogin;


