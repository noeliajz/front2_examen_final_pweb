import React from 'react'
import Accordion from "react-bootstrap/Accordion";

const AccordionStudyPage = ({array}) => {
  return (
    <>
      {array?.map (
        (allestudioMedico) => (
          <Accordion
            defaultActiveKey={["0"]}
            key={allestudioMedico._id}
            alwaysOpen
            style={{ padding: "10px" }}
          >
             <Accordion.Item eventKey="0">
              <Accordion.Header>Número de estudio: 
              {allestudioMedico.numeroEstudio}
              </Accordion.Header>
              <Accordion.Body>
                <h5>Página donde puedo ver el resultado: {allestudioMedico.paginaWeb}</h5>
              </Accordion.Body>
             </Accordion.Item>
          </Accordion>
        )
      )}
      
    </>
  )
}

export default AccordionStudyPage
