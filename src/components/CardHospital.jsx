import React from 'react'
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";

const CardHospital = () => {
  return (
    <>
       <div>
        <CardGroup style={{paddingTop:"40px", background:"#E1F7F5"}}>
          <Card className="m-3 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="https://radio21tucuman.com.ar/wp-content/uploads/2019/06/Hospital-Padilla.jpg"
            />
            <Card.Body>
              <Card.Title>Hospital Padilla</Card.Title>           
                  <a href='/moreInformation2' className='btn btn-info'>Más información</a>
           </Card.Body>
          </Card>
          <Card className="m-3 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1020/https://aycrevista.com.ar/wp-content/uploads/2022/01/hospital-avellaneda-ayc-09-1020x510.jpg"
            />
            <Card.Body>
              <Card.Title>Hospital Avellaneda</Card.Title>
              <a href='/moreInformation' className='btn btn-info'>Más información</a>
              </Card.Body>
          </Card>
          <Card className="m-3 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="https://www.laizquierdadiario.com/IMG/arton171545.jpg?1598980305"
            />
            <Card.Body>
              <Card.Title>Centro de salud</Card.Title>
              <a href='/moreInformation3' className='btn btn-info'>Más información</a>
            </Card.Body>
          </Card>
          <Card className="m-3 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="data:image/jpeg;base64,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"
            />
            <Card.Body>
              <Card.Title>Hospital Eva</Card.Title>
              <a href='/moreInformation4' className='btn btn-info'>Más información</a>
            </Card.Body>
          </Card>
        </CardGroup>
       </div>
       <div>
        <CardGroup style={{paddingTop:"40px", background:"#E1F7F5"}}>
          <Card className="m-3 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="https://clinica-web.com.ar/wp-content/uploads/2017/02/sanatorio-modelo-tucuman.jpg"
            />
            <Card.Body>
              <Card.Title>Sanatorio Modelo</Card.Title>
              <a href='/moreInformation5' className='btn btn-info'>Más información</a>
            </Card.Body>
          </Card>
          <Card className="m-3 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="https://msptucuman.gov.ar/wordpress/wp-content/uploads/2019/12/DSC_3545.jpg"
            />
            <Card.Body>
              <Card.Title>Sanatorio del Sur</Card.Title>
              <a href='/moreInformation6' className='btn btn-info'>Más información</a>
            </Card.Body>
          </Card>
          <Card className="m-3 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="https://seranoticia.com/wp-content/uploads/2020/03/clinica-mayo-tucuman-696x392.jpg"
            />
            <Card.Body>
              <Card.Title>Sanatorio Rivadavia</Card.Title>
              <a href='/moreInformation7' className='btn btn-info'>Más información</a>
            </Card.Body>
          </Card>
          <Card className="m-3 text-center">
            <Card.Img
              variant="top"
              style={{ height: "210px" }}
              src="https://a.mktgcdn.com/p/iOhWd7OOd4nhklAdJSJKZ9Nw8TbKjjcw0iAzhPKe7kY/590x187.png"
            />
            <Card.Body>
              <Card.Title>Sanatorio Parque</Card.Title>
              <a href='/moreInformation8' className='btn btn-info'>Más información</a>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
      
    </>
  )
}

export default CardHospital
