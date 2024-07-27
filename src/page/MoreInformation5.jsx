import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Footer from "../components/Footer";
import NavbarComponents from "../components/NavbarComponents";

const MoreInformation5 = () => {
  return (
    <>
      <NavbarComponents />
      <Container fluid style={{ background: "#E1F7F5" }}>
        <Row
          className="fs-5 justify-content-center"
          style={{ padding: "100px" }}
        >
          <Col className="d-flex " sm={12} lg={10} md={6}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28481.393130871827!2d-65.24177388916017!3d-26.834412999999977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225dcb49a15ff9%3A0x6a2c27a3b096078b!2sCl%C3%ADnica%20Mayo!5e0!3m2!1ses-419!2sar!4v1722079843233!5m2!1ses-419!2sar"
              style={{ width: "600px", height: "370px", border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default MoreInformation5;
