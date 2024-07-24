import React from "react";
import Accordion from "react-bootstrap/Accordion";

const Card = ({ array }) => {
  return (
    <>
      {    array?.map(
        (allDoctors) => (
          <Accordion
            defaultActiveKey={["0"]}
            key={allDoctors?._id}
            alwaysOpen
            style={{ padding: "30px" }}
          >
             <Accordion.Item eventKey="0">
              <Accordion.Header>
              {allDoctors?.especialidad}
              </Accordion.Header>
              <Accordion.Body>
                <h5>{allDoctors?.nombre}</h5>
                <h5>{allDoctors?.apellido}</h5>
                <h5>{allDoctors?.notas}</h5>
                <h5>{allDoctors?.consultorio}</h5>
              </Accordion.Body>
             </Accordion.Item>
          </Accordion>
        )
      )}
    </>
  );
};

export default Card;
