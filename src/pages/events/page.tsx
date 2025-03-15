import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import Calendar from "@/components/Calendar/Calendar";
import MainLayout from "@/components/Layouts/MainLayout";

const EventsPage = () => {
  const navigate = useNavigate();

  const getEventByFilter = async (date: Date) => {
    navigate(`/menu/${format(date, "yyyy-MM-dd")}`);
  };

  return (
    <MainLayout>
      <Calendar getDayOfMonths={getEventByFilter} />
    </MainLayout>
  );
};
export default EventsPage;
