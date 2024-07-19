import React from 'react'
import Form from 'react-bootstrap/Form';

const SelectTurnPage = () => {
  return (
    <>
     <h1 className='text-center' style={{margin:"10px"}}>Agende un nuevo turno</h1>
     <Form.Select aria-label="Default select example" className='w-50 ' style={{margin:"100px"}}>
      <option>Seleccione el médico con el que desea tomarlo</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select> 
    </>
  )
}

export default SelectTurnPage
