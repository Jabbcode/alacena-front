import { createBrowserRouter } from "react-router-dom";

import HeroPage from "@/pages/hero/page";
import MenuPage from "@/pages/menu/page";
import EventPage from "@/pages/events/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroPage />,
  },
  {
    path: "/events",
    element: <EventPage />,
  },
  {
    path: "/menu/:fecha",
    element: <MenuPage />,
  },
]);

export default router;
