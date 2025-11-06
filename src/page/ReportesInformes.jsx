import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import NavbarComponentsAdmin from '../components/NavbarComponentsAdmin';
import axiosClient from '../utils/axiosClient';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ReportesInformes = () => {
  const [reportData, setReportData] = useState({
    medicos: [],
    totalAsignados: 0,
    totalAsistidos: 0,
  });

  const [loading, setLoading] = useState(true);

  const doughnutRef = useRef(null);
  const barRef = useRef(null);

  const fetchReportes = async () => {
    try {
      const res = await axiosClient.get('/reportes/dashboard');
      const fetchedMedicos = res.data.medicos || [];

      setReportData({
        medicos: fetchedMedicos,
        totalAsignados: res.data.totalAsignados || 0,
        totalAsistidos: res.data.totalAsistidos || 0,
      });
    } catch (error) {
      console.error("Error al cargar reportes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportes();
  }, []);

  const { totalAsignados, totalAsistidos, medicos } = reportData;
  const totalAusentes = totalAsignados - totalAsistidos;
  const porcentajeAsistencia = totalAsignados > 0 ? ((totalAsistidos / totalAsignados) * 100).toFixed(2) : 0;

  const asistenciaData = {
    labels: ['Turnos Asistidos', 'Turnos Ausentes'],
    datasets: [
      {
        data: [totalAsistidos, totalAusentes],
        backgroundColor: ['#0E46A3', '#A5D7E8'],
      }
    ]
  };

  const turnosMedicosData = {
    labels: medicos.map(m => m.nombre),
    datasets: [
      {
        label: 'Turnos Asignados',
        data: medicos.map(m => m.turnosAsignados),
        backgroundColor: '#0E46A3',
      },
      {
        label: 'Turnos Asistidos',
        data: medicos.map(m => m.turnosAsistidos),
        backgroundColor: '#1E7B7A',
      }
    ]
  };

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor('#0E46A3');
    doc.text('Informe de Asistencia Médica', 14, 20);

    doc.setFontSize(12);
    doc.setTextColor('#000000');
    doc.text(`Total de Turnos: ${totalAsignados}`, 14, 30);
    doc.text(`Asistidos: ${totalAsistidos}`, 14, 36);
    doc.text(`Ausentes: ${totalAusentes}`, 14, 42);
    doc.text(`Porcentaje de Asistencia: ${porcentajeAsistencia}%`, 14, 48);

    autoTable(doc, {
      startY: 60,
      head: [['Médico', 'Asignados', 'Asistidos']],
      body: medicos.map(m => [m.nombre, m.turnosAsignados, m.turnosAsistidos]),
      headStyles: { fillColor: [14, 70, 163] },
    });

    const doughnutCanvas = doughnutRef.current?.canvas;
    if (doughnutCanvas) {
      const imgData1 = doughnutCanvas.toDataURL('image/png');
      doc.addPage();
      doc.text('Distribución de Asistencia', 14, 20);
      doc.addImage(imgData1, 'PNG', 30, 40, 150, 150);
    }

    const barCanvas = barRef.current?.canvas;
    if (barCanvas) {
      const imgData2 = barCanvas.toDataURL('image/png');
      doc.addPage();
      doc.text('Carga de Turnos por Médico', 14, 20);
      doc.addImage(imgData2, 'PNG', 15, 40, 180, 120);
    }

    doc.save('Informe-Reportes.pdf');
  };

  if (loading) return <div>Cargando reportes...</div>;

  return (
    <>
      <NavbarComponentsAdmin />
      <Container className="mt-4">
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <Button variant="primary" onClick={generarPDF}>
              Descargar Informe PDF
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Card className="p-3 text-center">
              <h5>Distribución de Asistencia</h5>
              <Doughnut ref={doughnutRef} data={asistenciaData} />
              <h4 className="mt-3">{porcentajeAsistencia}%</h4>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="p-3">
              <h5 className="text-center">Carga de Turnos por Médico</h5>
              <Bar ref={barRef} data={turnosMedicosData} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ReportesInformes;