import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import Calendar from "./components/calendar/Calendar";

const EventsPage = () => {
  const navigate = useNavigate();

  const getEventByFilter = async (fecha: Date) => {
    navigate(`/menu/${format(fecha, "yyyy-MM-dd")}`);
  };

  return (
    <div className="flex flex-col">
      <Calendar getDayOfMonths={getEventByFilter} />
      <Link
        to="/"
        className="px-8 py-3 text-center mt-2 mx-2 mb-1 bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
      >
        Volver a inicio
      </Link>
    </div>
  );
};
export default EventsPage;
