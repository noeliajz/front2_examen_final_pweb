import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import axiosClient from "../utils/axiosClient";
import { useLocation } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const VerObrasSociales = () => {
  const [dataObras, setDataObras] = useState([]);
  const [dataObrasDoctor, setDataObrasDoctor] = useState([]);
  const [loading, setLoading] = useState(true);

  const doughnutRef = useRef(null);
  const barRef = useRef(null);
  const doughnutDoctorRef = useRef(null);
  const barDoctorRef = useRef(null);

  const location = useLocation();
  const doctor = location.state?.doctor;

  const colors = [
    "#0E46A3",
    "#1E7B7A",
    "#A5D7E8",
    "#9AC8CD",
    "#FFD966",
    "#FF6F61",
    "#6FA8DC",
  ];

  const fetchObrasSociales = async () => {
    try {
      const res = await axiosClient.get("/reportes/obras-sociales");
      setDataObras(res.data.obrasSociales || []);
    } catch (error) {
      console.error("Error al cargar obras sociales generales:", error);
    }
  };

  const fetchObrasPorDoctor = async () => {
    if (!doctor?._id) return;
    try {
      const res = await axiosClient.get(`/reportes/obras-sociales/${doctor._id}`);
      setDataObrasDoctor(res.data.obrasSociales || []);
    } catch (error) {
      console.error("Error al cargar obras sociales del doctor:", error);
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      await fetchObrasSociales();
      await fetchObrasPorDoctor();
      setLoading(false);
    };
    cargarDatos();
  }, []);

  if (loading) return <div>Cargando reportes...</div>;

  const generarChartData = (data, label = "Cantidad de Pacientes") => {
    const labels = data.map((o) => o.obraSocial);
    const cantidades = data.map((o) => o.cantidad);

    return {
      doughnutData: {
        labels,
        datasets: [
          {
            data: cantidades,
            backgroundColor: colors.slice(0, data.length),
          },
        ],
      },
      barData: {
        labels,
        datasets: [
          {
            label,
            data: cantidades,
            backgroundColor: "#0E46A3",
          },
        ],
      },
    };
  };

  const { doughnutData, barData } = generarChartData(dataObras);
  const {
    doughnutData: doughnutDataDoctor,
    barData: barDataDoctor,
  } = generarChartData(dataObrasDoctor, "Pacientes del Doctor");

  // 📄 === Generar PDF ===
  const generarPDF = () => {
    const doc = new jsPDF();

    // --- Portada general ---
    doc.setFontSize(18);
    doc.setTextColor("#0E46A3");
    doc.text("Informe de Obras Sociales de Pacientes (general)", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Obra Social", "Cantidad de Pacientes"]],
      body: dataObras.map((o) => [o.obraSocial, o.cantidad]),
      headStyles: { fillColor: [14, 70, 163] },
    });

    const doughnutCanvas = doughnutRef.current?.canvas;
    if (doughnutCanvas) {
      const imgData1 = doughnutCanvas.toDataURL("image/png");
      doc.addPage();
      doc.text("Distribución de Obras Sociales (General)", 14, 20);
      doc.addImage(imgData1, "PNG", 30, 40, 150, 150);
    }

    const barCanvas = barRef.current?.canvas;
    if (barCanvas) {
      const imgData2 = barCanvas.toDataURL("image/png");
      doc.addPage();
      doc.text("Cantidad de Pacientes por Obra Social (General)", 14, 20);
      doc.addImage(imgData2, "PNG", 15, 40, 180, 120);
    }

    // --- Si hay doctor, agregar sección específica ---
    if (doctor) {
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor("#0E46A3");
      doc.text(
        `Obras Sociales del Doctor/a: ${doctor.nombre} ${doctor.apellido}`,
        14,
        20
      );

      autoTable(doc, {
        startY: 30,
        head: [["Obra Social", "Cantidad de Pacientes"]],
        body: dataObrasDoctor.map((o) => [o.obraSocial, o.cantidad]),
        headStyles: { fillColor: [14, 70, 163] },
      });

      const doughnutDoctorCanvas = doughnutDoctorRef.current?.canvas;
      if (doughnutDoctorCanvas) {
        const imgData3 = doughnutDoctorCanvas.toDataURL("image/png");
        doc.addPage();
        doc.text("Distribución de Obras Sociales (del Doctor)", 14, 20);
        doc.addImage(imgData3, "PNG", 30, 40, 150, 150);
      }

      const barDoctorCanvas = barDoctorRef.current?.canvas;
      if (barDoctorCanvas) {
        const imgData4 = barDoctorCanvas.toDataURL("image/png");
        doc.addPage();
        doc.text("Cantidad de Pacientes por Obra Social (del Doctor)", 14, 20);
        doc.addImage(imgData4, "PNG", 15, 40, 180, 120);
      }
    }

    doc.save("Informe-Obras-Sociales.pdf");
  };

  return (
    <>
      <NavbarComponentsAdmin />
      <Container className="mt-4">
        {/* ====================== GENERAL ====================== */}
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h1>Todas las obras sociales (general)</h1>
            <Button variant="primary" onClick={generarPDF}>
              Descargar Informe PDF
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={5}>
            <Card className="p-3 text-center">
              <h5>Distribución de Obras Sociales</h5>
              <Doughnut ref={doughnutRef} data={doughnutData} />
            </Card>
          </Col>

          <Col md={7}>
            <Card className="p-3">
              <h5 className="text-center">
                Cantidad de Pacientes por Obra Social
              </h5>
              <Bar ref={barRef} data={barData} />
            </Card>
          </Col>
        </Row>

        {/* ====================== POR DOCTOR ====================== */}
        {doctor && (
          <>
            <h1 className="mt-5 mb-3">
              Obras sociales que atendió el doctor/a:{" "}
              <span style={{ color: "#0E46A3" }}>
                {doctor.nombre} {doctor.apellido}
              </span>
            </h1>

            <Row>
              <Col md={5}>
                <Card className="p-3 text-center">
                  <h5>Distribución de Obras Sociales (del Doctor)</h5>
                  <Doughnut ref={doughnutDoctorRef} data={doughnutDataDoctor} />
                </Card>
              </Col>

              <Col md={7}>
                <Card className="p-3">
                  <h5 className="text-center">
                    Cantidad de Pacientes por Obra Social (del Doctor)
                  </h5>
                  <Bar ref={barDoctorRef} data={barDataDoctor} />
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default VerObrasSociales;
