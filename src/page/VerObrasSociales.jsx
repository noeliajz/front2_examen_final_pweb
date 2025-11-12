import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";
import axiosClient from "../utils/axiosClient";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const VerObrasSociales = () => {
  const [dataObras, setDataObras] = useState([]);
  const [loading, setLoading] = useState(true);

  const doughnutRef = useRef(null);
  const barRef = useRef(null);

  const fetchObrasSociales = async () => {
    try {
      const res = await axiosClient.get("/reportes/obras-sociales");
      setDataObras(res.data.obrasSociales || []);
    } catch (error) {
      console.error("Error al cargar obras sociales:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObrasSociales();
  }, []);

  if (loading) return <div>Cargando reportes...</div>;

  const labels = dataObras.map((o) => o.obraSocial);
  const cantidades = dataObras.map((o) => o.cantidad);

  const colors = [
    "#0E46A3", "#1E7B7A", "#A5D7E8", "#9AC8CD", "#FFD966", "#FF6F61", "#6FA8DC"
  ];

  const doughnutData = {
    labels,
    datasets: [
      {
        data: cantidades,
        backgroundColor: colors.slice(0, dataObras.length),
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Cantidad de Pacientes",
        data: cantidades,
        backgroundColor: "#0E46A3",
      },
    ],
  };

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor("#0E46A3");
    doc.text("Informe de Obras Sociales de Pacientes con Turnos", 14, 20);

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
      doc.text("Distribución de Obras Sociales", 14, 20);
      doc.addImage(imgData1, "PNG", 30, 40, 150, 150);
    }

    const barCanvas = barRef.current?.canvas;
    if (barCanvas) {
      const imgData2 = barCanvas.toDataURL("image/png");
      doc.addPage();
      doc.text("Cantidad de Pacientes por Obra Social", 14, 20);
      doc.addImage(imgData2, "PNG", 15, 40, 180, 120);
    }

    doc.save("Informe-Obras-Sociales.pdf");
  };

  return (
    <>
      <NavbarComponentsAdmin />
      <Container className="mt-4">
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
          <h1 className="px-5">Todas las obras sociales (general)</h1>
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
              <h5 className="text-center">Cantidad de Pacientes por Obra Social</h5>
              <Bar ref={barRef} data={barData} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VerObrasSociales;
