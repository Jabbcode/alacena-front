import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  addMonths,
  subMonths,
  getDay,
  isToday,
  subDays,
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { findByFilterEventService } from "@/api/menu";

import "./styles.css";
import { capitalizeFirstLetter } from "@/helpers";

interface ICalendarProps {
  getDayOfMonths?: (fecha: Date) => void;
}

const Calendar = ({ getDayOfMonths }: ICalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [daysWithEvents, setDaysWithEvents] = useState<Date[]>([]); // Estado para días con eventos

  // Cargar días con eventos
  useEffect(() => {
    const fetchDaysWithEvents = async () => {
      const eventDays: Date[] = [];
      for (const day of daysInMonth) {
        const hasEvent = await findByFilterEventService({ fecha: day });
        if (hasEvent.length > 0) {
          eventDays.push(day);
        }
      }
      //TODO: Ajustar ya que no deberia restarse dias
      setDaysWithEvents(eventDays.map((day) => subDays(day, 1))); // Guardar los días con eventos en el estado
    };

    fetchDaysWithEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth]); // Actualizar cuando cambie el mes

  // Generar los días del mes actual
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Obtener el día de la semana en que comienza el mes (0 = domingo, 6 = sábado)
  const startDay = getDay(startOfMonth(currentMonth));

  // Crear un array de días vacíos al inicio del calendario
  const blankDays = Array(startDay).fill(null);

  // Navegar al mes anterior
  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Navegar al mes siguiente
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="calendar">
      {/* Header */}
      <div className="header">
        <button onClick={previousMonth} className="cursor-pointer">
          <ChevronLeft />
        </button>
        <h2>
          {capitalizeFirstLetter(
            format(currentMonth, "MMMM yyyy", { locale: es })
          )}
        </h2>
        <button onClick={nextMonth} className="cursor-pointer">
          <ChevronRight />
        </button>
      </div>

      {/* Días de la semana */}
      <div className="weekdays">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Cuadrícula de días */}
      <div className="days">
        {/* Días vacíos al inicio */}
        {blankDays.map((_, index) => (
          <div key={index} className="day empty">
            {" "}
            {/* Espacio vacío */}
          </div>
        ))}

        {/* Días del mes actual */}
        {daysInMonth.map((day) => (
          <div
            key={day.toString()}
            className={`day ${
              isSameMonth(day, currentMonth) ? "current-month" : "other-month"
            } ${isToday(day) ? "today" : ""} ${
              daysWithEvents.some(
                (eventDay) =>
                  isSameMonth(eventDay, day) &&
                  format(eventDay, "d") === format(day, "d")
              )
                ? "with-event"
                : ""
            }`}
            onClick={() => getDayOfMonths && getDayOfMonths(day)}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
