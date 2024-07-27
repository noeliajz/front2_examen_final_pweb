import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const CardAmedicalSpecialty = () => {
  return (
    <>
      <div style={{padding: "40px", background:"#E1F7F5"}}>
      <Link  to="/newDoctorUser" className="btn  m-4" style={{background:"#0E46A3", color:"#E1F7F5"}} >Agregar nuevo dr/a</Link>{" "}
      <Link to='/newStudyUser'  className="btn " style={{background:"#0E46A3", color:"#E1F7F5" , margin:"30px"}} >Nuevo Estudio Médico</Link>
      <Container>
          <Row className=" py-3 fs-5 justify-content-center">
            <Col className="d-flex " sm={12} lg={10} md={5}>
              <CardGroup >
            <Card className="m-3 text-center" >
              <Card.Img
                variant="top"
                style={{ height: "210px" }}
                src="https://staticnew-prod.topdoctors.cl/files/Image/large/cdf97548e427e97521c225b367ae74ac.jpg"
              />
              <Card.Body>
                <Card.Title>Drs</Card.Title>
                <Link to="/doctorsPage" className="btn" style={{background:"#0E46A3", color:"#E1F7F5"}}>Ingresar</Link>
              </Card.Body>
            </Card>
            <Card className="m-3 text-center">
              <Card.Img
                variant="top"
                style={{ height: "210px" }}
                src="https://www.laguiatucuman.com/wp-content/uploads/2021/02/ortopedia-traumatologia-tucuman.jpg"
              />
              <Card.Body>
                <Card.Title>Hospitales y sanatorios</Card.Title>
                <Link to="/hospitalUser" className="btn " style={{background:"#0E46A3", color:"#E1F7F5"}}>Ingresar</Link>{" "}
              </Card.Body>
            </Card>
              </CardGroup>
             </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CardAmedicalSpecialty;
