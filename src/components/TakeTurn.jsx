import React from "react";
/* calendario */
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";

/* -- */
const TakeTurn = () => {
  const localizer = dayjsLocalizer(dayjs);
  const events = [
    {
      start: dayjs("2024-06-12T12:00:00").toDate(),
      end: dayjs("2024-06-12T14:00:00").toDate(),
      title: "Turno 1",
    },
    {
      start: dayjs("2024-06-13T12:00:00").toDate(),
      end: dayjs("2024-06-14T14:00:00").toDate(),
      title: "Turno 2",
    },
  ];

  return (
    <div className="d-flex justify-content-center py-5">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="month"
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "Sin eventos"
        }}
        style={{
          height: 500,
          width: 500,
        }}
      />
    </div>
  );
};

export default TakeTurn;
