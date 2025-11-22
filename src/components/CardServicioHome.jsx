// Contenido de CardServicioHome.jsx (sin cambios, solo para referencia)
import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { FaCalendarAlt, FaUserMd, FaMapMarkerAlt, FaFileMedical } from "react-icons/fa";

const servicios = [
    {
        icon: <FaCalendarAlt size={40} style={{ color: '#007bff' }} />,
        title: "Agenda de Turnos Centralizada",
        text: "Programa, confirma y gestiona todos tus turnos médicos online. Recibe recordatorios para no perder ninguna cita.",
    },
    {
        icon: <FaUserMd size={40} style={{ color: '#28a745' }} />,
        title: "Directorio de Profesionales",
        text: "Guarda y organiza la información de contacto de tus médicos, especialistas y notas importantes post-consulta.",
    },
    {
        icon: <FaMapMarkerAlt size={40} style={{ color: '#ffc107' }} />,
        title: "Ubicación de Centros de Salud",
        text: "Encuentra hospitales, sanatorios y guardias cercanas, con información detallada de sus especialidades disponibles.",
    },
    {
        icon: <FaFileMedical size={40} style={{ color: '#dc3545' }} />,
        title: "Historial Médico a Mano",
        text: "Aunque no está en el código actual, es clave. Menciona: Almacena de forma segura tus reportes, estudios y recetas importantes.",
    },
];

const CardServicioHome = () => {
    return (
        <Container>
            <Row className="justify-content-center g-4">
                {servicios.map((servicio, index) => (
                    <Col key={index} sm={12} md={6} lg={3} className="d-flex">
                        <Card className="shadow-sm border-0 h-100 text-center">
                            <Card.Body className="p-4">
                                <div className="mb-3">{servicio.icon}</div>
                                <Card.Title className="fw-bold" style={{ color: '#343a40' }}>
                                    {servicio.title}
                                </Card.Title>
                                <Card.Text className="text-muted">
                                    {servicio.text}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CardServicioHome;