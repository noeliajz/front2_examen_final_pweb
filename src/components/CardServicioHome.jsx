import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { FaCheck } from "react-icons/fa";

const CardServicioHome = () => {
  return (
    <> 
       <Container fluid >
          <Row className=" py-3 fs-5 justify-content-center">
            <Col className="d-flex " sm={12} lg={4} md={5}>
              <Card>
                <Card.Body className="text-center">
                  <Card.Img
                    src="https://i.pinimg.com/564x/df/00/18/df001864c9db456cd3bdd715e79314c2.jpg"
                    alt="Card image"
                    style={{width:"350px", height:"350px"}}
                    
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="d-flex p-3 " sm={12} lg={4} md={5}>
              <div>
              <div className="p-3">
              <FaCheck />  Agenda tus turnos
              </div>
              <div className="p-3">
              <FaCheck />  Guarda información de tus médicos
              </div>
              <div p-3>
              <FaCheck />  Encontrá las especialidades médicas en sanatorios y hospitales de guardia
              </div>
              </div>
            </Col>
            
          </Row>
        </Container>
    
    
    </>
           
         
    
  );
};

export default CardServicioHome;
