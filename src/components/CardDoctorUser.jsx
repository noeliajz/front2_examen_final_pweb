import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Link } from "react-router-dom";

const CardDoctorUser = () => {
  return (
    <>
      <div>
        <CardGroup style={{paddingTop: "50px"}}>
          <Card className="p-4 text-center">
            <Card.Img
              variant="top" style={{height:"210px"}}
              src="https://staticnew-prod.topdoctors.cl/files/Image/large/cdf97548e427e97521c225b367ae74ac.jpg"
            />
            <Card.Body >
              <Card.Title>Cardiologia</Card.Title>
              <a href="/AmedicalSpecialty" className="btn btn-info">Ingresar</a>
            </Card.Body>
          </Card>
          <Card className="p-4 text-center">
            <Card.Img
              variant="top" style={{height:"210px"}}
              src="https://www.redaccionmedica.com/images/destacados/la-carga-lectiva-de-dermatologia-en-medicina-esta-infrarrepresentada--4222.jpg"
            />
            <Card.Body>
              <Card.Title>Dermatología</Card.Title>
              <a href="/AmedicalSpecialty" className="btn btn-info">Ingresar</a>
            </Card.Body>
          </Card>
          <Card className="p-4 text-center">
            <Card.Img
              variant="top" style={{height:"210px"}}
              src="https://www.laguiatucuman.com/wp-content/uploads/2021/02/ortopedia-traumatologia-tucuman.jpg"
            />
            <Card.Body>
              <Card.Title>Traumatologia</Card.Title>
              <a href="/AmedicalSpecialty" className="btn btn-info">Ingresar</a>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
      <div>
        <CardGroup className="p-3">
          <Card className="p-4 text-center">
            <Card.Img
              variant="top" style={{height:"210px"}}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdY13iOqIQ1i3yDMRu0j1od8T9paHPfbDfFGGj8nFZK8NbyRMj4N5KiVlAV5-oLbGAXC0&usqp=CAU"
            />
            <Card.Body>
              <Card.Title>Odontología</Card.Title>
              <a href="/AmedicalSpecialty" className="btn btn-info">Ingresar</a>
            </Card.Body>
          </Card>
          <Card className="p-4 text-center">
            <Card.Img
              variant="top" style={{height:"210px"}}
              src="https://mediplusargentina.com/wp-content/uploads/2022/10/Cirugia-General-.png"
            />
            <Card.Body>
              <Card.Title>Cirugia General</Card.Title>
              <a href="/AmedicalSpecialty" className="btn btn-info">Ingresar</a>
            </Card.Body>
          </Card>
          <Card className="p-4 text-center">
            <Card.Img
              variant="top" style={{height:"210px"}}
              src="https://www.innel.com.ar/especialidades/psiquiatria.jpg"
            />
            <Card.Body>
              <Card.Title>Psiquiatría</Card.Title>  
              <a href="/AmedicalSpecialty" className="btn btn-info">Ingresar</a>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </>
  );
};

export default CardDoctorUser;
