import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Link } from "react-router-dom";

const CardAmedicalSpecialty = () => {
  return (
    <>
      <div>
      <Link  to="/newDoctorUser" className="btn btn-info m-4" >Agregar nuevo dr/a</Link>{" "}
        <CardGroup className="p-3">
          <Card className="p-4 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="https://staticnew-prod.topdoctors.cl/files/Image/large/cdf97548e427e97521c225b367ae74ac.jpg"
            />
            <Card.Body>
              <Card.Title>Drs</Card.Title>
              <Link to="/doctorsPage" className="btn btn-info">Ingresar</Link>
            </Card.Body>
          </Card>
          <Card className="p-4 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="https://www.redaccionmedica.com/images/destacados/la-carga-lectiva-de-dermatologia-en-medicina-esta-infrarrepresentada--4222.jpg"
            />
            <Card.Body>
              <Card.Title>Turnos</Card.Title>
              <Link to="/doctorsPage" className="btn btn-info">Ingresar</Link>{" "}
            </Card.Body>
          </Card>
          <Card className="p-4 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="https://www.laguiatucuman.com/wp-content/uploads/2021/02/ortopedia-traumatologia-tucuman.jpg"
            />
            <Card.Body>
              <Card.Title>Estudios Médicos</Card.Title>
              <Link to="/studyPage" className="btn btn-info">Ingresar</Link>{" "}
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </>
  );
};

export default CardAmedicalSpecialty;
