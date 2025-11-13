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
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

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

  // === CARGA DE DATOS GENERALES ===
  const fetchObrasSociales = async () => {
    try {
      const res = await axiosClient.get("/reportes/obras-sociales");
      setDataObras(res.data.obrasSociales || []);
    } catch (error) {
      console.error("Error al cargar obras sociales generales:", error);
    }
  };

  // === CARGA DE DATOS DEL DOCTOR ===
  const fetchObrasPorDoctor = async () => {
    if (!doctor?._id) return;
    try {
      const res = await axiosClient.get(
        `/reportes/obras-sociales/${doctor._id}`
      );
      setDataObrasDoctor(res.data.obrasSociales || []);
    } catch (error) {
      console.error("Error al cargar obras sociales del doctor:", error);
    }
  };

  // === FILTRAR POR MES Y AÑO ===
  const handleFiltrar = async () => {
    if (!doctor?._id) return;
    try {
      const params = {};
      if (selectedMonth) params.mes = selectedMonth;
      if (selectedYear) params.anio = selectedYear;

      const res = await axiosClient.get(
        `/reportes/obras-sociales/${doctor._id}`,
        { params }
      );
      setDataObrasDoctor(res.data.obrasSociales || []);
    } catch (error) {
      console.error("Error al aplicar filtro:", error);
    }
  };

  const handleLimpiarFiltro = async () => {
    setSelectedMonth("");
    setSelectedYear("");
    await fetchObrasPorDoctor();
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

  // === CONFIGURACIÓN DE GRÁFICOS ===
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
  const { doughnutData: doughnutDataDoctor, barData: barDataDoctor } =
    generarChartData(dataObrasDoctor, "Pacientes del Doctor");

  // === GENERAR PDF ===
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

    // --- Sección específica del doctor ---
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

  // === RENDER ===
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
        {/* ====================== FILTRO POR MES Y AÑO ====================== */}
        <Row className="mt-5">
          <Col md={12}>
            <Card className="p-3">
              <h4 className="text-center mb-4">
                Filtrar reportes por mes y año
              </h4>
              <Row className="justify-content-center mb-3">
                <Col md={3}>
                  <label className="form-label">Mes:</label>
                  <select
                    className="form-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5">Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                  </select>
                </Col>

                <Col md={3}>
                  <label className="form-label">Año:</label>
                  <select
                    className="form-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">Todos</option>
                    {[2023, 2024, 2025].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              <div className="text-center">
                <Button variant="primary" onClick={handleFiltrar}>
                  Aplicar Filtro
                </Button>
                <Button
                  variant="secondary"
                  className="ms-3"
                  onClick={handleLimpiarFiltro}
                >
                  Limpiar
                </Button>
              </div>
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
