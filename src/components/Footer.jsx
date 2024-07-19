import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <>
      <Container fluid className=" footer text-center py-4 " style={{background:"#0E46A3"}}>
        <Row className="justify-content-between py-3">
          <Link to="/" alt="">
            <img src="../public/icono.png" alt="" width="90px" height="90px" />
          </Link>
        </Row>
        <Row className="justify-content-between ">
          <Col sm={3} lg={3}>
            <Link to="/Error404" className="fs-5 " style={{color:"#E1F7F5", textShadow: "0 0 3px #9AC8CD"}} >
              Información
            </Link>
            <div className="py-3">
              <div className="py-2">
                <Link to="../page/ErrorPage" className="fs-5" style={{color:"#E1F7F5", textShadow: "0 0 3px #9AC8CD"}}>
                  Preguntas frecuentas
                </Link>
              </div>
              <div className="py-2">
                <Link to="/Error404" className="fs-5 " style={{color:"#E1F7F5", textShadow: "0 0 3px #9AC8CD"}}>
                  Términos y condiciones
                </Link>
              </div>
              <div className="py-2">
                <Link to="/Error404" className="fs-5 " style={{color:"#E1F7F5", textShadow: "0 0 3px #9AC8CD"}}>
                  Botón de arrepentimiento
                </Link>
              </div>
              <div className="py-2">
                <Link to="/Error404" className="fs-5 " style={{color:"#E1F7F5", textShadow: "0 0 3px #9AC8CD"}}>
                  Legales de promoción
                </Link>
              </div>
            </div>
          </Col>
          <Col sm={3} lg={3}>
            <Link to="/Error404" className="fs-5" style={{color:"#E1F7F5", textShadow: "0 0 3px #9AC8CD"}}>
              ¡Seguinos!
            </Link>
            <div className="py-3">
              <Link to="/Error404" className="fs-5" style={{color:"#E1F7F5", textShadow: "0 0 3px #9AC8CD"}}>
                @saludOrganizada
              </Link>
            </div>
          </Col>
          <Col sm={3} lg={3}>
            <Link to="/Error404" className="fs-5" style={{color:"#E1F7F5", textShadow: "0 0 3px #9AC8CD"}}>
              Contacto
            </Link>
          </Col>
          <Col sm={3} lg={3}>
            <Link
              to="https://goo.gl/maps/KCtNriVoH4WxpcAEA"
              className="fs-5" style={{color:"#E1F7F5", textShadow: "0 0 3px #9AC8CD"}}
            >
              Ubicación
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
