import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import NavbarComponentsAdmin from '../components/NavbarComponentsAdmin';

// Importa clienteAxios o el método de fetching que uses
// import clienteAxios from './clienteAxios'; 

// 1. Registrar elementos necesarios para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Datos de ejemplo simulados (reemplazar con llamadas a tu API)
const mockData = {
    asistencia: 75, // 75% de asistencia general
    medicos: [
        { nombre: 'Dr. Carrizo', turnosAsignados: 120, turnosAsistidos: 90 },
        { nombre: 'Dra. Pérez', turnosAsignados: 90, turnosAsistidos: 85 },
        { nombre: 'Dr. Gómez', turnosAsignados: 150, turnosAsistidos: 100 },
        { nombre: 'Dra. López', turnosAsignados: 75, turnosAsistidos: 60 },
    ]
};


const Reportes = () => {

    // 2. Estado para almacenar los datos reales de la API
    const [reportData, setReportData] = useState(mockData);
    const [loading, setLoading] = useState(true);

    // 3. Función para cargar datos (ejemplo de la estructura de llamada)
    const fetchReportes = async () => {
        // Aquí harías la llamada a tu backend para obtener los datos.
        /*
        try {
            const res = await clienteAxios.get('/reportes/dashboard');
            setReportData(res.data);
        } catch (error) {
            console.error("Error al cargar reportes:", error);
            // Manejo de error
        } finally {
            setLoading(false);
        }
        */
        setLoading(false); // Mantener para el ejemplo con mockData
    };

    useEffect(() => {
        fetchReportes();
    }, []);

    // 4. Transformar datos para el gráfico de Asistencia General
    const asistenciaData = {
        labels: ['Asistencia', 'Ausencias'],
        datasets: [{
            data: [reportData.asistencia, 100 - reportData.asistencia],
            backgroundColor: ['#0E46A3', '#E1F7F5'],
            hoverBackgroundColor: ['#0A337A', '#C6E4E2']
        }]
    };

    // 5. Transformar datos para el gráfico de Carga de Turnos por Médico
    const turnosMedicosData = {
        labels: reportData.medicos.map(m => m.nombre),
        datasets: [{
            label: 'Turnos Asignados',
            data: reportData.medicos.map(m => m.turnosAsignados),
            backgroundColor: '#0E46A3',
        }, {
             label: 'Turnos Asistidos',
             data: reportData.medicos.map(m => m.turnosAsistidos),
             backgroundColor: '#1E7B7A', 
        }]
    };

    if (loading) {
        return (
            // ✅ CORRECCIÓN: Usar Fragmento (<>...</>) para envolver Navbar y Container.
            <> 
                <NavbarComponentsAdmin/>
                <Container className="mt-5">
                    <h3 className="text-center">Cargando Reportes...</h3>
                </Container>
            </>
        );
    }

    // 6. Renderizar los reportes
    return (
        // ✅ CORRECCIÓN: Usar Fragmento (<>...</>) para envolver Navbar y Container.
        <>
            <NavbarComponentsAdmin/>
            <Container style={{ minHeight: "90vh", paddingTop: "20px" }}>
                <h2 className="text-center mb-4" style={{ color: '#0E46A3' }}>Panel de Reportes</h2>
                <Row>
                    {/* REPORTE 1: Porcentaje de Asistencia General */}
                    <Col md={4} className="mb-4">
                        <Card className="text-center p-3 h-100">
                            <Card.Title>Porcentaje de Asistencia General</Card.Title>
                            <div style={{ height: '250px', margin: 'auto' }}>
                                <Doughnut data={asistenciaData} options={{ maintainAspectRatio: false }} />
                            </div>
                            <h4 className="mt-3">{reportData.asistencia}% de Asistencia</h4>
                        </Card>
                    </Col>

                    {/* REPORTE 2: Médicos con Más Turnos */}
                    <Col md={8} className="mb-4">
                        <Card className="p-3 h-100">
                            <Card.Title className="text-center">Carga de Turnos por Médico</Card.Title>
                            <Bar 
                                data={turnosMedicosData} 
                                options={{ 
                                    responsive: true,
                                    plugins: {
                                        legend: { position: 'top' },
                                        title: { display: true, text: 'Turnos Asignados vs. Asistidos' },
                                    },
                                }}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Reportes;