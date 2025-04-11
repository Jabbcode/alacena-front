import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

import useEventApi from "@/api/event.service";

import { IEvent } from "@/interfaces/menu.interface";
import { capitalizeFirstLetter } from "@/helpers";
import { EVENT_COLORS } from "@/utils/constants";

import "./styles.css";

interface ICalendarProps {
  getDayOfMonths?: (date: Date) => void;
}

const Calendar = ({ getDayOfMonths }: ICalendarProps) => {
  const { findByFilterEvent } = useEventApi();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [menusDay, setMenusDay] = useState<IEvent[]>([]);

  // Generar los días del mes actual
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Obtener el día de la semana en que comienza el mes
  const startDay = getDay(startOfMonth(currentMonth));
  const blankDays = Array(startDay).fill(null);

  // Navegar al mes anterior
  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Navegar al mes siguiente
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Consulta de días con eventos usando TanStack Query
  const monthKey = format(currentMonth, "yyyy-MM");
  const {
    data: eventsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events", monthKey], // Clave única para este mes
    queryFn: async () => {
      const startDate = startOfMonth(currentMonth);
      const endDate = endOfMonth(currentMonth);

      const response = await findByFilterEvent({
        startDate: new Date(format(startDate, "yyyy-MM-dd")),
        endDate: new Date(format(endDate, "yyyy-MM-dd")),
      });

      setMenusDay(response);
      return response.map((event) => new Date(event.date)); // Devolver fechas con eventos
    },
    staleTime: 5 * 60 * 1000, // Mantener en caché durante 5 minutos
    refetchOnWindowFocus: false, // Evitar refetch cuando el usuario cambie de pestaña
  });

  // Convertir los días con eventos en un Set para mejorar la búsqueda
  const daysWithEventsSet = new Set(
    eventsData?.map((day) => format(day, "yyyy-MM-dd")) || []
  );

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar los eventos</div>;
  }

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
          <div key={index} className="day empty" />
        ))}

        {/* Días del mes actual */}
        {daysInMonth.map((day) => (
          <div
            key={day.toString()}
            className={`day ${
              isSameMonth(day, currentMonth) ? "current-month" : "other-month"
            } ${isToday(day) ? "today" : ""} ${
              daysWithEventsSet.has(format(day, "yyyy-MM-dd"))
                ? "with-event"
                : ""
            }`}
            onClick={() => getDayOfMonths && getDayOfMonths(day)}
          >
            <span>{format(day, "d")}</span>
            <ul>
              {menusDay.map((event) => {
                return format(day, "yyyy-MM-dd") ===
                  format(event.date, "yyyy-MM-dd")
                  ? event?.menuPlates?.map((mp) => {
                      return (
                        <div className="flex mb-2" key={mp.id}>
                          <span
                            className={`text-xs font-medium me-2 px-2 py-0.5 rounded-3xl ${
                              EVENT_COLORS.find(
                                (color) => color.category === mp.category
                              )?.color
                            }`}
                          ></span>
                          <li className="text-xs text-left">{mp.plate.name}</li>
                        </div>
                      );
                    })
                  : null;
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
