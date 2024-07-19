import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const FormUserDoctorUser = () => {
  return (
    <>
      <Form className="w-50 text-center p-4">
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Control placeholder="Ingrese nombre o apellido del doctor/a" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Buscar
        </Button>
      </Form>
    </>
  );
};

export default FormUserDoctorUser;
