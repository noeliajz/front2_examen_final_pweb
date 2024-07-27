import React from "react";
import Carousel from "react-bootstrap/Carousel";
import imagen from "../assets/1.jpg";
import imagen2 from "../assets/2.jpg";
import imagen3 from "../assets/3.jpg";
import "../css/CarouselComponents.css";

const CarouselComponentsUser = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img src="https://www.laizquierdadiario.com/IMG/arton171545.jpg?1598980305" alt="" className="d-block w-100" height={450} />
          <Carousel.Caption>
            <h3
              className="fs-1"
              style={{ color: "#E1F7F5", textShadow: "1px 1px 0px #0E46A3" }}
            >
              Tene siempre disponible tu información médica
            </h3>
            <p
              className="fs-3"
              style={{ color: "#E1F7F5", textShadow: "1px 1px 0px #0E46A3" }}
            >
              Organizar no es algo que haces una vez al año, es algo que haces
              todos los días
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://radio21tucuman.com.ar/wp-content/uploads/2019/06/Hospital-Padilla.jpg"
            alt=""
            className="d-block w-100"
            height={450}
          />
          <Carousel.Caption>
            <h3
              className="fs-1"
              style={{ color: "#E1F7F5", textShadow: "1px 1px 0px #0E46A3" }}
            >
              Encontrá sanatorios y hospitales
            </h3>
            <p
              className="fs-3"
              style={{ color: "#E1F7F5", textShadow: "1px 1px 0px #0E46A3" }}
            >
              Conoce las especialidades médicas que estan de guardia
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1020/https://aycrevista.com.ar/wp-content/uploads/2022/01/hospital-avellaneda-ayc-09-1020x510.jpg"
            alt=""
            className="d-block w-100"
            height={450}
          />
          <Carousel.Caption>
            <h3
              className="fs-1"
              style={{ color: "#E1F7F5", textShadow: "1px 1px 0px #0E46A3" }}
            >
              Agendá tus notas
            </h3>
            <p
              className="fs-3"
              style={{ color: "#E1F7F5", textShadow: "1px 1px 0px #0E46A3" }}
            >
              Visualiza todos los médicos a los que acudis
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default CarouselComponentsUser;
