import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Link } from "react-router-dom";

const CardAdmin = () => {
  return (
    <>
      <div>
        <CardGroup className="p-3">
          <Card className="p-4 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="https://png.pngtree.com/thumb_back/fw800/background/20230903/pngtree-a-group-of-blue-people-standing-around-one-another-image_13218305.jpg"
            />
            <Card.Body>
              <Card.Title>Usuarios</Card.Title>
              <Link to="/adminUserPage" className="btn btn-info">
                Ingresar
              </Link>
            </Card.Body>
          </Card>
          <Card className="p-4 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="https://www.bbva.es/content/dam/public-web/bbvaes/images/finanzas-vistazo/ef/seguros/2400x1600/2400x1600-seguro-medico-al-mes.jpg.img.2400.1688540903997.jpg"
            />
            <Card.Body>
              <Card.Title>Doctores</Card.Title>
              <Link to="/adminDoctorsPage" className="btn btn-info">
                Ingresar
              </Link>{" "}
            </Card.Body>
          </Card>
          <Card className="p-4 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="https://img.freepik.com/fotos-premium/equipo-medicina_53876-44693.jpg"
            />
            <Card.Body>
              <Card.Title>Estudios </Card.Title>
              <Link to="/adminStudiesPage" className="btn btn-info">
                Ingresar
              </Link>{" "}
            </Card.Body>
          </Card>
          <Card className="p-4 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="https://hospitaldecalidad.com/HSJS/WEB/wp-content/uploads/2021/10/Pasillo-1-1536x869.jpg"
            />
            <Card.Body>
              <Card.Title>Hospitales</Card.Title>
              <Link to="/adminHospitalPage" className="btn btn-info">
                Ingresar
              </Link>{" "}
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </>
  );
};

export default CardAdmin;
