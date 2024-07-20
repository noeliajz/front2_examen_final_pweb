import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NavbarComponents = () => {
  const parseJSON = (str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;     }
  };
  const token = parseJSON(localStorage.getItem("token")) || "";
  const role = parseJSON(localStorage.getItem("role")) || "";
  console.log("Token:", token);
  console.log("Role:", role);
  
  const logoutUserFunction = () => {
    localStorage.removeItem("idUser");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUserAdmin(false);
    location.href = "/";
  };
  
  return (
    <Navbar collapseOnSelect expand="lg" style={{ background: "#9AC8CD" }}>
      <Container>
        <Navbar.Brand href="/">Salud organizada</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {(role === "user" || role === "admin") && (
              <>
                <Nav.Link href="/">Inicio</Nav.Link>
                <Nav.Link href="/hospital">Hospitales</Nav.Link>
                <Nav.Link href="/doctorUser">Doctores</Nav.Link>
                <Nav.Link onClick={() => logoutUserFunction()} href="/">Cerrar sesión</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {role !== "user"  && (
              <>
                <Nav.Link href="/register">Registrarse</Nav.Link>
                <Nav.Link eventKey={2} href="/login">
                  Iniciar sesión
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavbarComponents;




