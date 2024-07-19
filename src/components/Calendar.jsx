import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/events'); // Endpoint para obtener eventos
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleAddEvent = async () => {
    const newEvent = {
      date: date.toISOString(), // Convertimos la fecha a formato ISO para enviarla al servidor
      title: 'Nuevo Evento',
      description: 'Descripción del nuevo evento'
    };

    try {
      const response = await axios.post('http://localhost:8080/api/events', newEvent); // Endpoint para agregar eventos
      console.log('Evento agregado:', response.data);
      fetchEvents(); // Actualizamos la lista de eventos después de agregar uno nuevo
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div>
      <h2>Calendario</h2>
      <Calendar onChange={handleDateChange} value={date} />
      <button onClick={handleAddEvent}>Agregar Evento</button>
      <div>
        <h3>Eventos:</h3>
        <ul>
          {events.map(event => (
            <li key={event._id}>
              <strong>{new Date(event.date).toLocaleDateString()}</strong> - {event.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarComponent;
