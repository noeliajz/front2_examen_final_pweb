import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Footer from "../components/Footer";
import NavbarComponents from "../components/NavbarComponents"

const MoreInformation3 = () => {
  return (
    <>
      <NavbarComponents/>
      <Container fluid style={{ background: "#E1F7F5" }}>
        <Row className="fs-5 justify-content-center" style={{padding:"100px"}}>
          <Col className="d-flex " sm={12} lg={5} md={5}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.5629961002314!2d-65.20006471114502!3d-26.822039999999987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c32c28b1ddd%3A0x7e8135481ac4a751!2sCentro%20de%20Salud%20Dr.%20Zen%C3%B3n%20J.%20Santill%C3%A1n!5e0!3m2!1ses-419!2sar!4v1720489762414!5m2!1ses-419!2sar"
              style={{ width: "360", height: "360", border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Col>
          <Col className="d-flex " sm={12} lg={4} md={4}>
            <ul>
            <a href="https://www.google.com/maps/dir/-26.8582903,-65.2282393/Hospital+%C3%81ngel+C.+Padilla,+Juan+Bautista+Alberdi+550,+T4000+San+Miguel+de+Tucum%C3%A1n,+Tucum%C3%A1n/@-26.8448946,-65.2295379,15z/data=!3m1!4b1!4m18!1m7!3m6!1s0x94225c72c546fea5:0x46d0cbcf03b07ca3!2sHospital+%C3%81ngel+C.+Padilla!8m2!3d-26.8363582!4d-65.2157979!16s%2Fg%2F1tltngcf!4m9!1m1!4e1!1m5!1m1!1s0x94225c72c546fea5:0x46d0cbcf03b07ca3!2m2!1d-65.2157979!2d-26.8363582!3e3?entry=ttu" className="btn btn-info m-2">Cómo llegar</a>
              <li>
                Dirección: San Juan 550, T4000 San Miguel de Tucumán, Tucumán
              </li>
              <li>Teléfono: 0381 424-8012</li>
              <li>
                Especialidades médicas de guardia: todas excepto psiquiatría
              </li>
              <li>Obras sociales: todas</li>
              <li>
                Notas importantes: llevar dni y carnet de la obra social si es
                el caso.
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default MoreInformation3;
