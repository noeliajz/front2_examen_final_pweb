import React from "react";
import CarouselComponents from "../components/CarouselComponents";
import Footer from "../components/Footer";
import CardServicioHome from "../components/CardServicioHome";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaCalendarCheck, FaRobot, FaMicrochip } from "react-icons/fa"; // Importado FaRobot y FaMicrochip

// Nuevo componente para destacar el uso de IA
const AIPowerSection = () => (
  <Container className="py-5">
    <Row className="align-items-center">
      <Col md={6} className="text-center mb-4 mb-md-0">
        <FaRobot size={150} style={{ color: "#6f42c1" }} />
      </Col>
      <Col md={6}>
        <h2 className="display-5 fw-bold mb-4" style={{ color: "#6f42c1" }}>
          Impulsado por la Inteligencia Artificial
        </h2>
        <p className="fs-5">
          Salud organizada no es solo un gestor de turnos, es un sistema
          inteligente. Hemos utilizado modelos avanzados de IA como Gemini y
          ChatGPT para:
        </p>
        <ul>
          <li>
            <FaMicrochip className="me-2" style={{ color: "#6f42c1" }} />{" "}
            Optimización de Datos: Mejorar la calidad de los datos de reportes y
            obras sociales.
          </li>
          <li>
            <FaMicrochip className="me-2" style={{ color: "#6f42c1" }} />{" "}
            Funcionalidades Robustas: Desarrollar funciones complejas de
            reportes y asistencia con mayor eficiencia y precisión.
          </li>
          <li>
            <FaMicrochip className="me-2" style={{ color: "#6f42c1" }} />{" "}
            Experiencia de Usuario: Garantizar una interfaz lógica y fácil de
            usar, asistida por las capacidades de programación de la IA.
          </li>
        </ul>
        <p className="lead">
          Esto asegura un sistema más rápido, más confiable y listo para el
          futuro de la gestión médica.
        </p>
      </Col>
    </Row>
  </Container>
);

// Componente HomePage actualizado
const HomePage = () => {
  return (
    <>
      <NavbarComponentsAdmin />
      <div style={{ background: "#E1F7F5" }}>
        {/* Sección de Carrousel/Hero principal */}
        <CarouselComponents />

        {/* --- Sección de Bienvenida y Propuesta de Valor --- */}
        <Container className="py-5 text-center">
          <h1 className="display-4 fw-bold" style={{ color: "#0056b3" }}>
            Simplifica tu Salud con Salud organizada!
          </h1>
          <p className="lead mt-3 mb-5">
            El sistema inteligente para gestionar tus citas médicas, documentos
            y la información de tus profesionales, todo en un solo lugar.
          </p>
        </Container>

        {/* --- Sección de Servicios Clave --- */}
        <Container className="py-5">
          <h2
            className="text-center mb-5 display-5"
            style={{ color: "#007bff" }}
          >
            Nuestros Servicios Clave
          </h2>
          <CardServicioHome />
        </Container>

        <hr />

        {/* --- NUEVA SECCIÓN: Impulsado por IA --- */}
        <AIPowerSection />

        <hr />

        {/* --- Sección de Llamada a la Acción (CTA) --- */}
        <div className="bg-primary text-white py-5">
          <Container className="text-center">
            <Row className="align-items-center">
              <Col md={8}>
                <h3 className="mb-3 fw-bold">
                  ¿Listo para tomar el control de tu agenda médica?
                </h3>
                <p className="fs-5">
                  Regístrate hoy y comienza a organizar tus turnos y tu
                  información de salud de manera fácil y segura.
                </p>
              </Col>
              <Col md={4} className="mt-3 mt-md-0">
                {/* Asume que tienes una ruta /registro o similar */}
                <Button variant="light" size="lg" className="px-5">
                  <FaCalendarCheck className="me-2" /> ¡Empezar Ahora!
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Container className="py-5">
        <h2
          className="text-center mb-4 display-6 fw-bold"
          style={{ color: "#0056b3" }}
        >
          ¿Qué Puedes Hacer con Salud Organizada?
        </h2>

        <p className="text-center fs-5 mb-5">
          Nuestro sistema ofrece un conjunto completo de herramientas diseñadas
          para hacer más eficiente la gestión administrativa y médica, tanto
          para profesionales como para pacientes.
        </p>

        <Row className="g-4">
          <Col md={6} lg={4}>
            <div className="p-4 border rounded shadow-sm bg-white h-100">
              <h4 className="fw-bold">✔ Gestión de Usuarios</h4>
              <p>
                Administra usuarios, roles, permisos y sus datos personales de
                manera segura.
              </p>
            </div>
          </Col>

          <Col md={6} lg={4}>
            <div className="p-4 border rounded shadow-sm bg-white h-100">
              <h4 className="fw-bold">✔ Administración de Doctores</h4>
              <p>
                Registra especialidades, consultorios, notas y turnos asignados
                a cada profesional.
              </p>
            </div>
          </Col>

          <Col md={6} lg={4}>
            <div className="p-4 border rounded shadow-sm bg-white h-100">
              <h4 className="fw-bold">✔ Gestión de Hospitales</h4>
              <p>
                Controla información de centros médicos: dirección, guardias,
                notas y ubicación en mapa.
              </p>
            </div>
          </Col>

          <Col md={6} lg={4}>
            <div className="p-4 border rounded shadow-sm bg-white h-100">
              <h4 className="fw-bold">✔ Administración de Turnos</h4>
              <p>
                Carga, visualiza y gestiona turnos. Control de asistencia,
                ausentismo y estadísticas.
              </p>
            </div>
          </Col>

          <Col md={6} lg={4}>
            <div className="p-4 border rounded shadow-sm bg-white h-100">
              <h4 className="fw-bold">✔ Reportes Automáticos</h4>
              <p>
                Gráficos dinámicos de asistencia, carga médica y obras sociales.
                Exportables a PDF.
              </p>
            </div>
          </Col>

          <Col md={6} lg={4}>
            <div className="p-4 border rounded shadow-sm bg-white h-100">
              <h4 className="fw-bold">✔ Manejo de Obras Sociales</h4>
              <p>
                Registro general, cantidad de pacientes por obra social y
                análisis visual detallado.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="py-5">
        <h2
          className="text-center fw-bold display-6 mb-4"
          style={{ color: "#0d6efd" }}
        >
          Ventajas de Usar Salud Organizada
        </h2>

        <Row className="g-4">
          <Col md={6} lg={3}>
            <div className="p-4 bg-light rounded shadow-sm text-center h-100">
              <h5 className="fw-bold">✔ Ahorro de Tiempo</h5>
              <p>
                Automatiza procesos que normalmente son manuales, reduciendo
                tiempos administrativos.
              </p>
            </div>
          </Col>
          <Col md={6} lg={3}>
            <div className="p-4 bg-light rounded shadow-sm text-center h-100">
              <h5 className="fw-bold">✔ Datos en Tiempo Real</h5>
              <p>
                Reportes instantáneos sobre asistencia, turnos y frecuencia por
                médico u obra social.
              </p>
            </div>
          </Col>
          <Col md={6} lg={3}>
            <div className="p-4 bg-light rounded shadow-sm text-center h-100">
              <h5 className="fw-bold">✔ Seguridad y Control</h5>
              <p>
                Roles administrables, permisos protegidos y manejo seguro de
                datos sensibles.
              </p>
            </div>
          </Col>
          <Col md={6} lg={3}>
            <div className="p-4 bg-light rounded shadow-sm text-center h-100">
              <h5 className="fw-bold">✔ Fácil de Usar</h5>
              <p>
                Interfaz clara, intuitiva y accesible, pensada para usuarios sin
                conocimientos técnicos.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="fw-bold mb-4" style={{ color: "#0056b3" }}>
              ¿Por qué Elegir Nuestra Plataforma?
            </h2>
            <ul className="fs-5">
              <li>
                ✔ Sistema completo para gestión de salud en un único lugar.
              </li>
              <li>
                ✔ Fácil administración de doctores, hospitales y usuarios.
              </li>
              <li>✔ Reportes visuales avanzados y exportación a PDF.</li>
              <li>✔ Integración con APIs y herramientas modernas.</li>
              <li>
                ✔ Motor de IA que optimiza información y ayuda al desarrollo.
              </li>
            </ul>
          </Col>

          <Col md={6} className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
              alt="Gestión médica"
              style={{ width: "70%", maxWidth: "350px" }}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
