import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Table from 'react-bootstrap/Table';
import CardAdmin from "../components/CardAdmin";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";

const AdminPage = () => {
  return (
    <>
      <NavbarComponentsAdmin/>
      <h1 className="text-center" style={{ padding: "45px" }}>
        Administrador
        <CardAdmin/>
      </h1>
      
    </>
  );
};

export default AdminPage;
